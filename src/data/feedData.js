// Feed data structure
// Organized by teams, with multiple players under each team
// If team is followed, show team info
// If player is followed, show player name

import { playersData } from './playersData'

// Helper function to get player display name (First Initial. Last Name) by ID
const getPlayerDisplayName = (playerID) => {
  if (!playerID) return null
  const player = playersData.find(p => p.id === playerID)
  return player ? player.displayName : null
}

export const feedData = [
  {
    id: 'feed1',
    teamID: 'DAL',
    oponent: 'DET',
    score: '30-44',
    info1: 'Fulltime',
    info2: '',
    players: [
      { playerID: 'ceedee-lamb', info2: '4 NUGGS' },
      { playerID: 'jake-ferguson', info2: '' }
    ]
  },
  {
    id: 'feed2',
    teamID: 'DET',
    oponent: 'DAL',
    score: '44-30',
    info1: 'Fulltime',
    info2: '',
    players: [
      { playerID: 'jahmyr-gibbs', info2: '' }
    ]
  },
  {
    id: 'feed3',
    teamID: 'BUF',
    oponent: 'MIA',
    score: '24-17',
    info1: 'Q2 7:23',
    info2: '5 new',
    players: [
      { playerID: 'josh-allen', info2: '5 new' }
    ]
  },
  {
    id: 'feed4',
    teamID: 'CIN',
    oponent: 'BAL',
    score: '27-21',
    info1: 'Q4 2:30',
    info2: '4 new',
    players: [
      { playerID: 'jamarr-chase', info2: '4 new' }
    ]
  },
  {
    id: 'feed5',
    teamID: 'SF',
    oponent: 'SEA',
    score: '28-14',
    info1: 'Q2 1:15',
    info2: '2 new',
    players: [
      { playerID: 'george-kittle', info2: '2 new' }
    ]
  },
  {
    id: 'feed6',
    teamID: 'LAR',
    oponent: 'ARI',
    score: '31-24',
    info1: 'Q1 12:45',
    info2: '6 new',
    players: [
      { playerID: 'puka-nacua', info2: '6 new' }
    ]
  },
  {
    id: 'feed7',
    teamID: 'SEA',
    oponent: 'SF',
    score: '',
    info1: 'Q3 5:20',
    info2: '1 new',
    players: [
      { playerID: 'jaxon-smith-njigba', info2: '1 new' }
    ]
  },
  {
    id: 'feed8',
    teamID: 'PHI',
    oponent: 'DET',
    score: '21-10',
    info1: 'Q4 5:42',
    info2: '3 new',
    players: [
      { playerID: 'saquan-barkley', info2: '6 new' }
    ]
  },
  {
    id: 'feed9',
    teamID: 'ATL',
    oponent: 'NO',
    score: '',
    info1: 'Q2 4:30',
    info2: '7 new',
    players: [
      { playerID: 'bijan-robinson', info2: '7 new' }
    ]
  },
  {
    id: 'feed10',
    teamID: 'IND',
    oponent: 'HOU',
    score: '',
    info1: 'Q3 11:20',
    info2: '4 new',
    players: [
      { playerID: 'jonathon-taylor', info2: '4 new' }
    ]
  },
  {
    id: 'feed11',
    teamID: 'DEN',
    oponent: 'LV',
    score: '',
    info1: 'Q1 8:30',
    info2: '2 new',
    players: [
      { playerID: 'javonte-williams', info2: '2 new' }
    ]
  },
]
