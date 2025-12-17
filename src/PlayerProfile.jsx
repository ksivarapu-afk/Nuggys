import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPlayerByName } from './data/playersData'
import { usePlayerStats } from './hooks/usePlayerStats'
import { useSwipe } from './hooks/useSwipe'
import B_Robinson_Dark from './assets/Player_Banners/B_Robinson_Dark.png'
import { clipsData } from './data/clipsData'
import Clips from './components/Clips'
import back from './assets/Icons/Back Icon.png'
import NUGGYS from './assets/AI_Logos/NUGGYS.png'
import Award from './assets/Awards_Background.png'

export default function PlayerProfile() {
    const { playerName } = useParams()
    const navigate = useNavigate()
    const username = localStorage.getItem('username') || 'username'
    const defaultPlayer = getPlayerByName(decodeURIComponent(playerName || ''))
    
    // Fetch live stats from ESPN API (falls back to default if API fails)
    const { player, loading: statsLoading, error: statsError } = usePlayerStats(
        defaultPlayer?.id || null,
        defaultPlayer || {}
    )
    
    // Debug: Log player data
    useEffect(() => {
        console.log('PlayerProfile - Current player data:', {
            id: player?.id,
            name: player?.fullName,
            stats: player?.stats,
            loading: statsLoading,
            error: statsError
        })
    }, [player, statsLoading, statsError])
    
    // Get followed players from localStorage
    const getFollowedPlayers = () => {
        const stored = localStorage.getItem('followedPlayers')
        return stored ? JSON.parse(stored) : []
    }
    
    const [followed, setFollowed] = useState(() => {
        if (player?.id) {
            const followedPlayers = getFollowedPlayers()
            return followedPlayers.includes(player.id)
        }
        return false
    })
    
    // Update followed state when player changes
    useEffect(() => {
        if (player?.id) {
            const followedPlayers = getFollowedPlayers()
            setFollowed(followedPlayers.includes(player.id))
        }
    }, [player])
    
    const playerIcon = player?.profilePhoto || B_Robinson_Dark
    const displayName = player?.fullName || 'Bijan Robinson'
    const team = player?.team || 'ATL'
    const position = player?.position || 'RB'
    const number = player?.number || '7'
    const healthyStatus = player?.healthyStatus || 'Active'
    
    const handleFollowToggle = () => {
        if (!player?.id) return
        
        const followedPlayers = getFollowedPlayers()
        const newFollowed = !followed
        
        if (newFollowed) {
            // Add player to followed list
            if (!followedPlayers.includes(player.id)) {
                const updated = [...followedPlayers, player.id]
                localStorage.setItem('followedPlayers', JSON.stringify(updated))
            }
        } else {
            // Remove player from followed list
            const updated = followedPlayers.filter(id => id !== player.id)
            localStorage.setItem('followedPlayers', JSON.stringify(updated))
        }
        
        setFollowed(newFollowed)
        
        // Trigger a custom event to notify other components
        window.dispatchEvent(new CustomEvent('followedPlayersChanged'))
    }
    
    const handleBackClick = () => {
        navigate(-1) // Go back to previous page in browser history
    }
    
    // State for swipe to reveal stats/icon
    const [isShifted, setIsShifted] = useState(false)
    
    // Swipe handlers for horizontal swipe
    const swipeHandlers = useSwipe(
        () => setIsShifted(true), // Swipe left to reveal stats
        () => setIsShifted(false) // Swipe right to hide stats
    )
    
    return (
        <div className="App">
            <div 
                className='header-title' 
                style={{
                    borderRadius: '0 0 20px 20px',
                    background: 'linear-gradient(0deg, #1A1A1A 0%,rgb(0, 0, 0) 100%)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                    paddingTop: '15px',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    paddingBottom: '30px',
                    zIndex: 1,
                    position: 'relative',
                    flexWrap: 'nowrap',
                    WebkitOverflowScrolling: 'touch',
                    touchAction: 'pan-y pinch-zoom' // Allow vertical scroll but handle horizontal swipes
                }}
                {...swipeHandlers}
            >
                {/* Fixed header - doesn't move on swipe */}
                <div className='header' style={{paddingBottom: '0px', marginTop: '0px', marginLeft: '0px'}}>
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
                      <p>@ {username}</p>
                    </div>
                    <div style={{width: '25px', height: '25px'}}></div>
                </div>
                
                {/* Player info, icon, and stats - move on swipe */}
                <div style={{
                    transform: isShifted ? 'translateX(-150px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease-in-out',
                    width: '100%',
                    position: 'relative',
                    marginTop: '40px'
                }}>
                    <p className='player-title'>
                        {displayName.split(' ')[0]}<br/>
                        {displayName.split(' ').slice(1).join(' ')}
                    </p>
                    <p style={{fontSize: '14px', fontWeight: '400', lineHeight: '150%', letterSpacing: '0.07px', color: '#808080'}}>{team} &nbsp; {position} &nbsp; #{number}</p>
                    <p style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#28ffbf'}}>{healthyStatus}</p>
                    <button 
                        className='follow-button'
                        onClick={handleFollowToggle}
                        style={{ marginTop: '15px' }}
                    >
                        <p>{followed ? 'Unfollow' : 'Follow'}</p>
                    </button>
                    <img src={playerIcon} style={{ width: '264px', height: '192px', pointerEvents: 'none', position: 'absolute', bottom: '-30px', right: '-30px'}} alt={displayName} />
                    {player?.stats && (
                        <div style={{
                            position: 'absolute',
                            bottom: '0px',
                            right: '-145px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            alignItems: 'end'
                        }}>
                            {statsLoading && (
                                <p style={{color: '#AAAAAA', fontSize: '12px', marginBottom: '10px'}}>Loading live stats...</p>
                            )}
                            {statsError && (
                                <p style={{color: '#AAAAAA', fontSize: '12px', marginBottom: '10px'}}>
                                    Using cached/default stats (API unavailable)
                                </p>
                            )}
                            <div style={{display: 'flex', gap: '6px', justifyContent: 'end', alignItems: 'end'}}>
                                <p style={{fontSize: '24px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.12px', color: '#FFFFFF'}}>{player.stats.stat1.value}</p>
                                <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#808080'}}>{player.stats.stat1.unit}</p>
                            </div>
                            <div style={{display: 'flex', gap: '6px', justifyContent: 'end', alignItems: 'end'}}>
                                <p style={{fontSize: '24px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.12px', color: '#FFFFFF'}}>{player.stats.stat2.value}</p>
                                <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#808080'}}>{player.stats.stat2.unit}</p>
                            </div>
                            <div style={{display: 'flex', gap: '6px', justifyContent: 'end', alignItems: 'end'}}>
                                <p style={{fontSize: '24px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.12px', color: '#FFFFFF'}}>{player.stats.stat3.value}</p>
                                <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#808080'}}>{player.stats.stat3.unit}</p>
                            </div>
                            {player.stats.stat4 && (
                                <div style={{display: 'flex', gap: '6px', justifyContent: 'end', alignItems: 'end'}}>
                                    <p style={{fontSize: '24px', fontWeight: '600', lineHeight: '120%', letterSpacing: '-0.12px', color: '#FFFFFF'}}>{player.stats.stat4.value}</p>
                                    <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#808080'}}>{player.stats.stat4.unit}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {player?.awards && player.awards.length > 0 && (
                <div style={{
                    display: 'flex', 
                    gap: '9px', 
                    justifyContent: 'flex-start', 
                    alignItems: 'flex-start', 
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    flexWrap: 'nowrap',
                    WebkitOverflowScrolling: 'touch',
                    width: '100%',
                    maxWidth: '393px',
                    margin: '0 auto',
                    paddingRight: '30px',
                    boxSizing: 'border-box',
                    marginTop: '15px'
                }}>
                    {player.awards.map((award, index) => (
                        <div 
                            key={index}
                            style={{
                                display: 'flex',
                                height: '60px',
                                width: '278px',
                                padding: '5px 30px',
                                gap: '20px',
                                alignItems: 'center',
                                backgroundImage: `url(${Award})`,
                                borderRadius: '20px',
                                backgroundSize: 'cover',
                                flexShrink: 0
                            }}
                        >
                            <img src={NUGGYS} style={{ width: '24px', height: '24px', pointerEvents: 'none'}} alt='NUGGYS' />
                            <div style={{display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'start'}}>
                                <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>{award.title}</p>
                                <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#28ffbf'}}>{award.month}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div style={{marginBottom: '20px'}} className='highlight'>
              {clipsData && clipsData.length > 0 ? (
                clipsData
                  .filter((clip) => clip.playerID === player?.id)
                  .map((clip) => (
                    <Clips 
                      key={clip.id}
                      id={clip.id}
                      playerId={clip.playerID}
                      playerName={clip.playerName}
                      playDescription={clip.playDescription}
                      postmark={clip.postmark}
                      fpts={clip.fpts}
                    />
                  ))
              ) : (
                <p>No clips available</p>
              )}
            </div>
            <div className='agent-chat'>
                <input type="text" placeholder={`Ask for ${player?.fullName ? player.fullName.split(' ')[0] : 'player'}'s play`} className='agent-chat-input'/>
                <button type='button' className='ai-button'></button>
            </div>
        </div>
    )
}

