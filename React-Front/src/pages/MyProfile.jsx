// IMPORTS 
// Styles 
import "./MyProfile.css"
// RRD 
import { useNavigate } from "react-router-dom";

// Components 






// COMPONENT
export const MyProfile = () => {
    const navigate = useNavigate();

    // Button Handler - Navigate to freinds page 
    const handleFriendsBTNClick = () => { 
        navigate("/myprofile/frinds")
    }

    return (
        <div className="MyProfile">

            <div className="Header">
                Happen
            </div>




            <div className="Profile-info">

                <div className="Avatar-container">
                    <img src="/Avatar-example.png"></img>
                </div>


                <div className="Personal-info">
                    <div className="Name">
                        Name
                    </div>
                    <div className="Bio">
                        This is a bio
                    </div>
                </div>

                <div 
                className="Frineds-icon-container"
                onClick={handleFriendsBTNClick}>
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
                <button>Edit</button>
            </div>





            <div className="Social-links-container">
                <div className="Social-link">
                    Instagram
                </div>
                <div className="Social-link">
                    Facebook
                </div>
                <div className="Social-link">
                    Snapchat
                </div>
                <div className="Social-link">
                    Onlyfans
                </div>
            </div>






            <div className="Circles-container">

                <div className="Circle">
                    <svg
                        className="Circle-SVG"
                        fill="#C5E0B4"
                        width="50px"
                        height="50px"
                        viewBox="-1.92 -1.92 35.84 35.84"
                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                        stroke="#C5E0B4" strokeWidth="3.2">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <title>circle</title> <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z" /> </g>
                    </svg>
                    <div className="Cirlce-name">
                        Name
                    </div>
                </div>

                <div className="Circle">
                    <svg
                        className="Circle-SVG"
                        fill="#F8CBAD"
                        width="50px"
                        height="50px"
                        viewBox="-1.92 -1.92 35.84 35.84"
                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                        stroke="#F8CBAD" strokeWidth="3.2">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <title>circle</title> <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z" /> </g>
                    </svg>
                    <div className="Cirlce-name">
                        Name
                    </div>
                </div>

                <div className="Circle">
                    <svg
                        className="Circle-SVG"
                        fill="#B4C7E7"
                        width="50px"
                        height="50px"
                        viewBox="-1.92 -1.92 35.84 35.84"
                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                        stroke="#B4C7E7" strokeWidth="3.2">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <title>circle</title> <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z" /> </g>
                    </svg>
                    <div className="Cirlce-name">
                        Name
                    </div>
                </div>

                <div className="Circle">
                    <svg
                        className="Circle-SVG"
                        fill="#FFE699"
                        width="50px"
                        height="50px"
                        viewBox="-1.92 -1.92 35.84 35.84"
                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                        stroke="#FFE699" strokeWidth="3.2">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <title>circle</title> <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z" /> </g>
                    </svg>
                    <div className="Cirlce-name">
                        Name
                    </div>
                </div>

                <div className="Circle">
                    <svg
                        className="Circle-SVG"
                        fill="#FF8F8D"
                        width="50px"
                        height="50px"
                        viewBox="-1.92 -1.92 35.84 35.84"
                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                        stroke="#FF8F8D" strokeWidth="3.2">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <title>circle</title> <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z" /> </g>
                    </svg>
                    <div className="Cirlce-name">
                        Name
                    </div>
                </div>

            </div>

            <div className="Bottom-margin">

            </div>






        </div>
    )
}