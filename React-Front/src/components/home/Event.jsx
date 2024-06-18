// IMPORTS 
// Styles
import "./Event.css";
// React
import { useState, useEffect } from "react";

// COMPONENT
export const Event = () => {
    const [loadingContent, setLoadingContent] = useState(true);

    // Example effect to simulate loading state (you can remove this in your actual implementation)
    useEffect(() => {
        const timer = setTimeout(() => setLoadingContent(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="Event">
            {loadingContent ? (
                // LOADING SCREEN
                <div className="Event-background-loading">
                    <div className="IMG-container-loading">
                        loading
                    </div>
                    <div className="Title-container-loading">
                        Loading
                    </div>
                </div>
            ) : (
                // LOADED SCREEN
                <div className="Event-background">
                    <div className="Atendees-container">
                        <div className="Avatar-container">
                            <img src="/Avatar-example.png" alt="Avatar" />
                        </div>
                        <div className="Avatar-container">
                            <img src="/Avatar-example.png" alt="Avatar" />
                        </div>
                        <div className="Avatar-container">
                            <img src="/Avatar-example.png" alt="Avatar" />
                        </div>
                        <div className="Atendee-count">
                            +15
                        </div>
                    </div>
                    <div className="IMG-container">
                        <img src="/Event-img-example.jpeg" alt="Event" />
                    </div>
                    <div className="Title-container">
                        Title
                    </div>
                </div>
            )}
        </div>
    );
};
