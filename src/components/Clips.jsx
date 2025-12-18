import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { getPlayerById } from '../data/playersData'
import { clipsData } from '../data/clipsData'
import AIChatbot from '../assets/AI_Logos/AIChatbot.png'

// Detect mobile device
const isMobile = () => {
    if (typeof window === 'undefined') return false
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768 && 'ontouchstart' in window)
}

export default function Clips({ id, playerId, playerName, playDescription, postmark, fpts, showVideo = true, isAIProvided = false }) {
    const navigate = useNavigate()
    const player = playerId ? getPlayerById(playerId) : null
    const profileLink = player ? `/profile/${encodeURIComponent(player.fullName)}` : '#'
    const highlightLink = `/highlight/${id}`
    const clip = clipsData.find(c => c.id === id)
    const videoSrc = clip?.video || ''
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isInViewport, setIsInViewport] = useState(false)
    const [isMobileDevice, setIsMobileDevice] = useState(false)
    const videoRef = useRef(null)
    const containerRef = useRef(null)
    
    // Detect mobile on mount
    useEffect(() => {
        setIsMobileDevice(isMobile())
    }, [])
    
    // Intersection Observer for lazy loading and viewport detection
    useEffect(() => {
        if (!showVideo || !videoSrc || !containerRef.current) return
        
        // Mobile: more aggressive lazy loading (load only when very close)
        // Desktop: load earlier for smoother experience
        const rootMargin = isMobileDevice ? '50px' : '200px'
        // Mobile: pause when less than 50% visible to prevent overlap
        // Desktop: lower threshold for smoother experience
        const threshold = isMobileDevice ? 0.5 : 0.1
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Check intersection ratio to determine if video should play
                    const isFullyInView = entry.intersectionRatio >= threshold
                    
                    if (isFullyInView) {
                        setShouldLoadVideo(true)
                        setIsInViewport(true)
                    } else {
                        setIsInViewport(false)
                        // On mobile, pause videos that are not fully in view to prevent overlap
                        if (isMobileDevice && videoRef.current && !isFullyInView) {
                            if (!videoRef.current.paused) {
                                videoRef.current.pause()
                            }
                        }
                    }
                })
            },
            {
                rootMargin,
                threshold
            }
        )
        
        observer.observe(containerRef.current)
        
        // Check if already in viewport on mount (for both desktop and mobile)
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const margin = parseInt(rootMargin.replace('px', ''))
            const isVisible = rect.top < window.innerHeight + margin && rect.bottom > -margin
            if (isVisible) {
                setShouldLoadVideo(true)
                setIsInViewport(true)
            }
        }
        
        return () => {
            observer.disconnect()
        }
    }, [showVideo, videoSrc, isMobileDevice])
    
    // Play video when in viewport or on hover, pause otherwise, and manage mute state
    useEffect(() => {
        if (!videoRef.current || !shouldLoadVideo) return
        
        const video = videoRef.current
        
        if (isInViewport || isHovered) {
            // Unmute when in viewport
            if (video.muted) {
                video.muted = false
            }
            
            // Only play if video is ready and not already playing
            if (video.readyState >= 2 && video.paused) { // HAVE_CURRENT_DATA or higher and currently paused
                video.play().catch(() => {}) // Ignore autoplay errors
            } else if (video.readyState < 2) {
                // Wait for video to be ready before playing
                const handleCanPlay = () => {
                    if (video.paused) {
                        video.play().catch(() => {})
                    }
                    video.removeEventListener('canplay', handleCanPlay)
                }
                video.addEventListener('canplay', handleCanPlay)
                return () => video.removeEventListener('canplay', handleCanPlay)
            }
        } else {
            // Mute when not in viewport
            if (!video.muted) {
                video.muted = true
            }
            
            // Only pause if playing
            if (!video.paused) {
                video.pause()
            }
        }
    }, [isHovered, isInViewport, shouldLoadVideo])
    
    // Cleanup on unmount only
    useEffect(() => {
        return () => {
            if (videoRef.current) {
                // Pause and reset video on unmount to free resources
                videoRef.current.pause()
                videoRef.current.src = ''
            }
        }
    }, [])
    
    const handlePlayerNameClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(profileLink)
    }
    
    return (
        <Link 
            to={highlightLink}
            style={{ 
                textDecoration: 'none', 
                color: 'inherit',
                display: 'block'
            }}
        >
            <div 
                className='highlight' 
                style={{ position: 'relative' }}
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {showVideo && (
                    <div className='clip' style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#1A1A1A', minHeight: '500px' }}>
                        {videoSrc && shouldLoadVideo ? (
                            <video
                                key={videoSrc}
                                ref={videoRef}
                                src={videoSrc}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '20px'
                                }}
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload={isMobileDevice ? "metadata" : "auto"}
                                onLoadedData={() => {
                                    // Video is loaded and ready, try to play if in viewport
                                    if (videoRef.current && (isInViewport || isHovered)) {
                                        videoRef.current.play().catch(() => {})
                                    }
                                }}
                                onError={(e) => {
                                    console.error('Video load error:', e, 'Video src:', videoSrc)
                                    // Prevent infinite error loops
                                    e.target.style.display = 'none'
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#1A1A1A',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#808080',
                                fontSize: '14px'
                            }}>
                                Loading...
                            </div>
                        )}
                        {isAIProvided && (
                            <img 
                                src={AIChatbot}
                                alt="AI Provided"
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    width: '18px',
                                    height: '18px',
                                    zIndex: 20,
                                    pointerEvents: 'none',
                                    objectFit: 'contain'
                                }}
                            />
                        )}
                    </div>
                )}
                <div style={{display: 'flex', width: '333px', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', gap: '12px'}}>
                        <span
                            onClick={handlePlayerNameClick}
                            style={{ 
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                position: 'relative',
                                zIndex: 10,
                                display: 'inline-block'
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: '600', color: '#FFFFFF'}}>{playerName}</p>
                        </span>
                        <p style={{color: '#FFFFFF'}}>{playDescription}</p>
                        <p style={{color: '#FFFFFF'}}>{postmark}</p>
                    </div>
                    <p><b>{fpts}</b></p>
                </div>
            </div>
        </Link>
    )
}