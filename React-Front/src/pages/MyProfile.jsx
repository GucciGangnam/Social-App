// IMPORTS 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// COMPONENT
export const MyProfile = ({ handleLogout }) => {
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('userData'));
    const [pageLoading, setPageLoading] = useState(false);


    const handleFriendsBTNClick = () => {
        navigate("/myprofile/friends");
    }


    if (pageLoading) {
        return <div>Loading...</div>;
    } else

        return (
            <div className="MyProfile">
                <div className="Header">
                    {userData.PERSONAL_INFO.USER_NAME}
                </div>

                <div className="Profile-info">
                    <div className="Avatar-container">
                        <img
                            src={userData.PERSONAL_INFO.AVATAR ? userData.PERSONAL_INFO.AVATAR : "/Black-pp.jpg"}
                            alt="Avatar"
                        />
                    </div>

                    <div className="Personal-info">
                        <div className="Name">
                            {userData.PERSONAL_INFO.FIRST_NAME} {userData.PERSONAL_INFO.LAST_NAME}
                        </div>
                        <div className="Bio">
                            {userData.PERSONAL_INFO.BIO}
                        </div>
                    </div>

                    <div className="Friends-icon-container" onClick={handleFriendsBTNClick}>
                        <svg
                            fill="#000000"
                            width="50px"
                            height="50px"
                            viewBox="0 -64 640 640"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                        </svg>
                    </div>
                </div>

                <div className="Edit-BTN-container">
                    <button
                        onClick={() => { navigate('/myprofile/edit') }}>Edit</button>
                </div>

                <div className="Social-links-container">
                    {userData.PERSONAL_INFO.SOCIAL_LINKS && userData.PERSONAL_INFO.SOCIAL_LINKS.map((social, index) => (
                        <div
                            className="Social-link"
                            key={index}
                            onClick={() => window.open(`https://${social.LINK}`, '_blank')}
                            style={{ cursor: 'pointer' }}
                        >
                            {social.SITE_NAME}
                        </div>
                    ))}
                </div>

                <div className="Circles-container">
                    {/* Circle components as in your original code */}
                    circles go here?
                </div>


                <div className="Edit-BTN-container">
                    <button
                        onClick={handleLogout}
                        className="Logout-button">
                        Log out
                    </button>
                </div>

                <div className="Bottom-margin"></div>
            </div>
        );
}

export default MyProfile;
