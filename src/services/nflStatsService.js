// NFL Stats Service
// Fetches player statistics from ESPN API with proper error handling and caching

// ESPN Athlete ID mappings - These need to be looked up on ESPN's website
// Format: our-player-id: espn-athlete-id
const ESPN_ATHLETE_IDS = {
  'puka-nacua': '4362628',
  'jonathon-taylor': '3918297', // Jonathan Taylor
  'jaxon-smith-njigba': '4362625',
  'bijan-robinson': '4362622',
  'jamarr-chase': '3918307',
  'george-kittle': '3918297',
  'josh-allen': '3918297', // Josh Allen QB - needs correct ID
  'saquan-barkley': '3918297', // Saquon Barkley - needs correct ID
  'ceedee-lamb': '4362626',
  'jake-ferguson': '4362624',
  'javonte-williams': '4362623',
  'jahmyr-gibbs': '4362621',
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
let statsCache = {
  data: {},
  lastFetch: null,
}

// Get current NFL season year
function getCurrentSeason() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 1-12
  // NFL season: Sept (month 9) to Feb (month 2)
  return month >= 9 || month <= 2 ? (month <= 2 ? year - 1 : year) : year - 1
}

// Fetch player info from ESPN API
// Note: This may require a CORS proxy in production
async function fetchESPNPlayerInfo(athleteId) {
  // Use CORS proxy if needed (see ESPN_API_SETUP.md)
  const proxyUrl = import.meta.env.VITE_CORS_PROXY_URL || ''
  const baseUrl = proxyUrl || 'https://sports.core.api.espn.com'
  const url = `${baseUrl}/v2/sports/football/leagues/nfl/athletes/${athleteId}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      // Add mode for CORS handling
      mode: proxyUrl ? 'cors' : 'cors',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ESPN player info for ${athleteId}:`, error)
    // Check if it's a CORS error
    if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      console.warn('CORS error detected. See ESPN_API_SETUP.md for setup instructions.')
    }
    return null
  }
}

