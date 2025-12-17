import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Feed from './components/Feed'
import { feedData } from './data/feedData'
import back from './assets/Icons/Back Icon.png'
import settings from './assets/Icons/Settings Icon.png'
import redzone from './assets/Icons/Redzone General Icon.png'
import ballhawk from './assets/Icons/Ball Hawk Icon.png'
import ballknowledge from './assets/Icons/Ball Knowledge Icon.png'

export default function Leaderboard() {
    const navigate = useNavigate()
    const username = localStorage.getItem('username') || 'username'
    
    const handleBackClick = () => {
        navigate(-1) // Go back to previous page in browser history
    }
    
    return (
        <div className="App" style={{display: 'block'}}>
            <header className="App-header" style={{ paddingTop: `120px`}}>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '393px',
                    zIndex: 100,
                    pointerEvents: 'none'
                }}>
                    <div className='header' style={{ pointerEvents: 'auto' }}>
                        <div
                            onClick={handleBackClick}
                            style={{
                                width: '25px',
                                height: '25px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pointerEvents: 'auto'
                            }}
                        >
                            <img src={back} style={{ width: '25px', height: '25px', pointerEvents: 'none' }} alt='back' />
                        </div>
                        <div style={{width: '25px', height: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={settings} style={{ width: '25px', height: '25px' }} alt='settings' />
                        </div>
                    </div>
                </div>
                <div className='username'><p>@ {username}</p></div>
                <div style={{ display: 'flex', padding: '24px 30px', flexDirection: 'column', alignItems: 'center', gap: '30px', justifyContent: 'space-between', alignSelf: 'stretch', borderRadius: '20px', backgroundColor: '#0D0D0D'}}>
                    <p style={{alignSelf: 'stretch', color: '#B3B3B3', fontSize: '18px', fontWeight: '600', lineHeight: '120%', textAlign: 'left'}}>Leaderboard</p>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '21px', justifyContent: 'start', alignItems: 'start'}}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'end'}}>
                                <p style={{ fontSize: '24px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.12px', color: '#808080' }}>#</p>
                                <p style={{ fontSize: '32px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.32px', color: '#FFFFFF' }}>9216</p>
                            </div>
                            <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3' }}>World</p>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'end'}}>
                                <p style={{ fontSize: '24px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.12px', color: '#808080' }}>#</p>
                                <p style={{ fontSize: '32px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.32px', color: '#FFFFFF' }}>330</p>
                            </div>
                            <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3' }}>North America</p>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'end'}}>
                                <p style={{ fontSize: '24px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.12px', color: '#808080' }}>#</p>
                                <p style={{ fontSize: '32px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.32px', color: '#FFFFFF' }}>67</p>
                            </div>
                            <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3' }}>California</p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', padding: '24px 30px', flexDirection: 'column', alignItems: 'center', gap: '30px', justifyContent: 'space-between', alignSelf: 'stretch', borderRadius: '20px', backgroundColor: '#0D0D0D', marginTop: '15px'}}>
                    <p style={{alignSelf: 'stretch', color: '#B3B3B3', fontSize: '18px', fontWeight: '600', lineHeight: '120%', textAlign: 'left'}}>My Accolades</p>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '42px', justifyContent: 'start', alignItems: 'start'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={redzone} style={{ width: '22px', height: '42px' }} alt='redzone' />
                            <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#5AFFE7' }}>Redzone<br/>General III</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={ballhawk} style={{ width: '30px', height: '42px' }} alt='ballhawk' />
                            <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#5affe7' }}>Ball<br/>Hawk II</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={ballknowledge} style={{ width: '35px', height: '42px' }} alt='ballknowledge' />
                            <p style={{ fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#5affe7' }}>Ball<br/>Knowledge</p>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}
