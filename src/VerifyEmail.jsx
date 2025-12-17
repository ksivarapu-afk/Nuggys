import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Reload from './assets/Selectable Icon.png'

export default function VerifyEmail() {
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state?.email || 'your email'
    const [code, setCode] = useState('')

    const handleCodeChange = (e) => {
        const value = e.target.value
        // Only allow numeric input and limit to 6 digits
        const numericValue = value.replace(/\D/g, '').slice(0, 6)
        setCode(numericValue)
    }

    // Button is active when exactly 6 digits are entered
    const isButtonActive = code.length === 6

    return (
        <div className="onboarding-container">
            <div style={{marginLeft: '30px', marginTop: '250px', width: '333px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <p style={{fontSize: '18px', fontWeight: '600', lineHeight: '120%', textAlign: 'left', color: '#FFFFFF'}}>Verify your email</p>
                    <div style={{display: 'flex', gap: '6px', alignItems: 'flex-end'}}>
                        <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', textAlign: 'left', color: '#B3B3B3'}}>We sent a code to<br/><span style={{color: '#FFFFFF'}}>{email}</span></p>
                        <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', textAlign: 'left', color: '#808080'}}>Change</p>
                    </div>
                </div>
                <div style={{position: 'relative', zIndex: 2}}>
                    <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <div style={{position: 'relative', width: '100%'}}>
                            {code.length === 0 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log('Reload code')
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
                                        src={Reload} 
                                        alt="Reload" 
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
                                type="text" 
                                inputMode="numeric"
                                maxLength="6"
                                id="code" 
                                name="code" 
                                placeholder='Code' 
                                className='codebox'
                                value={code}
                                onChange={handleCodeChange}
                                required
                                style={{paddingRight: '45px', width: '100%'}}
                            />
                        </div>
                        {code.length === 0 && (
                            <div style={{display: 'flex', alignItems: 'flex-end', gap: '12px', justifyContent: 'end'}}>
                                <p style={{fontSize: '10px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.1px', color: '#B3B3B3', cursor: 'pointer', margin: 0, textAlign: 'right'}}>Resend in 30s</p>
                            </div>
                        )}
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
                            navigate('/create-account', { state: { email } })
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