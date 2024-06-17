// IMPORTS //
// React 
import { useState, useEffect } from 'react'
// RRD
import { Route, Routes } from 'react-router-dom'
// Compoents 
import { NavigationBar } from './components/navigation/NavigationBar'

// Styles
import './App.css'

// Components


// Pages
import { ErrorPage } from './pages/ErrorPage'
import { SignupLogin } from './pages/SignupLogin'
import { Home } from './pages/Home'
import { MyProfile } from './pages/MyProfile'
import { Friends } from './pages/Friends'
import { Messages } from './pages/Messages'
import { UserProfile } from './pages/UserProfile'

// COMPONENT //

function App() {

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
        <Route path="/login" element={<SignupLogin />} />
        <Route path='/home' element={<Home />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/myprofile/frinds' element={<Friends />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/user/*' element={<UserProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <NavigationBar isCreateNewEventShowing={isCreateNewEventShowing} setIsCreateNewEventShowing={setIsCreateNewEventShowing} />

    </div>
  )
}

export default App
