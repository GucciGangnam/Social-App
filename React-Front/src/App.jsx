// IMPORTS //
// React 
import { useState, useEffect } from 'react'
// RRD
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
// Compoents 
import { NavigationBar } from './components/navigation/NavigationBar'
// variables 
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Styles
import './App.css'

// Components


// Pages
import { ErrorPage } from './pages/ErrorPage'
import { SignupLogin } from './pages/SignupLogin'
import { Home } from './pages/Home'
import { MyProfile } from './pages/MyProfile'
import { EditMyProfile } from './pages/EditMyProfile'
import { Friends } from './pages/Friends'
import { Messages } from './pages/Messages'
import { Chat } from './pages/Chat';
import { UserProfile } from './pages/UserProfile'
import { EventPage } from './pages/EventPage';

// COMPONENT //

function App() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const fetchMyInfo = async () => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${backendUrl}/users/myinfo`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (!response.ok) {
            alert(data.msg);
            localStorage.removeItem('accessToken');
        } else {
            setUserData(data)
            console.log(data)
            localStorage.setItem('userData', JSON.stringify(data));
            console.log("user data fetched sucesfully")
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Handle errors as needed
    }
}

const handleLogout = () => {
  console.log(' app level log out ')
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  navigate('/login');
}
  const [isCreateNewEventShowing, setIsCreateNewEventShowing] = useState(false)

    // async function fetchUserEvents() {
    //     try {
    //         const token = localStorage.getItem('accessToken');
    //         const response = await fetch(`${backendUrl}/events`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //         });
    //         const data = await response.json();
    //         if (!response.ok) {
    //             if (response.status === 403 || response.status === 401) {
    //                 handleLogout();
    //             }
    //             console.log(data.msg)
    //         } else {
    //             setEvents(data.events)
    //             setPageLoading(false)
    //         }
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //         // Handle errors as needed
    //     }
    // }



  // DARK MODE //
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const toggleTheme = () => {
  //   setIsDarkMode(prevMode => !prevMode);
  // };
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.setAttribute('data-theme', 'dark');
  //   } else {
  //     document.documentElement.removeAttribute('data-theme');
  //   }
  // }, [isDarkMode]);

  return (
    <div className='App'>

      {/* <button
        onClick={toggleTheme}>
      </button> */}





      <Routes>
        <Route path="/login" element={<SignupLogin fetchMyInfo={fetchMyInfo} handleLogout={handleLogout}/>} />
        <Route path='/home' element={<Home userData={userData} fetchMyInfo={fetchMyInfo} handleLogout={handleLogout} />} />
        <Route path='/event/:id' element={<EventPage fetchMyInfo={fetchMyInfo} handleLogout={handleLogout} />} />
        <Route path='/myprofile' element={<MyProfile userData={userData} handleLogout={handleLogout} />} />
        <Route path='/myprofile/edit' element={<EditMyProfile userData={userData} fetchMyInfo={fetchMyInfo}handleLogout={handleLogout} />} />
        <Route path='/myprofile/friends' element={<Friends userData={userData} fetchMyInfo={fetchMyInfo} handleLogout={handleLogout}/>} />
        <Route path='/messages' element={<Messages userData={userData} fetchMyInfo={fetchMyInfo}handleLogout={handleLogout} />} />
        <Route path='/messages/:chatID' element={<Chat userData={userData} fetchMyInfo={fetchMyInfo}handleLogout={handleLogout} />} />
        <Route path='/user/:userId' element={<UserProfile fetchMyInfo={fetchMyInfo}handleLogout={handleLogout} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <NavigationBar isCreateNewEventShowing={isCreateNewEventShowing} setIsCreateNewEventShowing={setIsCreateNewEventShowing} />

    </div>
  )
}

export default App
