// IMPPRTS 
import "./LandingPage.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



// COMPONENT 

export const LandingPage = ({setHideNav}) => { 
const navigate = useNavigate();

    useEffect(() => {
        setHideNav(true);
        return () => {
            setHideNav(false);
        }
    }, [])


    return ( 
        <div className="LandingPage">
            Welcome to <strong>Kiko</strong>
            <button
            onClick={() => { navigate("/home")}}>Enter</button>
            <br/>
            <br/>
            <button className="terms">View Terms</button>
        </div>
    )
}