// IMPORTS 
// Styles
import "./Messages.css"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
// Variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// COMPOENNT 
export const Messages = ({ handleLogout }) => {
    const navigate = useNavigate();




    // State for search input and results visibility
    const [searchShowing, setSearchShowing] = useState(false)
    const [resultsShowing, setResultsShowing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleSearchIconClick = () => {
        setSearchShowing(!searchShowing)
    }

    const handleSearchInputChange = (event) => {
        const query = event.target.value
        setSearchQuery(query)

        if (query.length > 0) {
            // Simulate search results
            setSearchResults(["Result 1", "Result 2", "Result 3"]) // Replace with actual search logic
            setResultsShowing(true)
        } else {
            setResultsShowing(false)
        }
    }


    const [EventsArray, setEventsArray] = useState([])
    // Fetch user events 
    async function fetchEvenetsImIn() {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/events/eventsimattending`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 403 || response.status === 401) {
                    handleLogout();
                }
                console.log(data.msg)
            } else {
                setEventsArray(data.events)
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }
    useEffect(() => {
        fetchEvenetsImIn();
    }, [])

    return (
        <div className="Messages">
            <div className="Header">
                Messages
                <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleSearchIconClick} // Add the click handler here
                >
                    <path
                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
            </div>

            <div className={`Search ${searchShowing ? "show" : ""}`}>
                <input
                    placeholder="Search contacts"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className={`Results ${resultsShowing ? "show" : "hidden"}`}>
                    {searchResults.map((result, index) => (
                        <div key={index}>{result}</div>
                    ))}
                </div>
            </div>






            <div className="Message-type-seperator">
                Active Groups
            </div>





            <div className="Convo-container">


                {EventsArray.map((eventOBJ, index) => (
                    <div
                    onClick={() => { navigate(`/messages/${eventOBJ._id}`)}}
                        key={index}
                        className="Group-Convo">
                        {eventOBJ.PUBLIC_DATA.EVENT_TITLE}
                    </div>
                ))}


            </div>






            <div className="Message-type-seperator">
                Messages
            </div>





            <div className="Convo-container">

                {/* <div className="Solo-Convo">

                    <svg
                        className="Circle-SVG"
                        fill="#FF8F8D"
                        width="15px"
                        height="15px"
                        viewBox="-1.92 -1.92 35.84 35.84"
                        version="1.1" xmlns="http://www.w3.org/2000/svg"
                        stroke="#FF8F8D" strokeWidth="3.2">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <title>circle</title> <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z" /> </g>
                    </svg>


                    Name
                    <div className="Notification">
                    </div>
                </div> */}


            </div>




        </div>
    )
}