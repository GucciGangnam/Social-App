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






    useEffect(() => {
        fetchSingleEvent();
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
                setPageLoading(false);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        } finally { 
            setLoadingJoin(false);
            setLoadingLeave(false);
        }
    }

    const [loadingCancel, setLoadingCancel] = useState(false)
    const handleCancelEvent = async () => {
        try {
            setLoadingCancel(true)
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
                setLoadingCancel(false);
                console.log(data.msg);
                navigate("/home")  // Log error message if response is not ok
            } else {
                // If successful, fetch updated event data or perform other actions
                navigate("/home")
                console.log(data.msg);  // Log success message
                setLoadingCancel(false);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle network errors or other exceptions here
        }
    };

    const [loadingJoin, setLoadingJoin] = useState(false)
    const handleRequestToJoinEvent = async () => {
        try {
            setLoadingJoin(true);
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
                setLoadingJoin(false);
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

    const [loadingLeave, setLoadingLeave] = useState(false)
    const handleLeaveEvent = async () => {
        try {
            setLoadingLeave(true)
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
                setLoadingLeave(false);
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

    // Hande Attendee Overlay 
    const [isAttendeeOverlayShowing, setIsAttendeeOverlayShowing] = useState(false);

    const handleShowHideAO = () => {
        setIsAttendeeOverlayShowing(prevState => !prevState);
    };

    {
        if (pageLoading) {
            return (
                <div className="EventPage-loading">

                    <div className="Header">Kiko</div>
                    <div className="Title-section"></div>
                    <div className="IMG-section">
                        <img
                            className="Event-img" />
                    </div>
                    <div className="Meta-section">
                        <div className="Attendees">
                            <div

                                className="Attendee-avatars-container">

                                <img
                                    className="Attendee-avatar"
                                    src='/Black-pp.jpg'
                                />
                            </div>
                        </div>
                        <div className="Privacy-preference">Loading</div>
                    </div>

                    <div className="Event-host">
                        Hosted by Loading
                    </div>

                    <div className="Info-section">
                        <strong>Info</strong>
                        <div className="Info">
                            Loading
                        </div>
                    </div>


                    <div className="Button-section">

                    </div>

                    <div className="Bottom-margin">
                    </div>


                </div>
            )
        }
    }

    if (!pageLoading) {
        return (
            <div className="EventPage">

                <div className="Header">Kiko</div>
                <div className="Title-section">{eventOBJ.PUBLIC_DATA.EVENT_TITLE}</div>
                <div className="IMG-section">
                    <img
                        className="Event-img"
                        src={eventOBJ.PUBLIC_DATA.EVENT_IMG} alt="Event" />
                </div>
                <div className="Meta-section">
                    <div className="Attendees">
                        <div
                            onClick={handleShowHideAO}
                            className="Attendee-avatars-container">
                            {eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST.map((user, index) => (
                                <img
                                    className="Attendee-avatar"
                                    src={user.PERSONAL_INFO.AVATAR || '/Black-pp.jpg'}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="Privacy-preference">{eventOBJ.PUBLIC_DATA.EVENT_PRIVACY_PREFERENCE}</div>
                </div>

                <div className="Event-host">
                    Hosted by {eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST[0].PERSONAL_INFO.FIRST_NAME} {eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST[0].PERSONAL_INFO.LAST_NAME}
                </div>

                <div className="Info-section">
                    <strong>Info</strong>
                    <div className="Info">
                        {eventOBJ.PUBLIC_DATA.EVENT_INFO}
                    </div>
                </div>


                <div className="Button-section">
                    {userData.ID === eventOBJ.PUBLIC_DATA.EVENT_ADMIN ? (
                        <div
                            style={{
                                display: "flex",
                                gap: "10px"
                            }}>
                            {!loadingCancel ?
                                <>
                                    <button onClick={handleCancelEvent}>Cancel event</button>
                                    <button onClick={() => { navigate(`/messages/${id}`) }}>Chat</button>
                                </>
                                :
                                <button className="Button-loading">Canceling</button>
                            }


                        </div>
                    ) : (
                        eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST.some(attendee => attendee.ID === userData.ID) ? (
                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px"
                                }}>
                                {!loadingLeave ?
                                    <>
                                        <button onClick={handleLeaveEvent}>Leave</button>
                                        <button onClick={() => { navigate(`/messages/${id}`) }}>Chat</button>
                                    </>
                                    :
                                    <button className="Button-loading">Leaving</button>
                                }
                            </div>
                        ) : (
                            !loadingJoin ?
                                <button onClick={handleRequestToJoinEvent}>Join</button>
                                :
                                <button className="Button-loading">Joining</button>
                        )
                    )}
                </div>

                <div className="Bottom-margin">
                </div>

                {isAttendeeOverlayShowing && (
                    <div
                        onClick={handleShowHideAO}
                        className="Overlay">
                        <div className="Attendee-List_overlay">
                            {eventOBJ.PUBLIC_DATA.EVENT_ATTENDEE_LIST.map((user) => (
                                <div
                                    key={user.ID}
                                    onClick={() => { navigate(`/user/${user.PERSONAL_INFO.USER_NAME}`) }}
                                    className="Attendee-name">
                                    {`${user.PERSONAL_INFO.FIRST_NAME} ${user.PERSONAL_INFO.LAST_NAME}`}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        )
    }

}
