// IMPORTS //
// React 
import { useState, useEffect } from 'react'
// RRD
import { Route, Routes } from 'react-router-dom'
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
import { UserProfile } from './pages/UserProfile'

// COMPONENT //

function App() {

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

  const [isCreateNewEventShowing, setIsCreateNewEventShowing] = useState(false)





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
        <Route path="/login" element={<SignupLogin fetchMyInfo={fetchMyInfo} />} />
        <Route path='/home' element={<Home userData={userData} fetchMyInfo={fetchMyInfo} />} />
        <Route path='/myprofile' element={<MyProfile userData={userData} />} />
        <Route path='/myprofile/edit' element={<EditMyProfile userData={userData} fetchMyInfo={fetchMyInfo} />} />
        <Route path='/myprofile/friends' element={<Friends userData={userData} fetchMyInfo={fetchMyInfo} />} />
        <Route path='/messages' element={<Messages userData={userData} fetchMyInfo={fetchMyInfo} />} />
        <Route path='/user/:userId' element={<UserProfile fetchMyInfo={fetchMyInfo} />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <NavigationBar isCreateNewEventShowing={isCreateNewEventShowing} setIsCreateNewEventShowing={setIsCreateNewEventShowing} />

    </div>
  )
}

export default App
