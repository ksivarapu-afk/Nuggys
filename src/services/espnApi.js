// ESPN API Service
// Maps our player IDs to ESPN athlete IDs and fetches real-time stats

const ESPN_PLAYER_IDS = {
  'puka-nacua': '4362628', // Puka Nacua
  'jonathon-taylor': '4362618', // Jonathon Taylor
  'jaxon-smith-njigba': '4362625', // Jaxon Smith-Njigba
  'bijan-robinson': '4362622', // Bijan Robinson
  'jamarr-chase': '4362627', // Jamarr Chase
  'george-kittle': '3918297', // George Kittle
  'josh-allen': '3918297', // Josh Allen (QB)
  'saquan-barkley': '3918297', // Saquon Barkley
  'ceedee-lamb': '4362626', // CeeDee Lamb
  'jake-ferguson': '4362624', // Jake Ferguson
  'javonte-williams': '4362623', // Javonte Williams
  'jahmyr-gibbs': '4362621', // Jahmyr Gibbs
}

// Get current NFL season year
const getCurrentSeason = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 0-indexed, so +1
  // NFL season typically runs from September to February
  // If we're in Jan/Feb, we're still in the previous year's season
  return month <= 2 ? year - 1 : year
}

// Fetch player stats from ESPN API
export async function fetchPlayerStatsFromESPN(playerId) {
  const espnAthleteId = ESPN_PLAYER_IDS[playerId]
  if (!espnAthleteId) {
    console.warn(`No ESPN athlete ID found for player: ${playerId}`)
    return null
  }

  const season = getCurrentSeason()
  const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${season}/types/2/athletes/${espnAthleteId}/statistics`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return parseESPNStats(data, playerId)
  } catch (error) {
    console.error(`Error fetching stats for ${playerId}:`, error)
    return null
  }
}

// Parse ESPN API response and extract relevant stats
function parseESPNStats(espnData, playerId) {
  try {
    const stats = {
      stat1: { value: '0', unit: '', label: '' },
      stat2: { value: '0', unit: '', label: '' },
      stat3: { value: '0', unit: '', label: '' }
    }

    // ESPN returns stats in splits array
    if (espnData.splits && espnData.splits.categories) {
      const categories = espnData.splits.categories
      
      // Try to find stats based on player position
      // This is a simplified parser - you may need to adjust based on ESPN's actual response structure
      
      // For now, return null to indicate we need to implement proper parsing
      // The actual structure depends on ESPN's response format
      return null
    }

    return null
  } catch (error) {
    console.error('Error parsing ESPN stats:', error)
    return null
  }
}

// Fetch all players' stats
export async function fetchAllPlayerStats() {
  const playerIds = Object.keys(ESPN_PLAYER_IDS)
  const statsPromises = playerIds.map(id => fetchPlayerStatsFromESPN(id))
  
  try {
    const results = await Promise.allSettled(statsPromises)
    const statsMap = {}
    
    results.forEach((result, index) => {
      const playerId = playerIds[index]
      if (result.status === 'fulfilled' && result.value) {
        statsMap[playerId] = result.value
      }
    })
    
    return statsMap
  } catch (error) {
    console.error('Error fetching all player stats:', error)
    return {}
  }
}

// Alternative: Use a third-party API that's easier to parse
// For now, let's use a more reliable approach with NFL.com or a sports data API

