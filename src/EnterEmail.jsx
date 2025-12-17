import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

export default function EnterEmail() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        setIsEmailValid(e.target.validity.valid && value.trim() !== '')
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
    }

    const isButtonActive = isEmailValid && isChecked

    return (
        <div className="onboarding-container">
            <div style={{marginLeft: '30px', marginTop: '250px', width: '333px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <p style={{fontSize: '18px', fontWeight: '600', lineHeight: '120%', textAlign: 'left', color: '#FFFFFF'}}>Enter your email</p>
                    <div style={{display: 'flex', gap: '6px'}}>
                        <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', textAlign: 'left', color: '#B3B3B3'}}>United States</p>
                        <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', textAlign: 'left', color: '#808080'}}>Change</p>
                    </div>
                </div>
                <div style={{position: 'relative', zIndex: 2}}>
                    <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder='Email' 
                            className='email'
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex', alignItems: 'flex-start', gap: '12px'}}>
                                <input 
                                    type="checkbox" 
                                    id="terms" 
                                    name="terms" 
                                    className='checkbox'
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label htmlFor="terms" style={{fontSize: '10px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.1px', color: '#ffffff', cursor: 'pointer', margin: 0, textAlign: 'left'}}>
                                    By continuing, you accept our<br/>Terms and Privacy Policy.
                                </label>
                            </div>
                            <p style={{fontSize: '10px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.1px', color: '#B3B3B3', cursor: 'pointer', margin: 0, textAlign: 'right'}}></p>
                        </div>
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
                            navigate('/verify-email', { state: { email } })
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

