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
            <div
            style={{
                fontSize: "18px"
            }}>The home of going out</div>
            <button
            onClick={() => { navigate("/login")}}>Enter</button>
            <br/>
            <br/>
        </div>
    )
}