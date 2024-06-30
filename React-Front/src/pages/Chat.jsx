// IMPORTS
// React 
import { useState, useEffect } from "react";
// RRD
import { useNavigate, useParams } from "react-router-dom";
// Styles 
import "./Chat.css"
// Variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;



// COMPONENT 
export const Chat = ({ handleLogout, setHideNav }) => {

    useEffect(() => {
        setHideNav(true);
        return () => {
            setHideNav(false);
        }
    }, [])

    // Handle Go Back 
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);

    const { chatID } = useParams();
    // Fetch event info 
    useEffect(() => {
        fetchSingleEvent();
    }, []);

    const [eventOBJ, setEventOBJ] = useState();
    const [pageLoading, setPageLoading] = useState(true)

    const fetchSingleEvent = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/get/single/event/${chatID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 403) {
                    handleLogout();
                }
                console.log(data.msg)
            } else {
                setEventOBJ(data.event);
                setPageLoading(false);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }


    // SEND MESSAGE
    const [messageInput, setMessageInput] = useState("")
    const handleMessageChange = (e) => {
        setMessageInput(e.target.value);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };
    const sendMessage = async () => {
        // Run send message fetch
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventID: chatID,
                    message: messageInput
                })
            });
            if (!response.ok) {
                if (response.status === 403) {
                    handleLogout();
                }
                console.log("Message not sent")
            } else {
                fetchSingleEvent();
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        } finally {
            setMessageInput('');
        }
    }



    {
        if (pageLoading) {
            return (
                <div>Loading</div>
            )
        }
    }

    if (!pageLoading) {
        return (

            <div className="Chat">

                <div
                    className="Header">


                    <svg
                        onClick={handleGoBack}
                        width="30px"
                        height="30px"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <style>
                                {`.cls-1 {
                                    fill: none;
                                    stroke: var(--primary-fill);
                                    stroke-linecap: round;
                                    stroke-linejoin: round;
                                    stroke-width: 30px;}`}
                            </style>
                        </defs>
                        <g
                            data-name="Layer 2"
                            id="Layer_2">
                            <g
                                data-name="E416, back, Media, media player, multimedia, player"
                                id="E416_back_Media_media_player_multimedia_player">
                                <circle
                                    className="cls-1"
                                    cx="256"
                                    cy="256"
                                    r="246" />
                                <polyline
                                    className="cls-1"
                                    points="333.82 100.37 178.18 256 333.82 411.63" />
                            </g>
                        </g>
                    </svg>




                    {eventOBJ.PUBLIC_DATA.EVENT_TITLE}
                </div>

                <div className="Chat-window">
                    {eventOBJ.PUBLIC_DATA.EVENT_CHAT_LOG ? eventOBJ.PUBLIC_DATA.EVENT_CHAT_LOG.map((messageOBJ, index) => (
                        <div key={index}>
                            <div className="Message-user-name">{messageOBJ.FIRST_NAME} {messageOBJ.LAST_NAME}</div>
                            <div
                                className="Message-container"
                                style={{
                                    background: userData.ID === messageOBJ.ID ? 'var(--blue1)' : 'var(--element-background)'
                                }}
                            >
                                <img
                                    className="Message-avatar"
                                    src={messageOBJ.AVATAR || '/Black-pp.jpg'}
                                />
                                <div className="Message-content">
                                    {messageOBJ.MESSAGE}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div>No messages yet</div>
                    )}
                </div>


                <div className="Input">
                    <input
                        value={messageInput}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Message" />
                </div>

            </div>
        )
    }
};
