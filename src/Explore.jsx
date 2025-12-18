import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSwipe } from './hooks/useSwipe'
import { useNavigate } from 'react-router-dom'
import { playersData } from './data/playersData'
import search from './assets/Icons/Search Icon.png'

// Import team images
import BUF from './assets/Team_IDs/BUF_Bills.png'
import CIN from './assets/Team_IDs/CIN_Bengals.png'
import PHI from './assets/Team_IDs/PHI_Eagles.png'
import SF from './assets/Team_IDs/SF_49ers.png'

export default function Explore() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'username'
  const [filter, setFilter] = useState('player') // Default to 'player', 'team' is the only switchable option

  // Get followed players and teams from localStorage
  const getFollowedPlayers = () => {
    const stored = localStorage.getItem('followedPlayers')
    return stored ? JSON.parse(stored) : []
  }
  
  const getFollowedTeams = () => {
    const stored = localStorage.getItem('followedTeams')
    return stored ? JSON.parse(stored) : []
  }
  
  const [followedPlayers, setFollowedPlayers] = useState(getFollowedPlayers())
  const [followedTeams, setFollowedTeams] = useState(getFollowedTeams())

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

  const swipeHandlers = useSwipe(
    () => navigate('/home'), // Swipe left to go back to home
    () => navigate('/home') // Swipe right to go back to home
  )

  // Define all items with their type - players from database, teams manually
  const playerItems = playersData.map(player => ({
    type: 'player',
    id: player.id, // Add player ID for filtering
    name: player.fullName,
    displayName: player.displayName,
    team: player.team,
    number: player.number,
    image: player.profilePhoto,
    alt: player.displayName
  }))

  const teamItems = [
    { type: 'team', name: 'BUF Bills', teamID: 'BUF', division: 'AFC East', conference: 'AFC', image: BUF, alt: 'BUF Bills' },
    { type: 'team', name: 'CIN Bengals', teamID: 'CIN', division: 'AFC North', conference: 'AFC', image: CIN, alt: 'CIN Bengals' },
    { type: 'team', name: 'PHI Eagles', teamID: 'PHI', division: 'NFC East', conference: 'NFC', image: PHI, alt: 'PHI Eagles' },
    { type: 'team', name: 'SF 49ers', teamID: 'SF', division: 'NFC West', conference: 'NFC', image: SF, alt: 'SF 49ers' },
  ]

  const items = [...playerItems, ...teamItems]

  // Filter items based on active filter
  let filteredItems
  if (filter === 'highlight') {
    // Show only followed players and teams
    filteredItems = items.filter(item => {
      if (item.type === 'player') {
        return followedPlayers.includes(item.id)
      } else if (item.type === 'team') {
        return followedTeams.includes(item.teamID)
      }
      return false
    })
  } else {
    // Show all items of the selected type
    filteredItems = items.filter(item => item.type === filter)
  }

  // Function to convert full name to "Initial. LastName" format
  const formatDisplayName = (fullName) => {
    if (fullName.includes(' ')) {
      const parts = fullName.split(' ')
      const firstName = parts[0]
      const lastName = parts.slice(1).join(' ') // Handle names with multiple last name parts
      return `${firstName[0]}. ${lastName}`
    }
    return fullName
  }

  return (
    <div 
      className="App"
      {...swipeHandlers}
      style={{ touchAction: 'pan-y' }}
    >
      <header className="App-header" style={{ display: 'flex', alignItems: 'center'}}>
        <div className='header'>
            <p className='title'>Explore</p>
            <div className='username' style={{ cursor: 'pointer' }} onClick={() => navigate('/user-profile')}>
              <p>@ {username}</p>
            </div>
            <p className='title spacer'>Explore</p>
        </div>
        <div className='search-bar'>
          <img src={search} alt="search" className='search-icon'/>
          <input type="text" placeholder="Search a player or team" className='search-input'/>
        </div>
            <div style={{display: 'flex', gap: '42px', width: '333px', alignSelf: 'center', justifyContent: 'center', padding: '21px 0px' }}>
              <button 
                className={`filter ${filter === 'player' ? 'filter-active' : ''}`}
                onClick={() => setFilter('player')}
              >
                <p>Player</p>
              </button>
              <button 
                className={`filter ${filter === 'team' ? 'filter-active' : ''}`}
                onClick={() => setFilter('team')}
              >
                <p>Team</p>
              </button>
              <button 
                className={`filter ${filter === 'highlight' ? 'filter-active' : ''}`}
                onClick={() => setFilter('highlight')}
              >
                <p>Following</p>
              </button>
            </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '20px', alignSelf: 'center'}}>  
          {filteredItems.map((item, index) => (
            <Link 
              key={index}
              to={item.type === 'player' ? `/profile/${encodeURIComponent(item.name)}` : '#'}
              style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <div 
                className='player-result'
                data-type={item.type}
                style={{ cursor: item.type === 'player' ? 'pointer' : 'default' }}
              >
                <img src={item.image} alt={item.alt} className={item.type === 'player' ? 'player-icon' : 'team-icon'}/>
                <p style={{fontSize: '16px', fontWeight: '400', lineHeight: '130%', letterSpacing: '0.096px', color: '#FFFFFF', width: '100%'}}>{item.type === 'player' ? (item.displayName || formatDisplayName(item.name)) : item.name}</p>
                <div style={{display: 'flex', width: '15%', justifyContent: 'flex-end', alignItems: 'end'}}>
                {item.type === 'player' ? (
                  <>
                    <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3', width: '30px', textAlign: 'left'}}>{item.team}</p>
                    <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3', width: '20px', textAlign: 'right'}}>{item.number}</p>
                  </>
                ) : (
                  <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3', whiteSpace: 'nowrap'}}>{item.division}</p>
                )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </header>
    </div>
  )
}