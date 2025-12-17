// React hook to fetch and manage player stats from ESPN
import { useState, useEffect, useCallback } from 'react'
import { updatePlayerFromESPN, getCachedPlayer, setCachedPlayer } from '../services/nflStatsService'

export function usePlayerStats(playerId, defaultPlayer) {
  const [player, setPlayer] = useState(defaultPlayer)
  const [loading, setLoading] = useState(true) // Start with loading true
  const [error, setError] = useState(null)

  const fetchPlayerStats = useCallback(async () => {
    if (!playerId || !defaultPlayer) {
      setLoading(false)
      return
    }

    // Check cache first
    const cached = getCachedPlayer(playerId)
    if (cached) {
      console.log(`Using cached stats for ${playerId}`)
      setPlayer(cached)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    console.log(`Fetching live stats for player: ${playerId}`)

    try {
      const updatedPlayer = await updatePlayerFromESPN(playerId, defaultPlayer)
      
      if (updatedPlayer && updatedPlayer.stats) {
        console.log(`Successfully updated stats for ${playerId}:`, updatedPlayer.stats)
        setCachedPlayer(playerId, updatedPlayer)
        setPlayer(updatedPlayer)
      } else {
        // If update failed, use default player but log it
        console.warn(`Failed to fetch live stats for ${playerId}, using default stats`)
        setPlayer(defaultPlayer)
      }
    } catch (err) {
      console.error('Error fetching player stats:', err)
      setError(err.message)
      setPlayer(defaultPlayer) // Fallback to default
    } finally {
      setLoading(false)
    }
  }, [playerId, defaultPlayer])

  useEffect(() => {
    if (playerId && defaultPlayer) {
      fetchPlayerStats()
    } else {
      setLoading(false)
    }
  }, [playerId, fetchPlayerStats])

  return {
    player,
    loading,
    error,
    refetch: fetchPlayerStats,
  }
}

// Hook to fetch all players' stats
export function useAllPlayerStats(playersData) {
  const [players, setPlayers] = useState(playersData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAllStats = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const { updateAllPlayersFromESPN } = await import('../services/nflStatsService')
      const updatedPlayers = await updateAllPlayersFromESPN(playersData)
      setPlayers(updatedPlayers)
    } catch (err) {
      console.error('Error fetching all player stats:', err)
      setError(err.message)
      setPlayers(playersData) // Fallback to default
    } finally {
      setLoading(false)
    }
  }, [playersData])

  useEffect(() => {
    fetchAllStats()
  }, []) // Only fetch once on mount

  return {
    players,
    loading,
    error,
    refetch: fetchAllStats,
  }
}

