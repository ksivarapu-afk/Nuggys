import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Show from './assets/Icons/Show Icon.png'
import Hide from './assets/Icons/Hide Icon.png'
import { takenUsernames } from './data/takenUsernames'

export default function AccountCreation() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Validation functions
    const isFirstNameValid = firstName.trim().length > 0
    
    // Check if username is taken (case-insensitive)
    const isUsernameTaken = username.trim().length > 0 && 
                           takenUsernames.some(taken => taken.toLowerCase() === username.trim().toLowerCase())
    const isUsernameValid = username.trim().length > 0 && !isUsernameTaken
    
    // Password requirements (3 total)
    const hasMinLength = password.length >= 8
    const hasUpperAndLowercase = /[a-z]/.test(password) && /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    
    // Count how many of the 3 requirements are met
    const passwordRequirementsMet = [hasMinLength, hasUpperAndLowercase, hasNumber].filter(Boolean).length
    
    const isPasswordValid = hasMinLength && hasUpperAndLowercase && hasNumber

    const isButtonActive = isFirstNameValid && isUsernameValid && isPasswordValid
    
    // Determine password border color based on requirements met
    const getPasswordBorderColor = () => {
        if (password.length === 0) return undefined // No border change when empty
        if (passwordRequirementsMet <= 1) return '#FF4D4D' // Red for 0-1 requirements
        if (passwordRequirementsMet === 2) return '#FFE55A' // Yellow for 2 requirements
        return '#28FFBF' // Blue/green for all 3 requirements
    }

    return (
        <div className="onboarding-container">
            <div style={{marginLeft: '30px', marginTop: '150px', width: '333px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <p style={{fontSize: '18px', fontWeight: '600', lineHeight: '120%', textAlign: 'left', color: '#FFFFFF'}}>Create your account</p>
                </div>
                <div style={{position: 'relative', zIndex: 2}}>
                    <form style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            placeholder='First Name' 
                            className='email'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder='Username' 
                            className='email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                border: isUsernameTaken ? '0.5px solid #FF4D4D' : undefined
                            }}
                        />
                        {isUsernameTaken && (
                            <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#FF4D4D', cursor: 'pointer', margin: 0, textAlign: 'left'}}>Username is already in use</p>
                        )}
                        <div style={{position: 'relative', width: '100%'}}>
                            {password.length !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '18px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        padding: '0',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 10,
                                    }}
                                >
                                    <img 
                                        src={showPassword ? Hide : Show} 
                                        alt={showPassword ? "Hide" : "Show"} 
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            flexShrink: 0,
                                            aspectRatio: '6/7',
                                        }}
                                    />
                                </button>
                            )}
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                name="password" 
                                placeholder='Password' 
                                className='email'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    border: password.length > 0 ? `1px solid ${getPasswordBorderColor()}` : undefined
                                }}
                            />
                        </div>
                        <p style={{fontSize: '10px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.1px', color: '#B3B3B3', cursor: 'pointer', margin: 0, textAlign: 'left'}}>8+ characters with upper/lowercase and number</p>
                    </form>
                </div>
            </div>
            <div className="onboarding-footer">
                <button 
                    type='button' 
                    className={isButtonActive ? 'next-button' : 'next-button next-button-disabled'}
                    disabled={!isButtonActive}
                    onClick={() => {
                        if (isButtonActive) {
                            // Save username to localStorage
                            localStorage.setItem('username', username.trim())
                            localStorage.setItem('firstName', firstName.trim())
                            navigate('/onboarding')
                        }
                    }}
                    style={{marginLeft: '200px', marginTop: '570px'}}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

