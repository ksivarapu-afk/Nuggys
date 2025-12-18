import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import Clips from './components/Clips'
import replay from './assets/EndzoneReplay.png'
import { clipsData } from './data/clipsData'
import AIChatbot from './assets/AI_Logos/AIChatbot.png'
import back from './assets/Icons/Back Icon.png'


export default function Highlight() {
    const { clipId } = useParams()
    const navigate = useNavigate()
    const username = localStorage.getItem('username') || 'username'
    const clip = clipsData.find(c => c.id === clipId)
    const [searchQuery, setSearchQuery] = useState('')
    const [celebrationClip, setCelebrationClip] = useState(() => {
        const storedCelebrationClipId = localStorage.getItem('highlightCelebrationClipId')
        return storedCelebrationClipId ? { id: 'celebration-clip', video: '/videos/clip105.mp4', title: 'Jamar Chase touchdown celebration' } : null
    })
    const [isAnimating, setIsAnimating] = useState(false)
    const inputRef = useRef(null)

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // Persist celebrationClip to localStorage
    useEffect(() => {
        if (celebrationClip) {
            localStorage.setItem('highlightCelebrationClipId', celebrationClip.id)
        } else {
            localStorage.removeItem('highlightCelebrationClipId')
        }
    }, [celebrationClip])

    // Helper function to detect celebration-related queries
    const isCelebrationQuery = (query) => {
        const lowerQuery = query.toLowerCase()
        const celebrationKeywords = ['celebration', 'celebrate', 'show me the celebration', 'show celebration', 'celebration video']
        return celebrationKeywords.some(keyword => lowerQuery.includes(keyword))
    }

    // Handle search query input
    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value)
    }

    // Handle search submission
    const handleSearchSubmit = () => {
        const query = searchQuery.trim()
        
        // Blur the input field and scroll to top
        if (inputRef.current) {
            inputRef.current.blur()
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
        
        if (query && isCelebrationQuery(query)) {
            // Create celebration clip
            const celebrationVideo = {
                id: 'celebration-clip',
                video: '/videos/clip105.mp4',
                title: 'Jamar Chase touchdown celebration'
            }
            setCelebrationClip(celebrationVideo)
            setIsAnimating(true)
            
            // Reset animation state after animation completes
            setTimeout(() => {
                setIsAnimating(false)
            }, 3000)
        } else {
            setCelebrationClip(null)
            setIsAnimating(false)
        }
        
        // Clear the input field after submission
        setSearchQuery('')
    }

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit()
        }
    }

    const handleBackClick = () => {
        navigate(-1) // Go back to previous page in browser history
    }
    
    // If clip not found, show error or redirect
    if (!clip) {
        return (
            <div className="App">
                <header className="App-header">
                    <div className='header' style={{paddingBottom: '30px'}}>
                        <div 
                            onClick={handleBackClick}
                            style={{ 
                                width: '25px', 
                                height: '25px', 
                                backgroundColor: '#aaaaaa',
                                cursor: 'pointer'
                            }}
                        ></div>
                        <div className='username' style={{ cursor: 'pointer' }} onClick={() => navigate('/user-profile')}>
                          <p>@{username}</p>
                        </div>
                        <div style={{width: '25px', height: '25px', backgroundColor: '#aaaaaa'}}></div>
                    </div>
                    <p>Clip not found</p>
                </header>
            </div>
        )
    }

    return (
        <div className="App">
            <div className='header'>
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
                <div className='username' style={{ cursor: 'pointer' }} onClick={() => navigate('/user-profile')}>
                  <p>@{username}</p>
                </div>
                <div style={{width: '25px', height: '25px', backgroundColor: '#aaaaaa'}}></div>
            </div>
            <div style={{marginBottom: '90px'}} className='highlight'>
                <div className='highlight'>
                    <div className='clip' style={{ position: 'relative', overflow: 'hidden' }}>
                        {clip.video && (
                            <video
                                src={clip.video}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '20px'
                                }}
                                playsInline
                                autoPlay
                                loop
                            />
                        )}
                    </div>
                    <Clips 
                        id={clip.id}
                        playerId={clip.playerID}
                        playerName={clip.playerName}
                        playDescription={clip.playDescription}
                        postmark={clip.postmark}
                        fpts={clip.fpts}
                        showVideo={false}
                    />
                    <div style={{display: 'flex', flexDirection: 'column', gap: '30px', width: '333px', textAlign: 'left'}}>
                        <p>{clip.title}</p>
                        <p style={{whiteSpace: 'pre-line'}}>{clip.description}</p>
                        <div className='highlight-stat'>
                            <div className='highlight-stat'>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                                    <p style={{fontSize: '33px', fontWeight: 'bold', height: '30px'}}>{clip.stats.stat1.value}</p>  
                                     <p>{clip.stats.stat1.unit}</p>
                                </div>
                                <p>{clip.stats.stat1.label}</p>
                            </div>
                            <div className='highlight-stat'>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                                    <p style={{fontSize: '33px', fontWeight: 'bold', height: '30px'}}>{clip.stats.stat2.value}</p>
                                    <p>{clip.stats.stat2.unit}</p>
                                </div>
                                <p>{clip.stats.stat2.label}</p>
                            </div>
                            <div className='highlight-stat'>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>   
                                    <p style={{fontSize: '33px', fontWeight: 'bold', height: '30px'}}>{clip.stats.stat3.value}</p>
                                    <p>{clip.stats.stat3.unit}</p>
                                </div>
                                <p>{clip.stats.stat3.label}</p>
                            </div>
                        </div>
                        <img src={replay} alt="replay" />
                    </div>
                </div>
            </div>
            <div className='agent-chat'>
                <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Need more?" 
                    className='agent-chat-input'
                    value={searchQuery}
                    onChange={handleSearchInput}
                    onKeyDown={handleKeyDown}
                />
                <button type='button' className='ai-button' onClick={handleSearchSubmit}></button>
            </div>
            {celebrationClip && (
                <div 
                    className={isAnimating ? 'clip-appear' : ''}
                    style={{ marginBottom: '20px', marginTop: '20px' }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <p style={{ 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            lineHeight: '150%', 
                            letterSpacing: '0.08px', 
                            color: '#FFFFFF',
                            textAlign: 'left',
                            margin: 0
                        }}>
                            {celebrationClip.title}
                        </p>
                        <div className='clip' style={{ position: 'relative', overflow: 'hidden' }}>
                            {celebrationClip.video && (
                                <video
                                    src={celebrationClip.video}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '20px'
                                    }}
                                    playsInline
                                    autoPlay
                                    muted
                                    loop
                                />
                            )}
                            <img 
                                src={AIChatbot}
                                alt="AI"
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    width: '18px',
                                    height: '18px',
                                    zIndex: 20,
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}