// Extended clip data structure
// ~3 clips per team, ~2 clips per player
// playerID references playersData.js

const teamMap = {
  'DAL': 'Dallas Cowboys',
  'DET': 'Detroit Lions',
  'BUF': 'Buffalo Bills',
  'CIN': 'Cincinnati Bengals',
  'LAR': 'Los Angeles Rams',
  'SEA': 'Seattle Seahawks',
  'ATL': 'Atlanta Falcons',
  'SF': 'San Francisco 49ers',
  'IND': 'Indianapolis Colts',
  'PHI': 'Philadelphia Eagles'
}

// Helper function to calculate relative time string
function getRelativeTime(postedAt) {
  const now = Date.now()
  const diff = now - postedAt
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)

  if (weeks > 0) {
    return `${weeks}w ago`
  } else if (days > 0) {
    return `${days}d ago`
  } else if (hours > 0) {
    return `${hours}h ago`
  } else if (minutes > 0) {
    return `${minutes}m ago`
  } else {
    return `${seconds}s ago`
  }
}

// Raw clips data with timestamps
const rawClipsData = [
  // DAL - Dallas Cowboys (3 clips, 3 players: C. Lamb, J. Ferguson, J. Williams)
  {
    id: 'dal-1',
    video: '/videos/dal-clip1.mp4',
    playerID: 'ceedee-lamb',
    playerName: 'C. Lamb',
    teamID: 'DAL',
    teamName: teamMap['DAL'],
    postedAt: Date.now() - (2 * 60 * 1000), // 2 minutes ago
    fpts: '+8.8 fpts',
    title: '43rd career touchdown reception',
    description: 'CeeDee Lamb capped the drive with an 18-yard touchdown on a sharp inside break, settling between coverage and finishing through contact.',
    playDescription: '18 yd TD catch',
    stats: {
      stat1: { value: '19', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '5', unit: 'yards', label: 'YAC' },
      stat3: { value: '42', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'dal-2',
    video: '/videos/dal-clip2.mp4',
    playerID: 'ceedee-lamb',
    playerName: 'C. Lamb',
    teamID: 'DAL',
    teamName: teamMap['DAL'],
    postedAt: Date.now() - (15 * 60 * 1000), // 15 minutes ago
    fpts: '+6.2 fpts',
    title: 'Deep ball reception',
    description: 'CeeDee Lamb hauled in a 45-yard deep pass, showcasing his speed and route-running ability down the sideline.',
    playDescription: '45 yd catch',
    stats: {
      stat1: { value: '21.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '12', unit: 'yards', label: 'YAC' },
      stat3: { value: '68', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'dal-3',
    video: '/videos/dal-clip3.mp4',
    playerID: 'jake-ferguson',
    playerName: 'J. Ferguson',
    teamID: 'DAL',
    teamName: teamMap['DAL'],
    postedAt: Date.now() - (45 * 60 * 1000), // 45 minutes ago
    fpts: '+6.5 fpts',
    title: '15th career touchdown reception',
    description: 'Jake Ferguson made a crucial 5-yard touchdown catch, running from trips formation, and sitting down right at the middle of the endzone.',
    playDescription: '5 yd TD catch',
    stats: {
      stat1: { value: '4', unit: 'yards', label: 'YAC' },
      stat2: { value: '2', unit: 'tds', label: 'Total TDs' },
      stat3: { value: '67', unit: 'yards', label: 'Total Yds' }
    }
  },
  {
    id: 'dal-4',
    video: '/videos/dal-clip4.mp4',
    playerID: 'jake-ferguson',
    playerName: 'J. Ferguson',
    teamID: 'DAL',
    teamName: teamMap['DAL'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+4.8 fpts',
    title: 'First down conversion',
    description: 'Jake Ferguson secured a 12-yard reception on 3rd down, moving the chains and keeping the drive alive.',
    playDescription: '12 yd catch',
    stats: {
      stat1: { value: '6', unit: 'yards', label: 'YAC' },
      stat2: { value: '1', unit: 'fd', label: 'First Down' },
      stat3: { value: '12', unit: 'yards', label: 'Gain' }
    }
  },
  {
    id: 'dal-5',
    video: '/videos/dal-clip5.mp4',
    playerID: 'javonte-williams',
    playerName: 'J. Williams',
    teamID: 'DAL',
    teamName: teamMap['DAL'],
    postedAt: Date.now() - (12 * 60 * 60 * 1000), // 12 hours ago
    fpts: '+1.3 fpts',
    title: 'Strong rushing play',
    description: 'J. Williams broke through the line for a solid 13-yard gain, showing good vision and power.',
    playDescription: '13 yd rush',
    stats: {
      stat1: { value: '16.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '8', unit: 'yards', label: 'YCo' },
      stat3: { value: '5.2', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'dal-6',
    video: '/videos/dal-clip6.mp4',
    playerID: 'javonte-williams',
    playerName: 'J. Williams',
    teamID: 'DAL',
    teamName: teamMap['DAL'],
    postedAt: Date.now() - (1 * 24 * 60 * 60 * 1000), // 1 day ago
    fpts: '+5.6 fpts',
    title: 'Touchdown run',
    description: 'Javonte Williams powered through defenders for a 7-yard touchdown run, displaying excellent balance and determination.',
    playDescription: '7 yd TD rush',
    stats: {
      stat1: { value: '18.1', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '3', unit: 'yards', label: 'YCo' },
      stat3: { value: '4.8', unit: 'yards', label: 'YPC' }
    }
  },

  // DET - Detroit Lions (3 clips, 1 player: J. Gibbs)
  {
    id: 'det-1',
    video: '/videos/det-clip1.mp4',
    playerID: 'jahmyr-gibbs',
    playerName: 'J. Gibbs',
    teamID: 'DET',
    teamName: teamMap['DET'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+7.2 fpts',
    title: 'Breakaway touchdown',
    description: 'Jahmyr Gibbs exploded through the line for a 22-yard touchdown run, showcasing his elite speed and acceleration.',
    playDescription: '22 yd TD rush',
    stats: {
      stat1: { value: '20.3', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '15', unit: 'yards', label: 'YCo' },
      stat3: { value: '6.1', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'det-2',
    video: '/videos/det-clip2.mp4',
    playerID: 'jahmyr-gibbs',
    playerName: 'J. Gibbs',
    teamID: 'DET',
    teamName: teamMap['DET'],
    postedAt: Date.now() - (8 * 60 * 60 * 1000), // 8 hours ago
    fpts: '+3.4 fpts',
    title: 'Screen pass reception',
    description: 'Jahmyr Gibbs caught a screen pass and turned it into a 14-yard gain with excellent open-field running.',
    playDescription: '14 yd catch',
    stats: {
      stat1: { value: '19.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '11', unit: 'yards', label: 'YAC' },
      stat3: { value: '85', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'det-3',
    video: '/videos/det-clip3.mp4',
    playerID: 'jahmyr-gibbs',
    playerName: 'J. Gibbs',
    teamID: 'DET',
    teamName: teamMap['DET'],
    postedAt: Date.now() - (15 * 60 * 1000), // 15 minutes ago
    fpts: '+4.1 fpts',
    title: 'Red zone touchdown',
    description: 'Jahmyr Gibbs punched it in from 3 yards out, demonstrating his power and vision in tight spaces.',
    playDescription: '3 yd TD rush',
    stats: {
      stat1: { value: '15.8', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '2', unit: 'yards', label: 'YCo' },
      stat3: { value: '5.4', unit: 'yards', label: 'YPC' }
    }
  },

  // BUF - Buffalo Bills (3 clips, 1 player: J. Allen)
  {
    id: 'buf-1',
    video: '/videos/buf-clip1.mp4',
    playerID: 'josh-allen',
    playerName: 'J. Allen',
    teamID: 'BUF',
    teamName: teamMap['BUF'],
    postedAt: Date.now() - (8 * 60 * 60 * 1000), // 8 hours ago
    fpts: '+7.5 fpts',
    title: '3rd career touchdown rush',
    description: 'Josh Allen made a crucial 23-yard touchdown rush, running from the shotgun formation, and sitting down right at the middle of the endzone.',
    playDescription: '23 yd TD rush',
    stats: {
      stat1: { value: '16.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '8', unit: 'yards', label: 'YAC' },
      stat3: { value: '5.2', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'buf-2',
    video: '/videos/buf-clip2.mp4',
    playerID: 'josh-allen',
    playerName: 'J. Allen',
    teamID: 'BUF',
    teamName: teamMap['BUF'],
    postedAt: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
    fpts: '+9.2 fpts',
    title: 'Deep touchdown pass',
    description: 'Josh Allen connected on a 38-yard touchdown pass, dropping it perfectly into the receiver\'s hands in the endzone.',
    playDescription: '38 yd TD pass',
    stats: {
      stat1: { value: '58', unit: 'yards', label: 'Air Yds' },
      stat2: { value: '1', unit: 'td', label: 'Touchdown' },
      stat3: { value: '72', unit: '%', label: 'Comp %' }
    }
  },
  {
    id: 'buf-3',
    video: '/videos/buf-clip3.mp4',
    playerID: 'josh-allen',
    playerName: 'J. Allen',
    teamID: 'BUF',
    teamName: teamMap['BUF'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+5.8 fpts',
    title: 'Scrambling first down',
    description: 'Josh Allen escaped pressure and scrambled for a 12-yard first down, keeping the drive alive with his legs.',
    playDescription: '12 yd rush',
    stats: {
      stat1: { value: '17.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '1', unit: 'fd', label: 'First Down' },
      stat3: { value: '12', unit: 'yards', label: 'Gain' }
    }
  },

  // CIN - Cincinnati Bengals (3 clips, 1 player: J. Chase)
  {
    id: 'cin-1',
    video: '/videos/cin-clip1.mp4',
    playerID: 'jamarr-chase',
    playerName: 'J. Chase',
    teamID: 'CIN',
    teamName: teamMap['CIN'],
    postedAt: Date.now() - (8 * 60 * 60 * 1000), // 8 hours ago
    fpts: '+9.1 fpts',
    title: 'Spectacular one-handed catch',
    description: 'Jamarr Chase made an incredible one-handed catch for a 28-yard touchdown, showcasing his elite ball skills.',
    playDescription: '28 yd TD catch',
    stats: {
      stat1: { value: '20.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '8', unit: 'yards', label: 'YAC' },
      stat3: { value: '45', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'cin-2',
    video: '/videos/cin-clip2.mp4',
    playerID: 'jamarr-chase',
    playerName: 'J. Chase',
    teamID: 'CIN',
    teamName: teamMap['CIN'],
    postedAt: Date.now() - (15 * 60 * 1000), // 15 minutes ago
    fpts: '+6.7 fpts',
    title: 'Route-running mastery',
    description: 'Jamarr Chase created separation with a crisp route and caught a 19-yard pass for a first down.',
    playDescription: '19 yd catch',
    stats: {
      stat1: { value: '19.8', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '6', unit: 'yards', label: 'YAC' },
      stat3: { value: '78', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'cin-3',
    video: '/videos/cin-clip3.mp4',
    playerID: 'jamarr-chase',
    playerName: 'J. Chase',
    teamID: 'CIN',
    teamName: teamMap['CIN'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+7.3 fpts',
    title: 'Yard after catch',
    description: 'Jamarr Chase turned a short pass into a 24-yard gain with excellent vision and elusiveness after the catch.',
    playDescription: '24 yd catch',
    stats: {
      stat1: { value: '21.1', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '18', unit: 'yards', label: 'YAC' },
      stat3: { value: '82', unit: '%', label: 'Catch %' }
    }
  },

  // LAR - Los Angeles Rams (3 clips, 1 player: P. Nacua)
  {
    id: 'lar-1',
    video: '/videos/lar-clip1.mp4',
    playerID: 'puka-nacua',
    playerName: 'P. Nacua',
    teamID: 'LAR',
    teamName: teamMap['LAR'],
    postedAt: Date.now() - (8 * 60 * 60 * 1000), // 8 hours ago
    fpts: '+7.8 fpts',
    title: 'Rookie touchdown reception',
    description: 'Puka Nacua made a crucial 15-yard touchdown catch, running from the shotgun formation, and sitting down right at the middle of the endzone.',
    playDescription: '15 yd TD catch',
    stats: {
      stat1: { value: '19.8', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '15', unit: 'yards', label: 'YAC' },
      stat3: { value: '42', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'lar-2',
    video: '/videos/lar-clip2.mp4',
    playerID: 'puka-nacua',
    playerName: 'P. Nacua',
    teamID: 'LAR',
    teamName: teamMap['LAR'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+5.4 fpts',
    title: 'Third down conversion',
    description: 'Puka Nacua secured a 11-yard reception on 3rd and 8, moving the chains with a clutch catch.',
    playDescription: '11 yd catch',
    stats: {
      stat1: { value: '18.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '4', unit: 'yards', label: 'YAC' },
      stat3: { value: '71', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'lar-3',
    video: '/videos/lar-clip3.mp4',
    playerID: 'puka-nacua',
    playerName: 'P. Nacua',
    teamID: 'LAR',
    teamName: teamMap['LAR'],
    postedAt: Date.now() - (15 * 60 * 1000), // 15 minutes ago
    fpts: '+6.2 fpts',
    title: 'Deep ball connection',
    description: 'Puka Nacua tracked down a 32-yard deep pass, making an acrobatic catch while maintaining possession.',
    playDescription: '32 yd catch',
    stats: {
      stat1: { value: '20.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '9', unit: 'yards', label: 'YAC' },
      stat3: { value: '55', unit: '%', label: 'Catch %' }
    }
  },

  // SEA - Seattle Seahawks (3 clips, 1 player: J. Smith-Njigba)
  {
    id: 'sea-1',
    video: '/videos/J_Smith-Njigba_Yards_Play1.mp4',
    playerID: 'jaxon-smith-njigba',
    playerName: 'J. Smith-Njigba',
    teamID: 'SEA',
    teamName: teamMap['SEA'],
    postedAt: Date.now() - (3 * 60 * 1000), // 3 minutes ago
    fpts: '+9.8 fpts',
    title: 'Touchdown reception',
    description: 'Jaxon Smith-Njigba caught a 9-yard touchdown pass, finding the soft spot in the zone coverage.',
    playDescription: '28 yd TD catch',
    stats: {
      stat1: { value: '18.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '3', unit: 'yards', label: 'YAC' },
      stat3: { value: '88', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'sea-2',
    video: '/videos/J_Smith-Njigba_Yards_Play2.mp4',
    playerID: 'jaxon-smith-njigba',
    playerName: 'J. Smith-Njigba',
    teamID: 'SEA',
    teamName: teamMap['SEA'],
    postedAt: Date.now() - (3 * 60 * 1000), // 3 minutes ago
    fpts: '+4.0 fpts',
    title: 'Slot receiver catch',
    description: 'Jaxon Smith-Njigba worked the middle of the field for a 14-yard reception, showing his route-running skills.',
    playDescription: '30 yd catch',
    stats: {
      stat1: { value: '17.8', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '7', unit: 'yards', label: 'YAC' },
      stat3: { value: '75', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'sea-3',
    video: '/videos/J_Smith-Njigba_Yards_Play3.mp4',
    playerID: 'jaxon-smith-njigba',
    playerName: 'J. Smith-Njigba',
    teamID: 'SEA',
    teamName: teamMap['SEA'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+5.8 fpts',
    title: 'Red zone target', 
    description: 'Jaxon Smith-Njigba made a his first catch of the day for a 8-yard gain, getting the first down on a crucial 3rd and 7.',
    playDescription: '8 yd catch',
    stats: {
      stat1: { value: '16.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '0', unit: 'yards', label: 'YAC' },
      stat3: { value: '65', unit: '%', label: 'Catch %' }
    }
  },

  // ATL - Atlanta Falcons (3 clips, 1 player: B. Robinson)
  {
    id: 'atl-1',
    video: '/videos/atl-clip1.mp4',
    playerID: 'bijan-robinson',
    playerName: 'B. Robinson',
    teamID: 'ATL',
    teamName: teamMap['ATL'],
    postedAt: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
    fpts: '+8.4 fpts',
    title: 'Breakaway run',
    description: 'Bijan Robinson broke free for a 27-yard run, displaying his elite speed and vision in the open field.',
    playDescription: '27 yd rush',
    stats: {
      stat1: { value: '21.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '20', unit: 'yards', label: 'YCo' },
      stat3: { value: '6.2', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'atl-2',
    video: '/videos/atl-clip2.mp4',
    playerID: 'bijan-robinson',
    playerName: 'B. Robinson',
    teamID: 'ATL',
    teamName: teamMap['ATL'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+6.7 fpts',
    title: 'Touchdown run',
    description: 'Bijan Robinson powered through defenders for a 4-yard touchdown run, showing excellent balance and power.',
    playDescription: '4 yd TD rush',
    stats: {
      stat1: { value: '17.8', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '2', unit: 'yards', label: 'YCo' },
      stat3: { value: '5.1', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'atl-3',
    video: '/videos/atl-clip3.mp4',
    playerID: 'bijan-robinson',
    playerName: 'B. Robinson',
    teamID: 'ATL',
    teamName: teamMap['ATL'],
    postedAt: Date.now() - (8 * 60 * 60 * 1000), // 8 hours ago
    fpts: '+3.2 fpts',
    title: 'Receiving touchdown',
    description: 'Bijan Robinson caught a screen pass and took it 8 yards for a touchdown, showcasing his versatility.',
    playDescription: '8 yd TD catch',
    stats: {
      stat1: { value: '19.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '6', unit: 'yards', label: 'YAC' },
      stat3: { value: '92', unit: '%', label: 'Catch %' }
    }
  },

  // SF - San Francisco 49ers (3 clips, 1 player: G. Kittle)
  {
    id: 'sf-1',
    video: '/videos/sf-clip1.mp4',
    playerID: 'george-kittle',
    playerName: 'G. Kittle',
    teamID: 'SF',
    teamName: teamMap['SF'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+7.6 fpts',
    title: 'Tight end touchdown',
    description: 'George Kittle caught a 12-yard touchdown pass, using his size and strength to secure the catch in traffic.',
    playDescription: '12 yd TD catch',
    stats: {
      stat1: { value: '17.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '5', unit: 'yards', label: 'YAC' },
      stat3: { value: '78', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'sf-2',
    video: '/videos/sf-clip2.mp4',
    playerID: 'george-kittle',
    playerName: 'G. Kittle',
    teamID: 'SF',
    teamName: teamMap['SF'],
    postedAt: Date.now() - (15 * 60 * 1000), // 15 minutes ago
    fpts: '+5.3 fpts',
    title: 'Yard after catch',
    description: 'George Kittle turned a short pass into a 16-yard gain with powerful running after the catch.',
    playDescription: '16 yd catch',
    stats: {
      stat1: { value: '18.8', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '12', unit: 'yards', label: 'YAC' },
      stat3: { value: '85', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'sf-3',
    video: '/videos/sf-clip3.mp4',
    playerID: 'george-kittle',
    playerName: 'G. Kittle',
    teamID: 'SF',
    teamName: teamMap['SF'],
    postedAt: Date.now() - (8 * 60 * 60 * 1000), // 8 hours ago
    fpts: '+4.9 fpts',
    title: 'First down conversion',
    description: 'George Kittle secured a 9-yard reception on 3rd down, moving the chains with a reliable catch.',
    playDescription: '9 yd catch',
    stats: {
      stat1: { value: '16.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '4', unit: 'yards', label: 'YAC' },
      stat3: { value: '81', unit: '%', label: 'Catch %' }
    }
  },

  // IND - Indianapolis Colts (3 clips, 1 player: J. Taylor)
  {
    id: 'ind-1',
    video: '/videos/ind-clip1.mp4',
    playerID: 'jonathon-taylor',
    playerName: 'J. Taylor',
    teamID: 'IND',
    teamName: teamMap['IND'],
    postedAt: Date.now() - (1 * 7 * 24 * 60 * 60 * 1000), // 1 week ago
    fpts: '+9.5 fpts',
    title: 'Long touchdown run',
    description: 'Jonathon Taylor broke through the line and raced 35 yards for a touchdown, displaying his breakaway speed.',
    playDescription: '35 yd TD rush',
    stats: {
      stat1: { value: '22.1', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '28', unit: 'yards', label: 'YCo' },
      stat3: { value: '5.8', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'ind-2',
    video: '/videos/ind-clip2.mp4',
    playerID: 'jonathon-taylor',
    playerName: 'J. Taylor',
    teamID: 'IND',
    teamName: teamMap['IND'],
    postedAt: Date.now() - (15 * 60 * 1000), // 15 minutes ago
    fpts: '+6.2 fpts',
    title: 'Power run',
    description: 'Jonathon Taylor powered through defenders for a 8-yard gain, showing excellent strength and balance.',
    playDescription: '8 yd rush',
    stats: {
      stat1: { value: '18.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '5', unit: 'yards', label: 'YCo' },
      stat3: { value: '5.6', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'ind-3',
    video: '/videos/ind-clip3.mp4',
    playerID: 'jonathon-taylor',
    playerName: 'J. Taylor',
    teamID: 'IND',
    teamName: teamMap['IND'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+7.1 fpts',
    title: 'Red zone touchdown',
    description: 'Jonathon Taylor punched it in from 2 yards out, demonstrating his power in goal-line situations.',
    playDescription: '2 yd TD rush',
    stats: {
      stat1: { value: '15.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '1', unit: 'yard', label: 'YCo' },
      stat3: { value: '5.4', unit: 'yards', label: 'YPC' }
    }
  },

  // PHI - Philadelphia Eagles (3 clips, 1 player: S. Barkley)
  {
    id: 'phi-1',
    video: '/videos/phi-clip1.mp4',
    playerID: 'saquan-barkley',
    playerName: 'S. Barkley',
    teamID: 'PHI',
    teamName: teamMap['PHI'],
    postedAt: Date.now() - (2 * 7 * 24 * 60 * 60 * 1000), // 2 weeks ago
    fpts: '+8.7 fpts',
    title: 'Elusive touchdown run',
    description: 'Saquan Barkley made multiple defenders miss on his way to a 19-yard touchdown run, showcasing his agility.',
    playDescription: '19 yd TD rush',
    stats: {
      stat1: { value: '20.8', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '14', unit: 'yards', label: 'YCo' },
      stat3: { value: '4.3', unit: 'yards', label: 'YPC' }
    }
  },
  {
    id: 'phi-2',
    video: '/videos/phi-clip2.mp4',
    playerID: 'saquan-barkley',
    playerName: 'S. Barkley',
    teamID: 'PHI',
    teamName: teamMap['PHI'],
    postedAt: Date.now() - (1 * 60 * 60 * 1000), // 1 hour ago
    fpts: '+4.8 fpts',
    title: 'Screen pass touchdown',
    description: 'Saquan Barkley caught a screen pass and took it 11 yards for a touchdown, displaying his receiving skills.',
    playDescription: '11 yd TD catch',
    stats: {
      stat1: { value: '19.5', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '9', unit: 'yards', label: 'YAC' },
      stat3: { value: '88', unit: '%', label: 'Catch %' }
    }
  },
  {
    id: 'phi-3',
    video: '/videos/phi-clip3.mp4',
    playerID: 'saquan-barkley',
    playerName: 'S. Barkley',
    teamID: 'PHI',
    teamName: teamMap['PHI'],
    postedAt: Date.now() - (15 * 60 * 1000), // 15 minutes ago
    fpts: '+5.4 fpts',
    title: 'First down run',
    description: 'Saquan Barkley picked up 6 yards on 3rd and 4, moving the chains with a hard-fought run.',
    playDescription: '6 yd rush',
    stats: {
      stat1: { value: '17.2', unit: 'mph', label: 'Peak Spd' },
      stat2: { value: '4', unit: 'yards', label: 'YCo' },
      stat3: { value: '4.1', unit: 'yards', label: 'YPC' }
    }
  }
]

// Process clips: add postmark from timestamp and sort by most recent first
export const allClipsData = rawClipsData
  .map(clip => ({
    ...clip,
    postmark: getRelativeTime(clip.postedAt)
  }))
  .sort((a, b) => b.postedAt - a.postedAt) // Sort by most recent first

