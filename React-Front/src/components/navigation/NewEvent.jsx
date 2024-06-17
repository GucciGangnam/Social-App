// IMPORTS 
// Styles 
import "./NewEvent.css"
// React
import { useState, useRef } from "react";
// Compinents 
import { CircleSelector } from "./CirlceSelector";



// COMPONENT 

export const NewEvent = ({ createNewEventOpen }) => {

    const [title, setTitle] = useState(null);
    const [info, setInfo] = useState(null);
    const [circle, setCircle] = useState('All Friends');

    // Handle Post Event
    const handlePostEvent = () => {
        const eventOBJ = {
            Title: title,
            Info: info,
            Image: backgroundImage,
            PrivacyPreference: privacyPreference,
            Circle: circle
        }
        console.log(eventOBJ)
    }

    // Handle file upload
    const fileInputRef = useRef(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const handleDivClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const size = Math.min(img.width, img.height); // Crop to a square
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img,
                        (img.width - size) / 2, // Start X
                        (img.height - size) / 2, // Start Y
                        size, size, // Source Width and Height
                        0, 0, // Destination X and Y
                        size, size // Destination Width and Height
                    );
                    const croppedImageUrl = canvas.toDataURL('image/png');
                    setBackgroundImage(croppedImageUrl);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };


    //Button handlers 
    const [privacyPreference, setPrivacyPreference] = useState('Circle Only')
    const handlePrivacyButtonClick = () => {
        if (privacyPreference === 'Circle Only') {
            setPrivacyPreference('Friends of friends')
        }
        if (privacyPreference === 'Friends of friends') {
            setPrivacyPreference('Anyone')
        }
        if (privacyPreference === 'Anyone') {
            setPrivacyPreference('Circle Only')
        }
    }

    // handle Info Click 
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const handleInfoClick = () => {
        setIsInfoModalOpen(true)
    }

    // handle Input field changes 
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleInfoChange = (e) => {
        setInfo(e.target.value)
    }


    return (
        <div
            className="NewEvent"
            style={{
                height: createNewEventOpen ? "calc(100vh - 60px)" : "0px"
            }}>

                <h2>Make it happen</h2>

            <div className="Title-container">
                <input
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange} />

            </div>

            <div className="Info-container">
                <input
                    placeholder="More info"
                    value={info}
                    onChange={handleInfoChange} />

            </div>

            <div className="Camera-container">
                <div
                    className="File-uploader"
                    onClick={handleDivClick}
                    style={{
                        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                        backgroundSize: 'contain', // Changed from cover to contain
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >

                    <svg
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="12"
                            cy="13"
                            r="3"
                            stroke="#1C274C"
                            strokeWidth="1.5" />
                        <path
                            d="M2 13.3636C2 10.2994 2 8.76721 2.74902 7.6666C3.07328 7.19014 3.48995 6.78104 3.97524 6.46268C4.69555 5.99013 5.59733 5.82123 6.978 5.76086C7.63685 5.76086 8.20412 5.27068 8.33333 4.63636C8.52715 3.68489 9.37805 3 10.3663 3H13.6337C14.6219 3 15.4728 3.68489 15.6667 4.63636C15.7959 5.27068 16.3631 5.76086 17.022 5.76086C18.4027 5.82123 19.3044 5.99013 20.0248 6.46268C20.51 6.78104 20.9267 7.19014 21.251 7.6666C22 8.76721 22 10.2994 22 13.3636C22 16.4279 22 17.9601 21.251 19.0607C20.9267 19.5371 20.51 19.9462 20.0248 20.2646C18.9038 21 17.3433 21 14.2222 21H9.77778C6.65675 21 5.09624 21 3.97524 20.2646C3.48995 19.9462 3.07328 19.5371 2.74902 19.0607C2.53746 18.7498 2.38566 18.4045 2.27673 18"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round" />
                        <path
                            d="M19 10H18"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round" />
                    </svg>




                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    capture="camera"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>

            <div className="Privacy-container">
                <button
                    onClick={handlePrivacyButtonClick}
                    style={{
                        backgroundColor: privacyPreference === 'Circle Only' ? '#C5E0B4' :
                            privacyPreference === 'Friends of friends' ? '#B4C7E7' : '#FF8F8D',
                    }}
                >
                    {privacyPreference}
                </button>
                <div
                    onClick={handleInfoClick}
                    className="Info-div">
                    i
                </div>
            </div>

            {privacyPreference !== 'Anyone' && (
                <div className="Circles-container">
                    <CircleSelector />
                </div>
            )}

            <button
                onClick={handlePostEvent}
                className="Post-event-btn">
                Post
            </button>


            {isInfoModalOpen && (
                <div
                    className="Info-box-overlay"
                    onClick={() => { setIsInfoModalOpen(false) }}>

                    <div className="Info-box">
                        <div>
                            <strong
                                style={{
                                    color: "#FF8F8D"
                                }}>Anyone</strong>
                            <p>This option allows anyone near you to view your event, regardless of whether they are connected to you.</p>
                        </div>
                        <div>
                            <strong
                                style={{
                                    color: "#B4C7E7"
                                }}>Friends of friends</strong>
                            <p>Only the peopel in your circle will be able to see your event but once somebody joins, their friends may also see it too.</p>
                        </div>
                        <div>
                            <strong
                                style={{
                                    color: "#C5E0B4"
                                }}>Circle</strong>
                            <p>Only people in your selected cirlce will see this event.</p>
                        </div>
                    </div>

                </div>
            )}





        </div>
    );
};