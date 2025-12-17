// Player Stats Service
// Fetches and caches player statistics from external APIs

// Cache for player stats (in-memory, resets on page reload)
const statsCache = {
  data: null,
  lastFetch: null,
  cacheDuration: 5 * 60 * 1000, // 5 minutes
}

// Get current NFL season year
const getCurrentSeason = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  // NFL season runs from September to February
  return month <= 2 ? year - 1 : year
}

// Fetch player info from ESPN API (includes team, number, etc.)
async function fetchPlayerInfo(espnId) {
  const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/${espnId}`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching player info for ${espnId}:`, error)
    return null
  }
}

// Fetch player stats from ESPN API
async function fetchPlayerStats(espnId) {
  const season = getCurrentSeason()
  const url = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${season}/types/2/athletes/${espnId}/statistics`
  
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching stats for ${espnId}:`, error)
    return null
  }
}

// Map ESPN player data to our format
function mapESPNToPlayerData(espnInfo, espnStats, playerId, defaultPlayer) {
  if (!espnInfo || !espnStats) return null

  const mapped = {
    ...defaultPlayer,
    stats: defaultPlayer.stats // Keep default stats structure
  }

  // Update team, number, position from ESPN
  if (espnInfo.position?.abbreviation) {
    mapped.position = espnInfo.position.abbreviation
  }
  
  if (espnInfo.jersey) {
    mapped.number = espnInfo.jersey.toString()
  }

  // Update stats if available (this depends on ESPN's response structure)
  // Note: ESPN's API structure can be complex, so this is a placeholder
  // You may need to adjust based on the actual response format
  
  return mapped
}

// Main function to fetch and update player data
export async function updatePlayerFromAPI(playerId, defaultPlayer, espnAthleteId) {
  try {
    const [info, stats] = await Promise.all([
      fetchPlayerInfo(espnAthleteId),
      fetchPlayerStats(espnAthleteId)
    ])

    if (info || stats) {
      return mapESPNToPlayerData(info, stats, playerId, defaultPlayer)
    }
    
    return null
  } catch (error) {
    console.error(`Error updating player ${playerId}:`, error)
    return null
  }
}

// Check if cache is still valid
function isCacheValid() {
  if (!statsCache.data || !statsCache.lastFetch) {
    return false
  }
  
  const now = Date.now()
  return (now - statsCache.lastFetch) < statsCache.cacheDuration
}

// Get cached stats or fetch new ones
export async function getCachedStats() {
  if (isCacheValid()) {
    return statsCache.data
  }
  
  // Cache expired or doesn't exist, return null to trigger refresh
  return null
}

// Set cached stats
export function setCachedStats(data) {
  statsCache.data = data
  statsCache.lastFetch = Date.now()
}

// Clear cache (useful for manual refresh)
export function clearCache() {
  statsCache.data = null
  statsCache.lastFetch = null
}

