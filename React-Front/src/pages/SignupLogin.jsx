// IMPORTS //
// RRD
// React
import { useState, useEffect } from 'react'
// Styles 
import './SignupLogin.css'
// Components
import { SignupOptions } from '../components/signuplogin/SignupOptions'
import { SignupEmail } from '../components/signuplogin/SignupEmail'
import { SignupMeta } from '../components/signuplogin/SignupMeta'
import { SignupApple } from '../components/signuplogin/SignupApple'
import { SignupGoogle } from '../components/signuplogin/SignupGoogle'
import { SignupX } from '../components/signuplogin/SignupX'
import { LoginOptions } from '../components/signuplogin/LoginOptions'
import { LoginEmail } from '../components/signuplogin/LoginEmail'
import { LoginMeta } from '../components/signuplogin/LoginMeta'
import { LoginApple } from '../components/signuplogin/LoginApple'
import { LoginGoogle } from '../components/signuplogin/LoginGoogle'
import { LoginX } from '../components/signuplogin/LoginX'




// COMPONENTS //
export const SignupLogin = ({ fetchMyInfo, setHideNav }) => {

    // HIDE NAV BAR HERE
    useEffect(() => {
        setHideNav(true);
        return () => {
            setHideNav(false);
        }
    }, [])

    // Form Selector
    const [formSelector, setFormSelector] = useState('SignupOptions')

    return (
        <div className='SignupLogin'>
            <h1
                style={{
                    color: "var(--primary-fill)"
                }}>
                Kiko</h1>

            {formSelector === 'SignupOptions' && <SignupOptions setFormSelector={setFormSelector} fetchMyInfo={fetchMyInfo} />}
            {formSelector === 'SignupEmail' && <SignupEmail setFormSelector={setFormSelector} />}
            {formSelector === 'SignupMeta' && <SignupMeta setFormSelector={setFormSelector} />}
            {formSelector === 'SignupApple' && <SignupApple setFormSelector={setFormSelector} />}
            {formSelector === 'SignupGoogle' && <SignupGoogle setFormSelector={setFormSelector} />}
            {formSelector === 'SignupX' && <SignupX setFormSelector={setFormSelector} />}

            {formSelector === 'LoginOptions' && <LoginOptions setFormSelector={setFormSelector} fetchMyInfo={fetchMyInfo} />}
            {formSelector === 'LoginEmail' && <LoginEmail setFormSelector={setFormSelector} fetchMyInfo={fetchMyInfo} />}
            {formSelector === 'LoginMeta' && <LoginMeta setFormSelector={setFormSelector} fetchMyInfo={fetchMyInfo} />}
            {formSelector === 'LoginApple' && <LoginApple setFormSelector={setFormSelector} fetchMyInfo={fetchMyInfo} />}
            {formSelector === 'LoginGoogle' && <LoginGoogle setFormSelector={setFormSelector} fetchMyInfo={fetchMyInfo} />}
            {formSelector === 'LoginX' && <LoginX setFormSelector={setFormSelector} fetchMyInfo={fetchMyInfo} />}

        </div>
    )
}