// IMPORTS 
// Styles 
import "./UserProfile.css"
// Compoennt 
import { NavigationBar } from "../components/navigation/NavigationBar"

// COMPONEnt
export const UserProfile = () => {
    return (
        <div className="UserProfile">
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

                <div className="Frineds-icon-container">
                    <div className="Circle">
                        <svg
                            className="Circle-SVG"
                            fill="#e5e5e5"
                            width="50px"
                            height="50px"
                            viewBox="-1.92 -1.92 35.84 35.84"
                            version="1.1" xmlns="http://www.w3.org/2000/svg"
                            stroke="#e5e5e5" strokeWidth="3.2">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                            <g id="SVGRepo_iconCarrier"> <title>circle</title> <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z" /> </g>
                        </svg>
                        <div className="Cirlce-name">

                        </div>
                    </div>
                </div>

            </div>









            <div className="BTN-container">
                <button>Add Friend</button>
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
            <NavigationBar page="myprofile" />

        </div>

    )
}

