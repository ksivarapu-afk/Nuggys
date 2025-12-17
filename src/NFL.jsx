import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Feed from './components/Feed'
import Clips from './components/Clips'
import Highlight from './Highlight'
import { clipsData } from './data/clipsData'

function Home() {
  const username = localStorage.getItem('username') || 'username'
  console.log('Home component rendering')
  console.log('ClipsData:', clipsData)
  
    return (
      <div className="App">
        <header className="App-header">
        <div className='header'>
            <p className='title'>NFL</p>
            <div className='username'><p>@ {username}</p></div>
            <p className='title spacer'>NFL</p>
        </div>
          <div className='feed' style={{marginBottom: '0px'}}>
              <Feed player="DET &nbsp; 9" oponent="PHI &nbsp; 13" info1="Halftime PHI rec" info2="" />
              <Feed player="BAL &nbsp; 16" oponent="CLE &nbsp; 12" info1="1st & 10 &nbsp; BAL 25" info2="12:47 &nbsp; Q3" />
              <Feed player="KC &nbsp; 12" oponent="DEN &nbsp; 12" info1="2nd & 7 &nbsp; KC 38" info2="8:24 &nbsp; Q3" />
              <Feed player="CAR &nbsp; 24" oponent="ATL &nbsp; 21" info1="2nd & 3 &nbsp; ATL 43" info2="6:53 &nbsp; Q4" />
              <Feed player="BUF &nbsp; 27" oponent="LAC &nbsp; 21" info1="3rd & Goal &nbsp; BUF 5" info2="1:57 &nbsp; Q4" />
          </div>
          <div  className='feed'>
              <p><b>D. Gabriel</b> injured <b>S. Sanders</b> playing currently</p>
              <p><b>J. Davis</b> 5 batted pass attempts from <b>J. Goff</b></p>
              <p><b>D. Stingley Jr.</b> picks off <b>C. Ward</b></p>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '393px',  height: '85px', backgroundColor: '#444444', borderRadius: '20px', padding: '0px', textAlign: 'center', marginBottom: '15px'}}>
              <p style={{fontSize: '18px', fontWeight: 'medium', color: 'white'}}>Best Plays of Week 10</p>
          </div>
          <div style={{marginBottom: '20px'}} className='highlight'>
              {clipsData && clipsData.length > 0 ? (
                clipsData.map((clip) => (
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
            <input type="text" placeholder="Want to see a highlight?" className='agent-chat-input'/>
            <button type='button' className='ai-button'></button>
          </div>
        </header>
      </div>
    )
}

function App() {
  console.log('App component rendering')
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/highlight" element={<Navigate to={`/highlight/${clipsData[0]?.id || '1'}`} replace />} />
      <Route path="/highlight/:clipId" element={<Highlight />} />
    </Routes>
  )
}

export default App

