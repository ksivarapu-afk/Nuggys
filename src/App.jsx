import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './App.css'
import Feed from './components/Feed'
import Clips from './components/Clips'
import Highlight from './Highlight'
import NFLPage from './components/NFLPage'
import Explore from './Explore'
import PlayerProfile from './PlayerProfile'
import UserProfile from './UserProfile'
import Leaderboard from './Leaderboard'
import Onboarding from './Onboarding'
import Personalization from './Personalization'
import Entrance from './Entrance'
import EnterEmail from './EnterEmail'
import VerifyEmail from './VerifyEmail'
import AccountCreation from './AccountCreation'
import { clipsData } from './data/clipsData'
import { feedData } from './data/feedData'
import { playersData } from './data/playersData'
import { useSwipe } from './hooks/useSwipe'


function Home() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'username'
  
  // Get followed players from localStorage
  const getFollowedPlayers = () => {
    const stored = localStorage.getItem('followedPlayers')
    return stored ? JSON.parse(stored) : []
  }
  
  // Get followed teams from localStorage
  const getFollowedTeams = () => {
    const stored = localStorage.getItem('followedTeams')
    return stored ? JSON.parse(stored) : []
  }
  
  const [followedPlayers, setFollowedPlayers] = useState(getFollowedPlayers())
  const [followedTeams, setFollowedTeams] = useState(getFollowedTeams())
  const [searchQuery, setSearchQuery] = useState('')
  
  // Helper function to get highlighted clip from localStorage
  const getHighlightedClip = () => {
    const stored = localStorage.getItem('highlightedClipId')
    if (stored) {
      const clip = clipsData.find(c => c.id === stored)
      return clip || null
    }
    return null
  }
  
  const [highlightedClip, setHighlightedClip] = useState(() => getHighlightedClip())
  const [isAnimating, setIsAnimating] = useState(false)
  const inputRef = useRef(null)
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  // Save highlighted clip to localStorage whenever it changes
  useEffect(() => {
    if (highlightedClip) {
      localStorage.setItem('highlightedClipId', highlightedClip.id)
    } else {
      localStorage.removeItem('highlightedClipId')
    }
  }, [highlightedClip])
  
  // Listen for changes to followed players and teams
  useEffect(() => {
    const handleFollowChange = () => {
      setFollowedPlayers(getFollowedPlayers())
      setFollowedTeams(getFollowedTeams())
    }
    
    window.addEventListener('followedPlayersChanged', handleFollowChange)
    window.addEventListener('followedTeamsChanged', handleFollowChange)
    return () => {
      window.removeEventListener('followedPlayersChanged', handleFollowChange)
      window.removeEventListener('followedTeamsChanged', handleFollowChange)
    }
  }, [])
  
  // Filter feed based on followed players/teams
  // Show feed only when there are followed players/teams
  const filteredFeed = (followedPlayers.length > 0 || followedTeams.length > 0)
    ? feedData.flatMap(feedItem => {
        const isTeamFollowed = feedItem.teamID && followedTeams.includes(feedItem.teamID)
        const followedPlayersOnTeam = feedItem.players 
          ? feedItem.players.filter(p => followedPlayers.includes(p.playerID))
          : []
        
        const results = []
        
        // If team is followed, add team feed item
        if (isTeamFollowed) {
          results.push({
            ...feedItem,
            displayType: 'team',
            displayText: `${feedItem.teamID} vs ${feedItem.oponent}`,
            info2: feedItem.info2
          })
        }
        
        // Add individual feed items for each followed player
        followedPlayersOnTeam.forEach(player => {
          const playerData = playersData.find(p => p.id === player.playerID)
          if (playerData) {
            results.push({
              ...feedItem,
              id: `${feedItem.id}-${player.playerID}`,
              displayType: 'player',
              displayText: playerData.displayName,
              info2: player.info2
            })
          }
        })
        
        return results
      })
    : []
  
  // Helper function to detect touchdown-related queries
  const isTouchdownQuery = (query) => {
    const lowerQuery = query.toLowerCase()
    const touchdownKeywords = ['touchdown', 'td', 'most recent touchdown', 'latest touchdown', 'show me touchdown', 'recent touchdown']
    return touchdownKeywords.some(keyword => lowerQuery.includes(keyword))
  }

  // Handle search query input (just updates state, doesn't trigger search)
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle search submission (triggers the actual search)
  const handleSearchSubmit = () => {
    const query = searchQuery.trim()
    
    // Blur the input field and scroll to top
    if (inputRef.current) {
      inputRef.current.blur()
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    if (query && isTouchdownQuery(query)) {
      // Find the most recent touchdown clip
      const touchdownClips = clipsData.filter(clip => 
        clip.playDescription?.toLowerCase().includes('td') || 
        clip.title?.toLowerCase().includes('touchdown') ||
        clip.description?.toLowerCase().includes('touchdown')
      )
      
      if (touchdownClips.length > 0) {
        // Sort by postedAt descending and get the most recent
        const mostRecentTD = [...touchdownClips].sort((a, b) => (b.postedAt || 0) - (a.postedAt || 0))[0]
        setHighlightedClip(mostRecentTD)
        setIsAnimating(true)
        
        // Reset animation state after animation completes
        setTimeout(() => {
          setIsAnimating(false)
        }, 3000) // Increased to account for longer animation
      }
    } else {
      setHighlightedClip(null)
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

  // Filter clips: show all when no one is followed, show only followed players' highlights when followed
  // Sort by postedAt (most recent first) - clipsData is already sorted, but ensure filtered results maintain sort
  let baseFilteredClips = followedPlayers.length > 0 
    ? clipsData.filter(clip => followedPlayers.includes(clip.playerID)).sort((a, b) => (b.postedAt || 0) - (a.postedAt || 0))
    : clipsData // Show all highlights when no one is followed (already sorted by postedAt)
  
  // If there's a highlighted clip, add it to the top (if not already there)
  const filteredClips = highlightedClip 
    ? [highlightedClip, ...baseFilteredClips.filter(clip => clip.id !== highlightedClip.id)]
    : baseFilteredClips
  
  const swipeHandlers = useSwipe(
    () => navigate('/explore'), // Swipe left to go to Explore
    () => navigate('/nfl') // Swipe right to go to NFL
  )

  // Calculate paddingTop: 80px when feed is empty, 190px for first 2 items, then +30px per additional item
  const headerPaddingTop = filteredFeed.length === 0
    ? 140
    : filteredFeed.length === 1
    ? 140
    : filteredFeed.length <= 2 
    ? 160 
    : 160 + ((filteredFeed.length - 2) * 30)

  return (
    <div 
      className="App"
      {...swipeHandlers}
      style={{ touchAction: 'pan-y' }}
    >
      <header className="App-header" style={{ paddingTop: `${headerPaddingTop}px` }}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '393px',
          zIndex: -1,
          pointerEvents: 'none'
        }}>
          <div className='header' style={{ pointerEvents: 'auto' }}>
              <p className='title'>My Feed</p>
              <p className='title spacer'>My Feed</p>
          </div>
          {filteredFeed.length > 0 ? (
            <div className='feed' style={{ pointerEvents: 'auto' }}>
              {filteredFeed.map((feedItem) => (
                <Feed 
                  key={feedItem.id}
                  player={feedItem.displayText || feedItem.teamID}
                  score={feedItem.score}
                  oponent={feedItem.oponent}
                  info1={feedItem.info1}
                  info2={feedItem.info2}
                  displayType={feedItem.displayType}
                />
              ))}
            </div>
          ) : (
            <div className='feed' style={{ pointerEvents: 'auto' }}>
              <p style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#808080', margin: 0}}>Follow players / teams to get live updates</p>
            </div>
          )}
        </div>
        <div className='username' style={{ cursor: 'pointer' }} onClick={() => navigate('/user-profile')}>
          <p>@ {username}</p>
        </div>
        <div style={{marginBottom: '20px'}} className='highlight'>
            {filteredClips && filteredClips.length > 0 ? (
              filteredClips.map((clip, index) => (
                <div 
                  key={clip.id}
                  className={highlightedClip && clip.id === highlightedClip.id && isAnimating ? 'clip-appear' : ''}
                >
                  <Clips 
                    id={clip.id}
                    playerId={clip.playerID}
                    playerName={clip.playerName}
                    playDescription={clip.playDescription}
                    postmark={clip.postmark}
                    fpts={clip.fpts}
                    isAIProvided={highlightedClip && clip.id === highlightedClip.id}
                  />
                </div>
              ))
            ) : (
              <p>No clips available</p>
            )}
        </div>
        <div className='agent-chat'>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Need a highlight?" 
            className='agent-chat-input'
            value={searchQuery}
            onChange={handleSearchInput}
            onKeyDown={handleKeyDown}
          />
          <button type='button' className='ai-button' onClick={handleSearchSubmit}></button>
        </div>
      </header>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/entrance" replace />} />
      <Route path="/entrance" element={<Entrance />} />
      <Route path="/enter-email" element={<EnterEmail />} />
      <Route path="/account-creation" element={<EnterEmail />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/create-account" element={<AccountCreation />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/personalization" element={<Personalization />} />
      <Route path="/home" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/nfl" element={<NFLPage />} />
      <Route path="/profile/:playerName" element={<PlayerProfile />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/highlight" element={<Navigate to={`/highlight/${clipsData[0]?.id || '1'}`} replace />} />
      <Route path="/highlight/:clipId" element={<Highlight />} />
    </Routes>
  )
}

export default App

