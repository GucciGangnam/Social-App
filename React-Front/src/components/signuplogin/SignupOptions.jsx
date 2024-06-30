// IMPORTS 
// React 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Styles 
import "../../pages/SignupLogin.css"
// Variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// COMPONENTS 
export const SignupOptions = ({ setFormSelector, fetchMyInfo }) => {
    const navigate = useNavigate();


    // State for loading page on sign in / up
    const [loading, setLoading] = useState(false);

    // Button handlers
    const handleSignupWithEmail = () => {
        setFormSelector('SignupEmail')
    }

    const handleSignupWithMeta = () => {
        setFormSelector('SignupMeta')
    }

    const handleSignupWithApple = () => {
        setFormSelector('SignupApple')
    }

    const handleSignupWithGoogle = () => {
        setFormSelector('SignupGoogle')
    }

    const handleSignupWithX = () => {
        setFormSelector('SignupX')
    }

    const handleLoginButton = () => {
        setFormSelector('LoginOptions')
    }

    const handleCreateDemoAccount = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`${backendUrl}/users/demouser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const userData = await response.json();

            if (!response.ok) {
                console.log(userData.msg); // Log the error message from the server
            } else {
                try {
                    const loginResponse = await fetch(`${backendUrl}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: userData.email,
                            password: userData.password
                        })
                    });

                    const loginData = await loginResponse.json();

                    if (!loginResponse.ok) {
                        setLoading(false)
                        console.log("Error logging into demo account");
                    } else {
                        setLoading(false)
                        localStorage.setItem('accessToken', loginData.accessToken);
                        fetchMyInfo(); // Assuming this function fetches additional user info
                        navigate("/home"); // Redirect to home page after successful login
                    }
                } catch (loginError) {
                    console.error('Error:', loginError.message);
                    // Handle login errors
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            // Handle fetch or other errors
        }
    };



    return (
        <>
            {loading ? (
                <div className="loading-animation"></div>
            ) : (
                <div className="SignupOptions">
                    <h3
                        style={{
                            color: "var(--primary-fill)"
                        }}>Sign up</h3>
                    <button
                        onClick={handleSignupWithEmail}>
                        <img
                            src='/At-logo.png'
                            alt='Email'
                        ></img>
                        Sign up with Email
                        <div></div>
                    </button>

                    <button
                        onClick={handleSignupWithMeta}>
                        <img
                            src='/Meta-logo.png'
                            alt='Meta'
                        ></img>
                        Sign up with Meta
                        <div></div>
                    </button>

                    <button
                        onClick={handleSignupWithApple}>
                        <img
                            src='/Apple-logo.png'
                            alt='Apple'
                        ></img>
                        Sign up with Apple
                        <div></div>
                    </button>

                    <button
                        onClick={handleSignupWithGoogle}>
                        <img
                            src='/Google-logo.png'
                            alt='Google'
                        ></img>
                        Sign up with Google
                        <div></div>
                    </button>

                    <button
                        onClick={handleSignupWithX}>
                        <img
                            src='/X-logo.png'
                            alt='X'
                        ></img>
                        Sign up with X
                        <div></div>
                    </button>
                    or
                    <button
                        className="Main"
                        onClick={handleLoginButton}>
                        <div></div>
                        Log in
                        <div></div>
                    </button>

                    <button
                        className="Main-demo"
                        onClick={handleCreateDemoAccount}>
                        <div></div>
                        Demo Account
                        <div></div>
                    </button>

                </div>
            )}
        </>
    );
}