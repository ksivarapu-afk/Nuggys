export default function Feed({ player, score, oponent, info1, info2, displayType }) {
    // Format the player/team display
    // If displayType is 'team', show "team vs opponent"
    // If displayType is 'player', show just the player name (no vs opponent)
    const displayText = displayType === 'team' && score
        ? `${player} vs ${oponent}`
        : player
    
    return (
        <div style={{display: 'flex', width: '333px', justifyContent: 'space-between'}}>
            <p style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF'}}>{displayText}</p>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '185px', color: '#444444'}}>
              <p>{info1}</p>
              <p style={{fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#5affe7'}}>{info2}</p>
            </div>
        </div>
    )
}