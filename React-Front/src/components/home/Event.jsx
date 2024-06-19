// IMPORTS 
// Styles
import "./Event.css";
// React
import { useState, useEffect } from "react";

// COMPONENT
export const Event = () => {





    return (
        <div className="Event">


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
        </div>
    );
};
