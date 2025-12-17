import React from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Logo from './assets/AI_Logos/NUGGYS_LOGO.png'
import Apple from './assets/Apple.png'

export default function Entrance() {
    const navigate = useNavigate()
    
    return (
        <div className='App'>
            <img src={Logo} alt="Logo" className='logo' />
            <div className='LogIns load'>
                <button className='Join-button' onClick={() => navigate('/enter-email')}>Join</button>
                <button className='Log-button'>Log in</button>
                <button className='Log-button'><img src={Apple} alt="Apple" style={{ width: '14px', height: '14px' }} /> Sign in with Apple</button>
                <p style={{ marginTop: '9px' }}>Forgot password</p>
            </div>
        </div>
    )
}