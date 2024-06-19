// IMPORTS 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditMyProfile.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// COMPONENT
export const EditMyProfile = () => {
    const navigate = useNavigate();


    // States to store fetched data
    const [userInfo, setUserInfo] = useState({});
    const [pageLoading, setPageLoading] = useState(true);

    // Run fetch data on page load
    useEffect(() => {
        fetchMyInfo();
    }, []);
// Fecth data function
    const fetchMyInfo = async () => {
        setPageLoading(true)
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/myinfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.msg);
                localStorage.removeItem('accessToken');
                navigate('/login');
            } else {
                setUserInfo(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        } finally {
            setPageLoading(false);
        }
    }



    // Change handlers
    const handleFirstNameChange = (e) => {
        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                FIRST_NAME: e.target.value
            }
        });
    }
    const handleLastNameChange = (e) => {
        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                LAST_NAME: e.target.value
            }
        });
    }
    const handleBioChange = (e) => {
        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                BIO: e.target.value
            }
        });
    }
    const handleEmailChange = (e) => {
        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                EMAIL: e.target.value
            }
        });
    }

    const handleSocialLinkDelete = (index) => {
        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                SOCIAL_LINKS: userInfo.PERSONAL_INFO.SOCIAL_LINKS.filter((_, i) => i !== index)
            }
        });
    }

    const handleSocialLinkSiteNameChange = (e, index) => {
        const newSocialLinks = [...userInfo.PERSONAL_INFO.SOCIAL_LINKS];
        newSocialLinks[index] = {
            ...newSocialLinks[index],
            SITE_NAME: e.target.value
        };

        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                SOCIAL_LINKS: newSocialLinks
            }
        });
    };

    const handleSocialLinkLinkChange = (e, index) => {
        const newSocialLinks = [...userInfo.PERSONAL_INFO.SOCIAL_LINKS];
        newSocialLinks[index] = {
            ...newSocialLinks[index],
            LINK: e.target.value
        };

        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                SOCIAL_LINKS: newSocialLinks
            }
        });
    };

    const handleAddNewSocialLink = () => {
        const newSocialLink = {
            SITE_NAME: '',
            LINK: '',
        };

        const newSocialLinks = [...userInfo.PERSONAL_INFO.SOCIAL_LINKS, newSocialLink];

        setUserInfo({
            ...userInfo,
            PERSONAL_INFO: {
                ...userInfo.PERSONAL_INFO,
                SOCIAL_LINKS: newSocialLinks
            }
        });
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
    const handleSubmitForm = async(e) => {
        console.log('WWWWWWOOOOOOOWWWWWWW HOOLLUUPPP')
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
                    firstName : userInfo.PERSONAL_INFO.FIRST_NAME,
                    lastName: userInfo.PERSONAL_INFO.LAST_NAME,
                    bio : userInfo.PERSONAL_INFO.BIO,
                    email : userInfo.PERSONAL_INFO.EMAIL,
                    socialLinks : userInfo.PERSONAL_INFO.SOCIAL_LINKS
                })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(5)
                console.log('NOT OK')
                console.log(data)
            } else {
                console.log('YES OK')
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
                    Happen
                </div>

                {/* avatar section  */}
                <div className="Avatar-section">
                    <div className="Avatar-container">
                        <img
                            src={userInfo.PERSONAL_INFO.AVATAR ? userInfo.PERSONAL_INFO.AVATAR : "/blank_user.jpg"}
                            alt="Avatar"
                        />
                    </div>
                </div>
                {/* Personal info section  */}
                <div className="Section">
                    Personal Info
                    <div className="Container">
                        <label>First name</label>
                        <input
                            value={userInfo.PERSONAL_INFO.FIRST_NAME}
                            onChange={handleFirstNameChange}
                            placeholder={userInfo.PERSONAL_INFO.FIRST_NAME}
                            minLength={1}
                            required
                        />

                        <label>Last name</label>
                        <input
                            value={userInfo.PERSONAL_INFO.LAST_NAME}
                            onChange={handleLastNameChange}
                            placeholder={userInfo.PERSONAL_INFO.LAST_NAME}
                            minLength={1}
                            required
                        />

                        <label>Bio</label>
                        <textarea
                            value={userInfo.PERSONAL_INFO.BIO}
                            onChange={handleBioChange}
                            placeholder={userInfo.PERSONAL_INFO.BIO}
                            rows="3"
                            style={{ resize: "none" }}
                        />

                    </div>
                </div>

                <div className="Section">
                    Social Links

                    {userInfo.PERSONAL_INFO.SOCIAL_LINKS.map((social, index) => (
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
                            value={userInfo.PERSONAL_INFO.EMAIL}
                            onChange={handleEmailChange}
                            type="email"
                            placeholder={userInfo.PERSONAL_INFO.EMAIL}
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

                <button
                    type="submit">Save</button>


                <div className="Bottom-margin"></div>
            </form>
        );
}