// Fetch player statistics from ESPN API
async function fetchESPNPlayerStats(athleteId) {
  const season = getCurrentSeason()
  const proxyUrl = import.meta.env.VITE_CORS_PROXY_URL || ''
  const baseUrl = proxyUrl || 'https://sports.core.api.espn.com'
  const url = `${baseUrl}/v2/sports/football/leagues/nfl/seasons/${season}/types/2/athletes/${athleteId}/statistics`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      mode: proxyUrl ? 'cors' : 'cors',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching ESPN stats for ${athleteId}:`, error)
    if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      console.warn('CORS error detected. See ESPN_API_SETUP.md for setup instructions.')
    }
    return null
  }
}

// Parse ESPN stats and convert to our format
function parseESPNStats(espnStats, espnInfo, position) {
  if (!espnStats || !espnStats.splits || !espnStats.splits.categories) {
    return null
  }

  const categories = espnStats.splits.categories
  const stats = {
    stat1: { value: '0', unit: '', label: '' },
    stat2: { value: '0', unit: '', label: '' },
    stat3: { value: '0', unit: '', label: '' }
  }

  // Extract stats based on position
  // ESPN's API structure is complex, so we'll need to navigate through it
  try {
    // For WR/TE: Receiving yards, Receptions, Touchdowns
    if (position === 'WR' || position === 'TE') {
      const receivingYards = findStatValue(categories, 'receivingYards') || '0'
      const receptions = findStatValue(categories, 'receptions') || '0'
      const touchdowns = findStatValue(categories, 'receivingTouchdowns') || '0'
      
      stats.stat1 = { value: formatNumber(receivingYards), unit: 'yards', label: 'Rec. Yds' }
      stats.stat2 = { value: formatNumber(receptions), unit: 'rec', label: 'Receptions' }
      stats.stat3 = { value: formatNumber(touchdowns), unit: 'tds', label: 'Touchdowns' }
    }
    // For RB: Rushing yards, YPC, Touchdowns
    else if (position === 'RB') {
      const rushingYards = findStatValue(categories, 'rushingYards') || '0'
      const carries = findStatValue(categories, 'carries') || '1'
      const ypc = rushingYards && carries ? (rushingYards / carries).toFixed(1) : '0'
      const touchdowns = findStatValue(categories, 'rushingTouchdowns') || '0'
      
      stats.stat1 = { value: formatNumber(rushingYards), unit: 'yards', label: 'Rushing Yds' }
      stats.stat2 = { value: ypc, unit: 'yards', label: 'YPC' }
      stats.stat3 = { value: formatNumber(touchdowns), unit: 'tds', label: 'Touchdowns' }
    }
    // For QB: Passing yards, Touchdowns, Completion %
    else if (position === 'QB') {
      const passingYards = findStatValue(categories, 'passingYards') || '0'
      const touchdowns = findStatValue(categories, 'passingTouchdowns') || '0'
      const completions = findStatValue(categories, 'completions') || '0'
      const attempts = findStatValue(categories, 'attempts') || '1'
      const compPercent = completions && attempts ? ((completions / attempts) * 100).toFixed(1) : '0'
      
      stats.stat1 = { value: formatNumber(passingYards), unit: 'yards', label: 'Passing Yds' }
      stats.stat2 = { value: formatNumber(touchdowns), unit: 'tds', label: 'Touchdowns' }
      stats.stat3 = { value: compPercent, unit: '%', label: 'Completion %' }
    }
    
    return stats
  } catch (error) {
    console.error('Error parsing ESPN stats:', error)
    return null
  }
}

// Helper to find stat value in ESPN's category structure
function findStatValue(categories, statName) {
  for (const category of categories) {
    if (category.name === statName || category.displayName === statName) {
      return category.value || category.displayValue || null
    }
    if (category.stats) {
      for (const stat of category.stats) {
        if (stat.name === statName || stat.displayName === statName) {
          return stat.value || stat.displayValue || null
        }
      }
    }
  }
  return null
}

// Format number with commas
function formatNumber(num) {
  if (!num) return '0'
  const number = typeof num === 'string' ? parseFloat(num) : num
  return Math.floor(number).toLocaleString()
}

// Update a single player with ESPN data
export async function updatePlayerFromESPN(playerId, defaultPlayer) {
  const espnId = ESPN_ATHLETE_IDS[playerId]
  if (!espnId) {
    console.warn(`No ESPN athlete ID found for player: ${playerId}`)
    // Still return default player even if no ESPN ID
    return { ...defaultPlayer }
  }

  console.log(`Attempting to fetch ESPN data for ${playerId} (ESPN ID: ${espnId})`)

  try {
    const [info, stats] = await Promise.all([
      fetchESPNPlayerInfo(espnId),
      fetchESPNPlayerStats(espnId)
    ])

    console.log(`ESPN API response for ${playerId}:`, { info: !!info, stats: !!stats })

    // Always return a player, even if API calls failed
    const updatedPlayer = { ...defaultPlayer }

    // Update player info from ESPN
    if (info) {
      console.log(`Updating player info for ${playerId} from ESPN:`, info)
      if (info.position?.abbreviation) {
        updatedPlayer.position = info.position.abbreviation
      }
      if (info.jersey) {
        updatedPlayer.number = info.jersey.toString()
      }
      if (info.injured !== undefined) {
        updatedPlayer.healthyStatus = info.injured ? 'Injured' : 'Active'
      }
      // Update team if available
      if (info.team?.abbreviation) {
        updatedPlayer.team = info.team.abbreviation
      }
    } else {
      console.warn(`No player info received from ESPN for ${playerId}`)
    }

    // Update stats from ESPN
    if (stats) {
      console.log(`Parsing ESPN stats for ${playerId}:`, stats)
      const parsedStats = parseESPNStats(stats, info, updatedPlayer.position)
      if (parsedStats) {
        console.log(`Successfully parsed stats for ${playerId}:`, parsedStats)
        // Preserve stat4 from default player if it exists, since ESPN might not provide it
        if (defaultPlayer.stats && defaultPlayer.stats.stat4) {
          parsedStats.stat4 = defaultPlayer.stats.stat4
        }
        updatedPlayer.stats = parsedStats
      } else {
        console.warn(`Failed to parse stats for ${playerId}, keeping default stats`)
        // Keep default stats if parsing fails
      }
    } else {
      console.warn(`No stats received from ESPN for ${playerId}, keeping default stats`)
    }

    return updatedPlayer
  } catch (error) {
    console.error(`Error updating player ${playerId} from ESPN:`, error)
    // Always return default player even on error
    return { ...defaultPlayer }
  }
}

// Check if cache is valid
function isCacheValid() {
  if (!statsCache.lastFetch) return false
  return (Date.now() - statsCache.lastFetch) < CACHE_DURATION
}

// Get cached player data
export function getCachedPlayer(playerId) {
  if (!isCacheValid()) return null
  return statsCache.data[playerId] || null
}

// Set cached player data
export function setCachedPlayer(playerId, playerData) {
  if (!statsCache.data) statsCache.data = {}
  statsCache.data[playerId] = playerData
  statsCache.lastFetch = Date.now()
}

// Clear cache
export function clearCache() {
  statsCache.data = {}
  statsCache.lastFetch = null
}

// Fetch all players' stats (batch update)
export async function updateAllPlayersFromESPN(playersData) {
  const updates = playersData.map(player => 
    updatePlayerFromESPN(player.id, player)
  )
  
  const results = await Promise.allSettled(updates)
  
  const updatedPlayers = playersData.map((player, index) => {
    const result = results[index]
    if (result.status === 'fulfilled' && result.value) {
      return result.value
    }
    return player // Return original if update failed
  })
  
  return updatedPlayers
}

