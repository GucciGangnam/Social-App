// IMPORTS 
// Styles 
import "./UserProfile.css"
// RRD 
import { useNavigate, useParams } from "react-router-dom"
// Reacr 
import { useState, useEffect } from "react";
// variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;
// Compoennt 


// COMPONEnt
export const UserProfile = ({ fetchMyInfo }) => {

    const navigate = useNavigate();
    const myData = JSON.parse(localStorage.getItem('userData'));

    const { userId } = useParams();

    const [user, setUser] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const [userNotFound, setUserNotFound] = useState(false);


    useEffect(() => {
        fetchUserInfo();
    }, [])


    // function for fetching searched uder data
    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/profile/findbyusername/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (!response.ok) {
                setUserNotFound(true)
                console.log("User not found")
            } else {
                setUser(data)
                console.log(data.PERSONAL_INFO.USER_NAME)
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        } finally {
            setPageLoading(false)
        }
    }

    // Function for adding freind
    // const [addFriendState, setAddFriendState] = useState("Add Friend");
    // console.log(myData)
    // console.log(user)


    const handleAddFriend = async () => {
        // make fetch to back end to update 
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/addfriend`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ receiverID: user.ID })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("No good")
                console.log(data)
            } else {
                console.log("Yes good");
                fetchMyInfo();
                console.log(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }

    const handleCancelAddFriend = async () => {
        // make fetch to back end to update 
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/canceladdfriend`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ receiverID: user.ID })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("No good")
                console.log(data)
            } else {
                console.log("Yes good");
                fetchMyInfo();
                console.log(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }

    const handleAcceptFriendRequest = async () => {
        // make fetch to back end to update 
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/acceptaddfriend`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ senderID: user.ID })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("No good")
                console.log(data)
            } else {
                console.log("Yes good");
                fetchMyInfo();
                console.log(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }

    const handleDeclineFriendRequest = async() => { 
                // make fetch to back end to update 
                console.log(user.ID)
                try {
                    const token = localStorage.getItem('accessToken');
                    const response = await fetch(`${backendUrl}/users/declineaddfriend`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ senderID: user.ID })
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        console.log("No good")
                        console.log(data)
                    } else {
                        console.log("Yes good");
                        fetchMyInfo();
                        console.log(data);
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                    // Handle errors as needed
                }
    }


    if (pageLoading) {
        return (
            <div className="UserProfile">
                <div className="Header">
                    Loading
                </div>
                <div className="Profile-info">
                    <div className="Avatar-container">
                        <img src="/blank_user.jpg"></img>
                    </div>
                    <div className="Personal-info">
                        <div className="Name">
                            Loading
                        </div>
                        <div className="Bio">
                            Loading
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
                    <button>Loading</button>
                </div>
                <div className="Social-links-container">
                    Loading content
                </div>
            </div>
        )
    }

    if (userNotFound) {
        return (
            <div className="UserProfile">
                <div className="Header">
                    Not Found
                </div>
                <div className="Profile-info">
                    <div className="Avatar-container">
                        <img src="/blank_user.jpg"></img>
                    </div>
                    <div className="Personal-info">
                        <div className="Name">
                            Not Found
                        </div>
                        <div className="Bio">
                            Not Found
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
                    <button
                        onClick={() => { navigate('/myprofile/friends') }}>Go back</button>
                </div>
                <div className="Social-links-container">
                    <h1>{userId} doesn't exist</h1>
                </div>
            </div>
        )


    } else {

        return (
            <div className="UserProfile">
                <div className="Header">
                    {user.PERSONAL_INFO.USER_NAME}
                </div>

                <div className="Profile-info">

                    <div className="Avatar-container">
                        <img
                            src={user.PERSONAL_INFO.AVATAR ? user.PERSONAL_INFO.AVATAR : "/Black-pp.jpg"}
                            alt="Avatar"
                        />
                    </div>

                    <div className="Personal-info">
                        <div className="Name">
                            {user.PERSONAL_INFO.FIRST_NAME} {user.PERSONAL_INFO.LAST_NAME}
                        </div>
                        <div className="Bio">
                            {user.PERSONAL_INFO.BIO}
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
                    {
                        myData.MAIN_DATA.CONTACTS.includes(user.ID) ? (
                            <button>Message</button>
                        ) : (
                            myData.MAIN_DATA.FRIEND_REQUESTS_IN.includes(user.ID) ? (
                                <div
                                style={{
                                    display:"flex",
                                    gap:'10px'
                                }}>
                                    <button
                                        style={{
                                            background: "var(--green1"
                                        }}
                                        onClick={handleAcceptFriendRequest}>Accept Request</button>

                                    <button
                                        style={{
                                            background: "var(--red1)"
                                        }}
                                        onClick={handleDeclineFriendRequest}>Decline request</button>
                                </div>

                            ) : (
                                myData.MAIN_DATA.FRIEND_REQUESTS_OUT.includes(user.ID) ? (
                                    <button
                                        style={{
                                            background: "var(--element-background)"
                                        }}
                                        onClick={handleCancelAddFriend}>Cancel Request</button>
                                ) : (
                                    <button
                                        style={{
                                            background: "var(--primary-fill)"
                                        }}
                                        onClick={handleAddFriend}>Add Friend</button>
                                )
                            )
                        )
                    }
                </div>


                <div className="Social-links-container">
                    {user.PERSONAL_INFO.SOCIAL_LINKS && user.PERSONAL_INFO.SOCIAL_LINKS.map((social, index) => (
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


            </div>

        )
    }

}
