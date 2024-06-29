// IMPORTS
// Styles 
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./NavigationBar.css"
import DateTimePicker from 'react-datetime-picker';
// Variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// Cloudinary
// import { cloudinary } from 'cloudinary-core';



// COMPONENT 

// State for showing and hiding create new event window
export const NavigationBar = ({ isCreateNewEventShowing, setIsCreateNewEventShowing }) => {


    // Use navigate
    const navigate = useNavigate();
    // Form States 
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [imgURL, setImgURL] = useState('');
    const [privacyPreference, setPrivacyPreference] = useState("Friends of friends")
    const [startTime, setStartTime] = useState(new Date());
    const [location, setLocation] = useState(null)

    useEffect(() => {
        console.log(location);
    }, [location])


    const [uploading, setUploading] = useState(false)

    // Handle Privacy preference 
    const handlePrivacyPreference = (preference) => {
        if (preference === 'Public') {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                    },
                    (error) => {
                        alert(error.message)
                    }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }
        setPrivacyPreference(preference);
    };

    // Cloudinary
    const cloudName = 'dljdeodtd'
    const presetKey = import.meta.env.VITE_CLD_PRESET_KEY



    // CAMERA FUNCTIONS 
    const fileInputRef = useRef(null);
    const handleCameraClick = (event) => {
        event.preventDefault(); // Prevent the default action
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const [img, setImg] = useState(null);
    const handlePhotoChange = async (event) => {
        event.preventDefault(); // Prevent the default action
        setUploading(true)
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Set the background image to the captured photo
                setImg(e.target.result);
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
                console.log('Post request successful:', data.secure_url);
                setUploading(false)
                // Handle successful response (e.g., update state with uploaded image URL)
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Information buttons handlers
    const [isPrivacyInfoShowing, setIsPrivacyInfoShowing] = useState(false);

    // Submit new event btn
    const submitNewEvent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventTitle: title,
                    eventInfo: info,
                    eventIMG: imgURL,
                    eventStartTime: new Date(),
                    eventPrivacyPreference: privacyPreference,
                    eventLocation: location,
                })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.msg)
            } else {
                // console.log(data.event._id)
                setTitle('')
                setInfo('')
                setImg(null)
                setImgURL('')
                setLocation(null)
                setPrivacyPreference('Friends of friends')
                setIsCreateNewEventShowing(false)
                navigate('/event/' + data.event._id)
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }

    }



    return (
        <div
            style={{
                height: isCreateNewEventShowing ? '100%' : '0%',
            }}
            className="NavigationBar">

            <form
                onSubmit={submitNewEvent}
                className="content-container">

                <div className="Header">
                    Happen
                </div>
                <div className="Section">
                    <input
                        placeholder="What you up to?"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        required />
                    <input
                        placeholder="Add some info about this event"
                        value={info}
                        onChange={(e) => { setInfo(e.target.value) }} />
                </div>

                <div className="Section">
                    <div
                        className="Camera-container"
                        onClick={handleCameraClick}
                        style={{
                            backgroundImage: img ? `url(${img})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        <svg
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle
                                cx="12"
                                cy="13"
                                r="3"
                                stroke="var(--primary-text)"
                                strokeWidth="1" />
                            <path d="M2 13.3636C2 10.2994 2 8.76721 2.74902 7.6666C3.07328 7.19014 3.48995 6.78104 3.97524 6.46268C4.69555 5.99013 5.59733 5.82123 6.978 5.76086C7.63685 5.76086 8.20412 5.27068 8.33333 4.63636C8.52715 3.68489 9.37805 3 10.3663 3H13.6337C14.6219 3 15.4728 3.68489 15.6667 4.63636C15.7959 5.27068 16.3631 5.76086 17.022 5.76086C18.4027 5.82123 19.3044 5.99013 20.0248 6.46268C20.51 6.78104 20.9267 7.19014 21.251 7.6666C22 8.76721 22 10.2994 22 13.3636C22 16.4279 22 17.9601 21.251 19.0607C20.9267 19.5371 20.51 19.9462 20.0248 20.2646C18.9038 21 17.3433 21 14.2222 21H9.77778C6.65675 21 5.09624 21 3.97524 20.2646C3.48995 19.9462 3.07328 19.5371 2.74902 19.0607C2.53746 18.7498 2.38566 18.4045 2.27673 18"
                                stroke="var(--primary-text)"
                                strokeWidth="1"
                                strokeLinecap="round" />
                            <path d="M19 10H18"
                                stroke="var(--primary-text)"
                                strokeWidth="1"
                                strokeLinecap="round" />
                        </svg>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        capture="camera"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handlePhotoChange}
                    />
                </div>



                <div className="Section-buttons">
                    <button
                        type="button"
                        style={{
                            background: privacyPreference === 'Public' ? "var(--red1)" : "var(--background)",
                            color: privacyPreference === 'Public' ? "var(--primary-text)" : "var(--secondary-text)",
                        }}
                        onClick={() => { handlePrivacyPreference('Public') }}>Public</button>
                    <button
                        type="button"
                        style={{
                            background: privacyPreference === 'Friends of friends' ? "var(--blue1)" : "var(--background)",
                            color: privacyPreference === 'Friends of friends' ? "var(--primary-text)" : "var(--secondary-text)",
                        }}
                        onClick={() => { handlePrivacyPreference('Friends of friends') }}>Friends of friends</button>
                    <button
                        type="button"
                        style={{
                            background: privacyPreference === 'Private' ? "var(--green1)" : "var(--background)",
                            color: privacyPreference === 'Private' ? "var(--primary-text)" : "var(--secondary-text)",
                        }}
                        onClick={() => { handlePrivacyPreference('Private') }}>Private</button>
                </div>





                <div className="Section">
                    <button
                        onClick={() => { setIsPrivacyInfoShowing(true); }}
                        className="Info-btn">i</button>
                </div>

                {/* <div className="Section-time">
                    <button
                        type="button"
                        className="Time-button">Now</button>
                </div> */}

                <div className="Section-submit">
                    {uploading ? (
                        <button
                            type="button"
                            className="Submit-button-flashing">
                            Uploading image
                        </button>
                    ) : (
                        <button
                            style={{
                                background: "var(--green1)"
                            }}
                            type="submit"
                            className="Submit-button">
                            Post
                        </button>
                    )}

                </div>

            </form>

            {isPrivacyInfoShowing && (
                <div
                    onClick={() => { setIsPrivacyInfoShowing(false); }}
                    className="Info-overlay"
                >
                    {isPrivacyInfoShowing && (
                        <div className="Info-popup">
                            <strong
                                style={{
                                    color: "var(--red1)"
                                }}>Public</strong>
                            Anyone within a certain distance of you will be able to see this event regardless of wheather you are connected to them.
                            <br />
                            <br />
                            <strong
                                style={{
                                    color: "var(--blue1)"
                                }}>Friends of friends</strong>
                            Once a friend joins your group, their friends will also be able to see this event.
                            <br />
                            <br />
                            <strong
                                style={{
                                    color: "var(--green1)"
                                }}>Private</strong>
                            Only your friends will be able to see this event.
                        </div>
                    )}
                </div>
            )}

            {/* Botton van bar */}
            <div className="NavBar">
                <svg
                    className="Home-svg"
                    onClick={() => { navigate('/home') }}
                    style={{
                        opacity: isCreateNewEventShowing ? "0%" : undefined,
                    }}
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                        stroke="#1C274C"
                        strokeWidth="1.5" />
                    <path
                        d="M12 15L12 18"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round" />
                </svg>
                <svg
                    onClick={() => { setIsCreateNewEventShowing(prevState => !prevState) }}
                    className="Create-svg"
                    style={{
                        transform: isCreateNewEventShowing ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: '300ms ease-in-out'
                    }}
                    width="90px"
                    height="90px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="style=bulk">
                        <g id="add-circle">
                            <path
                                id="vector (Stroke)"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
                                fill="#BFBFBF" />
                            <path
                                id="vector (Stroke)_2"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 7.00744C12.4142 7.00744 12.75 7.34323 12.75 7.75744L12.75 16.2427C12.75 16.6569 12.4142 16.9927 12 16.9927C11.5857 16.9927 11.25 16.6569 11.25 16.2427L11.25 7.75743C11.25 7.34322 11.5858 7.00744 12 7.00744Z"
                                fill="#000000" />
                            <path
                                id="vector (Stroke)_3"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17 12C17 12.4142 16.6642 12.75 16.25 12.75L7.76476 12.75C7.35055 12.75 7.01476 12.4142 7.01476 12C7.01477 11.5857 7.35055 11.25 7.76477 11.25L16.25 11.25C16.6642 11.25 17 11.5858 17 12Z"
                                fill="#000000" />
                        </g>
                    </g>
                </svg>
                <svg
                    className="Message-svg"
                    onClick={() => { navigate('/messages') }}
                    style={{
                        opacity: isCreateNewEventShowing ? "0%" : undefined,
                    }}
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    fill="none" >
                    <path
                        d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z"
                        fill="#1C274C" />
                    <path
                        d="M8 11H8.009M11.991 11H12M15.991 11H16"
                        stroke="#1C274C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            </div>






        </div>
    )
}
