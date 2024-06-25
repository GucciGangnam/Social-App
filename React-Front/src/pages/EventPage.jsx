// IMPORTS
// Styles 
import "./EventPage.css"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
// Variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Comonents 
export const EventPage = ({ handleLogout }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const userDataString = localStorage.getItem("userData");
    const userData = JSON.parse(userDataString);

    // fetch admins avatr
    const [adminAvatar, setAdminAvatar] = useState('/Black-pp.jpg')

    const fetchAdminAvatar = async(adminID) => { 
        console.log(adminID)
        try{ 
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/profile/findbyids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ arrayOfIDs: [adminID] })
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 403) {
                    handleLogout();
                }
                console.log(data.msg)
            } else {
                console.log('XXXXXXXXXXXX')
                setAdminAvatar(data[0].AVATAR)
            }
        } catch (error) { 
            console.error(error)
        }
    }


    console.log(userData)

    useEffect(() => {
        fetchSingleEvent();
        console.log(eventOBJ)
    }, [id]);

    const [eventOBJ, setEventOBJ] = useState();
    const [pageLoading, setPageLoading] = useState(true)

    const fetchSingleEvent = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/get/single/event/${id}`, {
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

                fetchAdminAvatar(data.event.PUBLIC_DATA.EVENT_ADMIN)
                setPageLoading(false);
                console.log(data.event)
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }

    const handleCancelEvent = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/cancel/event`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventID: id  // Assuming `id` is defined somewhere in your component
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.msg);
                navigate("/home")  // Log error message if response is not ok
            } else {
                // If successful, fetch updated event data or perform other actions
                navigate("/home")
                console.log(data.msg);  // Log success message
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle network errors or other exceptions here
        }
    };

    const handleRequestToJoinEvent = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/join/event`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventID: id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.msg);
                navigate("/home")  // Log error message if response is not ok
            } else {
                // If successful, fetch updated event data or perform other actions
                fetchSingleEvent();
                console.log(data.msg);  // Log success message
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle network errors or other exceptions here
        }
    }

    const handleLeaveEvent = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/leave/event`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    eventID: id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.msg);  // Log error message if response is not ok
                navigate("/home")
            } else {
                // If successful, fetch updated event data or perform other actions
                fetchSingleEvent();
                console.log(data.msg);  // Log success message
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle network errors or other exceptions here
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
            <div className="EventPage">

                <div className="Header">Happen</div>
                <div className="Title-section">{eventOBJ.PUBLIC_DATA.EVENT_TITLE}</div>
                <div className="IMG-section">
                    <img
                        className="Event-img"
                        src={eventOBJ.PUBLIC_DATA.EVENT_IMG} alt="Event" />
                </div>
                <div className="Meta-section">
                    <div className="Attendees">
                        <div className="Attendee-avatars-container">
                            {eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST.map((attendee) => (
                                <img
                                src={adminAvatar}
                                    key={attendee}
                                    className="Attendee-avatar">
                                </img>
                            ))}
                        </div>
                    </div>
                    <div className="Privacy-preference">{eventOBJ.PUBLIC_DATA.EVENT_PRIVACY_PREFERENCE}</div>
                </div>
                <div className="Info-section">
                    <strong>Info</strong>
                    <div className="Info">
                        {eventOBJ.PUBLIC_DATA.EVENT_INFO}
                    </div>
                </div>
                <div className="Button-section">
                    {userData.ID === eventOBJ.PUBLIC_DATA.EVENT_ADMIN ? (
                        <button onClick={handleCancelEvent}>Cancel event</button>
                    ) : (
                        eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST.includes(userData.ID) ? (
                            <button onClick={handleLeaveEvent}>Leave</button>
                        ) : (
                            <button onClick={handleRequestToJoinEvent}>Join</button>
                        )
                    )}
                </div>

                <div className="Bottom-margin">
                </div>

            </div>
        )
    }

}
