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
export const Chat = ({ handleLogout }) => {

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
                console.log(data.event)
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
        console.log('Message sent:', messageInput);
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
                console.log("Message sent")
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
                    {eventOBJ.PUBLIC_DATA.EVENT_TITLE}
                </div>

                <div className="Chat-window">
                    {eventOBJ.PUBLIC_DATA.EVENT_CHAT_LOG ? eventOBJ.PUBLIC_DATA.EVENT_CHAT_LOG.map((messageOBJ, index) => (
                        
                        <div
                            className="Message-container"
                            key={index}
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
