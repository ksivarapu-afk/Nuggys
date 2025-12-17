import { useSwipe } from '../hooks/useSwipe'
import { useNavigate } from 'react-router-dom'
import Feed from './Feed'
import Clips from './Clips'
import { clipsData } from '../data/clipsData'

export default function NFLPage() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username') || 'username'
  const swipeHandlers = useSwipe(
    () => navigate('/home'), // Swipe left to go back to home
    null // No right swipe action on NFL page
  )

  // Helper function to extract numeric value from fpts string (e.g., "+8.8 fpts" -> 8.8)
  const getFptsValue = (fptsString) => {
    const match = fptsString?.match(/[+-]?(\d+\.?\d*)/)
    return match ? parseFloat(match[1]) : 0
  }

  // Get top 10 best plays from the oldest plays
  // 1. Sort by postedAt ascending (oldest first)
  // 2. Take the oldest subset (oldest 50% or at least 20 plays, whichever is larger)
  // 3. Sort those by fpts descending (best first)
  // 4. Take top 10
  const sortedByDate = [...clipsData].sort((a, b) => (a.postedAt || 0) - (b.postedAt || 0))
  const oldestSubsetSize = Math.max(20, Math.floor(sortedByDate.length * 0.5))
  const oldestPlays = sortedByDate.slice(0, oldestSubsetSize)
  const top10BestPlays = oldestPlays
    .sort((a, b) => getFptsValue(b.fpts) - getFptsValue(a.fpts))
    .slice(0, 10)

  // Calculate paddingTop based on feed items (5 feed items + 3 text items = 8 total)
  const feedItemsCount = 5
  const textItemsCount = 3
  const totalFeedItems = feedItemsCount + textItemsCount
  const headerPaddingTop = totalFeedItems === 0
    ? 160
    : totalFeedItems === 1
    ? 160
    : totalFeedItems <= 2 
    ? 160 
    : 180 + ((totalFeedItems - 2) * 30)

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
              <p className='title'>NFL</p>
              <p className='title spacer'>NFL</p>
          </div>
          <div className='feed' style={{ pointerEvents: 'auto' }}>
              <Feed player="DET &nbsp; 9" oponent="PHI &nbsp; 13" info1="Halftime PHI rec" info2="" />
              <Feed player="BAL &nbsp; 16" oponent="CLE &nbsp; 12" info1="1st & 10 &nbsp; BAL 25" info2="12:47 &nbsp; Q3" />
              <Feed player="KC &nbsp; 12" oponent="DEN &nbsp; 12" info1="2nd & 7 &nbsp; KC 38" info2="8:24 &nbsp; Q3" />
              <Feed player="CAR &nbsp; 24" oponent="ATL &nbsp; 21" info1="2nd & 3 &nbsp; ATL 43" info2="6:53 &nbsp; Q4" />
              <Feed player="BUF &nbsp; 27" oponent="LAC &nbsp; 21" info1="3rd & Goal &nbsp; BUF 5" info2="1:57 &nbsp; Q4" />
          </div>
          <div className='feed' style={{ pointerEvents: 'auto' }}>
              <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}><b style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>D. Gabriel</b> injured <b style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>S. Sanders</b> playing currently</p>
              <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}><b style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>J. Davis</b> 5 batted pass attempts from <b style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>J. Goff</b></p>
              <p style={{fontSize: '12px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}><b style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>D. Stingley Jr.</b> picks off <b style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>C. Ward</b></p>
          </div>
        </div>
        <div className='username' style={{ cursor: 'pointer' }} onClick={() => navigate('/user-profile')}>
          <p>@ {username}</p>
        </div>
        <div style={{marginBottom: '90px'}} className='highlight'>
          <div 
            style={{
              display: 'flex',
              width: '98%',
              height: '85px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              borderRadius: '20px',
              textAlign: 'center,border-radius: 20px',
              border: '0.5px solid #808080',
              background: 'rgba(128, 128, 128, 0.30)',
              boxShadow: '0 0 12px 2px rgba(128, 128, 128, 0.30) inset',
              backdropFilter: 'blur(6.25px)',

            }}>
              <p style={{fontSize: '18px', fontWeight: 500, color: '#AAAAAA', margin: 0}}>Best Plays of Week 10</p>
          </div>
          <div className='highlight'>
              {top10BestPlays && top10BestPlays.length > 0 ? (
                top10BestPlays.map((clip) => (
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
        </div>
        <div className='agent-chat'>
          <input type="text" placeholder="Want to see a highlight?" className='agent-chat-input'/>
          <button type='button' className='ai-button'></button>
        </div>
      </header>
    </div>
  )
}

