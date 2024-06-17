// IMPORTS 
// Styles 
import "./Friends.css"
// React 
import { useState, useEffect } from "react"
// RRD
import { useNavigate } from "react-router-dom"
// Components 
import { NavigationBar } from "../components/navigation/NavigationBar"

// COMPOENNT 
export const Friends = () => {
    const navigate = useNavigate();

    // State for search input and results visibility
    const [searchShowing, setSearchShowing] = useState(true)
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

    return (
        <div className="Friends">

            <div className="Header">
                Happen
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
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className={`Results ${resultsShowing ? "show" : "hidden"}`}>
                    {searchResults.map((result, index) => (
                        <div key={index}>{result}</div>
                    ))}
                </div>
            </div>

            <div className="Section-seperator">
                Requests
            </div>

            <div className="Friend-container">

                <div className="Contact">
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

                    First Last
                </div>

            </div>

            <div className="Section-seperator">
                Contact
            </div>

            <div className="Friend-container">


                <div className="Contact">
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

                    First Last
                </div>

            </div>



            <NavigationBar page="myprofile" />

        </div>
    )
}