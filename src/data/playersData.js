// Import player profile photos
import P_Nacua from '../assets/Player_IDs/P_Nacua.png'
import J_Taylor from '../assets/Player_IDs/J_Taylor.png'
import J_SmithNjigba from '../assets/Player_IDs/J_Smith-Njigba.png'
import B_Robinson from '../assets/Player_IDs/B_Robinson.png'
import J_Chase from '../assets/Player_IDs/J_Chase.png'
import G_Kittle from '../assets/Player_IDs/G_Kittle.png'
import J_Allen from '../assets/Player_IDs/J_Allen.png'
import S_Barkeley from '../assets/Player_IDs/S_Barkeley.png'
import C_Lamb from '../assets/Player_IDs/C_Lamb.png'
import J_Ferguson from '../assets/Player_IDs/J_Ferguson.png'
import J_Williams from '../assets/Player_IDs/J_Williams.png'
import J_Gibbs from '../assets/Player_IDs/J_Gibbs.png'

// Import player banners
import P_Nacua_Banner from '../assets/Player_Banners/P_Nacua_Banner.png'
import J_Taylor_Banner from '../assets/Player_Banners/J_Taylor_Banner.png'
import J_SmithNjigba_Banner from '../assets/Player_Banners/J_Smith-Njigba_Banner.png'
import B_Robinson_Dark from '../assets/Player_Banners/B_Robinson_Dark.png'
import J_Chase_Banner from '../assets/Player_Banners/J_Chase_Banner.png'
import G_Kittle_Banner from '../assets/Player_Banners/G_Kittle_Banner.png'
import J_Allen_Banner from '../assets/Player_Banners/J_Allen_Banner.png'
import S_Barkley_Banner from '../assets/Player_Banners/S_Barkley_Banner.png'
import C_Lamb_Banner from '../assets/Player_Banners/C_Lamb_Banner.png'
import J_Ferguson_Banner from '../assets/Player_Banners/J_Ferguson_Banner.png'
import J_Williams_Banner from '../assets/Player_Banners/J_Williams_Banner.png'
import J_Gibbs_Banner from '../assets/Player_Banners/J_Gibbs_Banner.png'

