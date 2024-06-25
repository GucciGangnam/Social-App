// IMPORTS 
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EditMyProfile.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// COMPONENT
export const EditMyProfile = ({ fetchMyInfo }) => {
    const navigate = useNavigate();


    // States to store fetched data
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))
    const [pageLoading, setPageLoading] = useState(false);



    // Change handlers
    const handleFirstNameChange = (e) => {
        console.log("hello")
        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                FIRST_NAME: e.target.value
            }
        });
    }
    const handleLastNameChange = (e) => {
        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                LAST_NAME: e.target.value
            }
        });
    }
    const handleBioChange = (e) => {
        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                BIO: e.target.value
            }
        });
    }
    const handleEmailChange = (e) => {
        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                EMAIL: e.target.value
            }
        });
    }
    const handleSocialLinkDelete = (index) => {
        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                SOCIAL_LINKS: userData.PERSONAL_INFO.SOCIAL_LINKS.filter((_, i) => i !== index)
            }
        });
    }
    const handleSocialLinkSiteNameChange = (e, index) => {
        const newSocialLinks = [...userData.PERSONAL_INFO.SOCIAL_LINKS];
        newSocialLinks[index] = {
            ...newSocialLinks[index],
            SITE_NAME: e.target.value
        };

        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                SOCIAL_LINKS: newSocialLinks
            }
        });
    };
    const handleSocialLinkLinkChange = (e, index) => {
        const newSocialLinks = [...userData.PERSONAL_INFO.SOCIAL_LINKS];
        newSocialLinks[index] = {
            ...newSocialLinks[index],
            LINK: e.target.value
        };

        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                SOCIAL_LINKS: newSocialLinks
            }
        });
    };
    const handleAddNewSocialLink = () => {
        const newSocialLink = {
            SITE_NAME: '',
            LINK: '',
        };

        const newSocialLinks = [...userData.PERSONAL_INFO.SOCIAL_LINKS, newSocialLink];

        setUserData({
            ...userData,
            PERSONAL_INFO: {
                ...userData.PERSONAL_INFO,
                SOCIAL_LINKS: newSocialLinks
            }
        });
    };


    // UPLOAD PHOTO
    // Cloudinary
    const cloudName = 'dljdeodtd'
    const presetKey = import.meta.env.VITE_CLD_PRESET_KEY




    // CAMERA FUNCTIONS 
    const [imgURL, setImgURL] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [img, setImg] = useState(null);


    const fileInputRef = useRef(null);

    const handleAvatarClick = (event) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event) => {
        event.preventDefault(); // Prevent the default action
        setUploading(true)
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', presetKey)
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
            } else {
                const data = await response.json();
                setImgURL(data.secure_url)
                fetchMyInfo();
                setUploading(false)
                // Handle successful response (e.g., update state with uploaded image URL)
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };


    // Password change area / / / / / / / / / / / / / / / / / / / / / / 
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    }
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }
    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    }
    // Password change area / / / / / / / / / / / / / / / / / / / / / / / 



    // SUBMIT FORM HANDLER
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setPageLoading(true)
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/myinfo`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: userData.PERSONAL_INFO.FIRST_NAME,
                    lastName: userData.PERSONAL_INFO.LAST_NAME,
                    bio: userData.PERSONAL_INFO.BIO,
                    email: userData.PERSONAL_INFO.EMAIL,
                    socialLinks: userData.PERSONAL_INFO.SOCIAL_LINKS,
                    imageURL: imgURL
                })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data)
            } else {
                fetchMyInfo();
                console.log(data)
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        } finally {
            setPageLoading(false)
        }
    }


    if (pageLoading) {
        return <div>Loading...</div>;
    } else
        return (
            <form
                onSubmit={handleSubmitForm}
                className="EditMyProfile">
                <div className="Header">
                    Profile
                </div>

                {/* avatar section  */}
                <div className="Avatar-section">
                    <img
                        src={userData.PERSONAL_INFO.AVATAR ? userData.PERSONAL_INFO.AVATAR : (img || '/Black-pp.jpg')}
                        alt="Avatar"
                        onClick={handleAvatarClick}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>

                {/* Personal info section  */}
                <div className="Section">
                    Personal Info
                    <div className="Container">
                        <label>First name</label>
                        <input
                            value={userData.PERSONAL_INFO.FIRST_NAME}
                            onChange={handleFirstNameChange}
                            placeholder={userData.PERSONAL_INFO.FIRST_NAME}
                            minLength={1}
                            required
                        />

                        <label>Last name</label>
                        <input
                            value={userData.PERSONAL_INFO.LAST_NAME}
                            onChange={handleLastNameChange}
                            placeholder={userData.PERSONAL_INFO.LAST_NAME}
                            minLength={1}
                            required
                        />

                        <label>Bio</label>
                        <textarea
                            value={userData.PERSONAL_INFO.BIO}
                            onChange={handleBioChange}
                            placeholder={userData.PERSONAL_INFO.BIO}
                            rows="3"
                            style={{ resize: "none" }}
                        />

                    </div>
                </div>

                <div className="Section">
                    Social Links

                    {userData.PERSONAL_INFO.SOCIAL_LINKS.map((social, index) => (
                        <div key={index} className="Container">
                            <button
                                onClick={() => { handleSocialLinkDelete(index) }}
                                className="Delete-social-button"></button>
                            <label>Site</label>
                            <input
                                value={social.SITE_NAME}
                                onChange={(e) => handleSocialLinkSiteNameChange(e, index)}
                                placeholder="Instagram"
                                required
                            />
                            <label>Link</label>
                            <input
                                value={social.LINK}
                                onChange={(e) => handleSocialLinkLinkChange(e, index)}
                                placeholder="www.instagram.com/your-user-name"
                                required
                            />
                        </div>
                    ))}

                    <button
                        onClick={handleAddNewSocialLink}>Add Social</button>
                </div>

                <div className="Section">
                    Email
                    <div
                        className="Container"
                        style={{
                            background: "var(--element-background)"
                        }}
                    >
                        <label>Email</label>
                        <input
                            value={userData.PERSONAL_INFO.EMAIL}
                            onChange={handleEmailChange}
                            type="email"
                            placeholder={userData.PERSONAL_INFO.EMAIL}
                            required />
                    </div>
                </div>

                <div className="Section">
                    Password
                    <div
                        className="Container"
                        style={{
                            background: "var(--element-background)"
                        }}
                    >
                        <label>Current password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={handleOldPasswordChange}
                            placeholder="Current password" />
                        <label>New password</label>
                        <input
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            type="password"
                            placeholder="New password" />
                        <label>Confirm password</label>
                        <input
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPasswordChange}
                            type="password"
                            placeholder="Confirm New Password" />
                    </div>
                </div>

                {uploading ? (
                    <button
                        style={{
                            background: "var(--red1)"
                        }}
                        type="button">
                        Uploading image
                    </button>
                ) : (
                    <button
                        type="submit">Save
                    </button>
                )}

                <div className="Bottom-margin"></div>
            </form >
        );
}


