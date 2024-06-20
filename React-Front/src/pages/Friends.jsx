// IMPORTS 
// Styles 
import "./Friends.css"
// React 
import { useState, useEffect } from "react"
// RRD
import { useNavigate } from "react-router-dom"
// Variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;
// Components 

// COMPOENNT 
export const Friends = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {
        fetchContactDataByIDs();
        fetchContactRequestsDataByIDs();
    }, [])

    // State for search input and results visibility
    const [searchShowing, setSearchShowing] = useState(false)
    const [resultsShowing, setResultsShowing] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])

    // Search function 
    const handleAddIconClick = () => {
        setSearchShowing(!searchShowing)
    }
    const handleSearchInputChange = (event) => {
        const query = event.target.value
        setSearchQuery(query)

        if (query.length > 0) {
            // Simulate search results
            setSearchResults(['find user: ' + query]) // Replace with actual search logic
            setResultsShowing(true)
        } else {
            setResultsShowing(false)
        }
    }

    // Fetch friend names by id and display 
    const [contactList, setContactList] = useState([]);
    const fetchContactDataByIDs = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/profile/findbyids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    arrayOfIDs: userData.MAIN_DATA.CONTACTS
                })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("no good")
            } else {
                console.log("yes good")
                setContactList(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }

    const [contactRequestsList, setContactRequestsList] = useState([]);
    const fetchContactRequestsDataByIDs = async() => { 
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/profile/findbyids`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    arrayOfIDs: userData.MAIN_DATA.FRIEND_REQUESTS_IN
                })
            });
            const data = await response.json();
            if (!response.ok) {
                console.log("no good")
            } else {
                console.log("yes good")
                setContactRequestsList(data);
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle errors as needed
        }
    }




    // users/profile/findmultiplebyid/:ids


    return (
        <div className="Friends">

            <div className="Header">
                Friends
                <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleAddIconClick}>
                    <g
                        id="Edit / Add_Plus">
                        <path
                            id="Vector"
                            d="M6 12H12M12 12H18M12 12V18M12 12V6"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </g>
                </svg>
            </div>

            <div className={`Search ${searchShowing ? "show" : ""}`}>
                <input
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className={`Results ${resultsShowing ? "show" : "hidden"}`}>
                    {searchResults.map((result, index) => (
                        <div
                            onClick={() => {
                                console.log(result);
                                const userId = result.replace('find user: ', ''); // Extract the user ID
                                navigate(`/user/${userId}`);
                            }}
                            key={index}>{result}</div>
                    ))}
                </div>
            </div>

            <div className="Section-seperator">
                Requests
            </div>

            <div className="Friend-container">

            <div className="Friend-container">
                {contactRequestsList.map((contact) => (
                    <div key={contact.ID}>
                        <div
                            onClick={() => { navigate(`/user/${contact.USER_NAME}`) }}
                            className="Contact">
                            <div>{contact.FIRST_NAME} {contact.LAST_NAME}</div>
                            {/* Add more details as needed */}
                        </div>
                    </div>
                ))}
            </div>

            </div>

            <div className="Section-seperator">
                Contact
            </div>

            <div className="Friend-container">
                {contactList.map((contact) => (
                    <div key={contact.ID}>
                        <div
                            onClick={() => { navigate(`/user/${contact.USER_NAME}`) }}
                            className="Contact">
                            <div>{contact.FIRST_NAME} {contact.LAST_NAME}</div>
                            {/* Add more details as needed */}
                        </div>
                    </div>
                ))}
            </div>




        </div>
    )
}


{/* <svg
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
                    First Last */}