// Player database
export const playersData = [
  {
    id: 'puka-nacua',
    fullName: 'Puka Nacua',
    displayName: 'P. Nacua',
    team: 'LAR',
    position: 'WR',
    number: '17',
    healthyStatus: 'Active',
    profilePhoto: P_Nacua,
    banner: P_Nacua_Banner,
    followed: false,
    stats: {
      stat1: { value: '974', unit: 'YDS', label: 'Rec. Yds' },
      stat2: { value: '80', unit: 'REC', label: 'Receptions' },
      stat3: { value: '4', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '105', unit: 'TGT', label: 'Targets' }
    }
  },
  {
    id: 'jonathon-taylor',
    fullName: 'Jonathon Taylor',
    displayName: 'J. Taylor',
    team: 'IND',
    position: 'RB',
    number: '28',
    healthyStatus: 'Active',
    profilePhoto: J_Taylor,
    banner: J_Taylor_Banner,
    followed: false,
    stats: {
      stat1: { value: '1,197', unit: 'YDS', label: 'Rushing Yds' },
      stat2: { value: '5.8', unit: 'YPC', label: 'YPC' },
      stat3: { value: '15', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '169', unit: 'ATT', label: 'Attempts' }
    },
    awards: [
      { title: 'NUGGYS running back of the month', month: 'September 2025' },
      { title: 'NUGGYS running back of the month', month: 'October 2025' }
    ]
  },
  {
    id: 'jaxon-smith-njigba',
    fullName: 'Jaxon Smith-Njigba',
    displayName: 'J. Smith-Njigba',
    team: 'SEA',
    position: 'WR',
    number: '11',
    healthyStatus: 'Active',
    profilePhoto: J_SmithNjigba,
    banner: J_SmithNjigba_Banner,
    followed: false,
    stats: {
      stat1: { value: '628', unit: 'YDS', label: 'Receiving Yds' },
      stat2: { value: '63', unit: 'TGT', label: 'Targets' },
      stat3: { value: '4', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '63', unit: 'REC', label: 'Receptions' }
    },
    awards: [
      { title: 'NUGGYS receiver of the month', month: 'September 2025' },
      { title: 'NUGGYS receiver of the month', month: 'November 2025' }
    ]
  },
  {
    id: 'bijan-robinson',
    fullName: 'Bijan Robinson',
    displayName: 'B. Robinson',
    team: 'ATL',
    position: 'RB',
    number: '7',
    healthyStatus: 'Active',
    profilePhoto: B_Robinson,
    banner: B_Robinson_Dark,
    followed: false,
    stats: {
      stat1: { value: '976', unit: 'YDS', label: 'Rushing Yds' },
      stat2: { value: '5.1', unit: 'YPC', label: 'Yards Per Carry' },
      stat3: { value: '58', unit: 'REC', label: 'Receptions' },
      stat4: { value: '214', unit: 'ATT', label: 'Attempts' }
    }
  },
  {
    id: 'jamarr-chase',
    fullName: 'Jamarr Chase',
    displayName: 'J. Chase',
    team: 'CIN',
    position: 'WR',
    number: '1',
    healthyStatus: 'Active',
    profilePhoto: J_Chase,
    banner: J_Chase_Banner,
    followed: false,
    stats: {
      stat1: { value: '1,216', unit: 'YDS', label: 'Receiving Yds' },
      stat2: { value: '100', unit: 'REC', label: 'Receptions' },
      stat3: { value: '7', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '145', unit: 'TGT', label: 'Targets' }
    }
  },
  {
    id: 'george-kittle',
    fullName: 'George Kittle',
    displayName: 'G. Kittle',
    team: 'SF',
    position: 'TE',
    number: '85',
    healthyStatus: 'Active',
    profilePhoto: G_Kittle,
    banner: G_Kittle_Banner,
    followed: false,
    stats: {
      stat1: { value: '1,020', unit: 'YDS', label: 'Receiving Yds' },
      stat2: { value: '65', unit: 'REC', label: 'Receptions' },
      stat3: { value: '6', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '90', unit: 'TGT', label: 'Targets' }
    },
    awards: [
      { title: 'NUGGYS tight end of the month', month: 'November 2025' }
    ]
  },
  {
    id: 'josh-allen',
    fullName: 'Josh Allen',
    displayName: 'J. Allen',
    team: 'BUF',
    position: 'QB',
    number: '17',
    healthyStatus: 'Active',
    profilePhoto: J_Allen,
    banner: J_Allen_Banner,
    followed: false,
    stats: {
      stat1: { value: '4,306', unit: 'YDS', label: 'Passing Yds' },
      stat2: { value: '29', unit: 'TD', label: 'Touchdowns' },
      stat3: { value: '66.5', unit: 'PCT', label: 'Completion %' },
      stat4: { value: '541', unit: 'ATT', label: 'Attempts' }
    },
    awards: [
      { title: 'NUGGYS quarterback of the month', month: 'October 2025' }
    ]
  },
  {
    id: 'saquan-barkley',
    fullName: 'Saquan Barkley',
    displayName: 'S. Barkley',
    team: 'PHI',
    position: 'RB',
    number: '26',
    healthyStatus: 'Active',
    profilePhoto: S_Barkeley,
    banner: S_Barkley_Banner,
    followed: false,
    stats: {
      stat1: { value: '961', unit: 'YDS', label: 'Rushing Yds' },
      stat2: { value: '4.3', unit: 'YPC', label: 'Yards Per Carry' },
      stat3: { value: '6', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '247', unit: 'ATT', label: 'Attempts' }
    }
  },
  {
    id: 'ceedee-lamb',
    fullName: 'CeeDee Lamb',
    displayName: 'C. Lamb',
    team: 'DAL',
    position: 'WR',
    number: '88',
    healthyStatus: 'Active',
    profilePhoto: C_Lamb,
    banner: C_Lamb_Banner,
    followed: false,
    stats: {
      stat1: { value: '1,359', unit: 'YDS', label: 'Receiving Yds' },
      stat2: { value: '135', unit: 'TGT', label: 'Targets' },
      stat3: { value: '12', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '135', unit: 'REC', label: 'Receptions' }
    },
    awards: [
      { title: 'NUGGYS receiver of the month', month: 'October 2025' }
    ]
  },
  {
    id: 'jake-ferguson',
    fullName: 'Jake Ferguson',
    displayName: 'J. Ferguson',
    team: 'DAL',
    position: 'TE',
    number: '87',
    healthyStatus: 'Active',
    profilePhoto: J_Ferguson,
    banner: J_Ferguson_Banner,
    followed: false,
    stats: {
      stat1: { value: '761', unit: 'YDS', label: 'Receiving Yds' },
      stat2: { value: '71', unit: 'REC', label: 'Receptions' },
      stat3: { value: '5', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '102', unit: 'TGT', label: 'Targets' }
    }
  },
  {
    id: 'javonte-williams',
    fullName: 'Javonte Williams',
    displayName: 'J. Williams',
    team: 'DAL',
    position: 'RB',
    number: '33',
    healthyStatus: 'Active',
    profilePhoto: J_Williams,
    banner: J_Williams_Banner,
    followed: false,
    stats: {
      stat1: { value: '774', unit: 'YDS', label: 'Rushing Yds' },
      stat2: { value: '4.5', unit: 'YPC', label: 'Yards Per Carry' },
      stat3: { value: '5', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '217', unit: 'ATT', label: 'Attempts' }
    }
  },
  {
    id: 'jahmyr-gibbs',
    fullName: 'Jahmyr Gibbs',
    displayName: 'J. Gibbs',
    team: 'DET',
    position: 'RB',
    number: '0',
    healthyStatus: 'Active',
    profilePhoto: J_Gibbs,
    banner: J_Gibbs_Banner,
    followed: false,
    stats: {
      stat1: { value: '945', unit: 'YDS', label: 'Rushing Yds' },
      stat2: { value: '52', unit: 'REC', label: 'Receptions' },
      stat3: { value: '10', unit: 'TD', label: 'Touchdowns' },
      stat4: { value: '182', unit: 'ATT', label: 'Attempts' }
    },
    awards: [
      { title: 'NUGGYS running back of the month', month: 'November 2025' }
    ]
  }
]

// Helper function to get player by full name
export const getPlayerByName = (name) => {
  return playersData.find(player => 
    player.fullName === name || 
    player.displayName === name ||
    player.fullName.toLowerCase() === name?.toLowerCase()
  )
}

// Helper function to get player by ID
export const getPlayerById = (id) => {
  return playersData.find(player => player.id === id)
}

