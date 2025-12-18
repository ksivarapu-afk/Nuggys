import React, { useState, useEffect } from 'react';
import jTaylor from '../assets/Player_IDs/J_Taylor.png';
import jSmithNjigba from '../assets/Player_IDs/J_Smith-Njigba.png';
import { playersData } from '../data/playersData';
import search from '../assets/Icons/Search Icon.png'
import BUF from '../assets/Team_IDs/BUF_Bills.png'
import CIN from '../assets/Team_IDs/CIN_Bengals.png'
import PHI from '../assets/Team_IDs/PHI_Eagles.png'
import SF from '../assets/Team_IDs/SF_49ers.png'

export default function FollowPlayersStep({ onSelection, currentSelection }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('player'); // 'player' or 'team'
    // Initial players that can be cleared
    const [displayedItems, setDisplayedItems] = useState([
        { type: 'player', id: 'jonathon-taylor', name: "J. Taylor", team: "IND", number: 28, image: jTaylor },
        { type: 'player', id: 'jaxon-smith-njigba', name: "J. Smith-Njigba", team: "SEA", number: 11, image: jSmithNjigba },
    ]); // Max 2 items total
    
    // Team data
    const teamData = [
        { type: 'team', id: 'BUF', name: 'BUF Bills', teamID: 'BUF', division: 'AFC East', conference: 'AFC', image: BUF },
        { type: 'team', id: 'CIN', name: 'CIN Bengals', teamID: 'CIN', division: 'AFC North', conference: 'AFC', image: CIN },
        { type: 'team', id: 'PHI', name: 'PHI Eagles', teamID: 'PHI', division: 'NFC East', conference: 'NFC', image: PHI },
        { type: 'team', id: 'SF', name: 'SF 49ers', teamID: 'SF', division: 'NFC West', conference: 'NFC', image: SF },
    ]

    // Convert currentSelection to array if it's not already (needed for useEffect)
    const selectedIndices = Array.isArray(currentSelection) ? currentSelection : (currentSelection !== null && currentSelection !== undefined ? [currentSelection] : []);
    const baseOffset = 2; // Offset by 2 (search bar and filter buttons)

    // Initialize followedPlayers and followedTeams to empty array (default to none) when component mounts
    useEffect(() => {
        // Clear followed players and teams on mount to start fresh (default to none)
        localStorage.setItem('followedPlayers', JSON.stringify([]))
        localStorage.setItem('followedTeams', JSON.stringify([]))
        window.dispatchEvent(new CustomEvent('followedPlayersChanged'))
        window.dispatchEvent(new CustomEvent('followedTeamsChanged'))
    }, [])

    // Reset displayed items when filter changes (but keep selected items if they match the filter)
    useEffect(() => {
        setDisplayedItems(prev => {
            // Keep only items that match the current filter and are selected
            const filtered = prev.filter(item => {
                if (filter === 'player') {
                    return item.type === 'player'
                } else if (filter === 'team') {
                    return item.type === 'team'
                }
                return true // Show all if no specific filter
            })
            
            // If no items match, reset to initial state based on filter
            if (filtered.length === 0) {
                if (filter === 'player') {
                    return [
                        { type: 'player', id: 'jonathon-taylor', name: "J. Taylor", team: "IND", number: 28, image: jTaylor },
                        { type: 'player', id: 'jaxon-smith-njigba', name: "J. Smith-Njigba", team: "SEA", number: 11, image: jSmithNjigba },
                    ]
                } else if (filter === 'team') {
                    // Auto-populate with first 2 teams when team filter is first selected
                    return teamData.slice(0, 2)
                }
            }
            
            return filtered
        })
    }, [filter])

    // Helper function to get followed players from localStorage
    const getFollowedPlayers = () => {
        const stored = localStorage.getItem('followedPlayers')
        return stored ? JSON.parse(stored) : []
    }

    // Helper function to get followed teams from localStorage
    const getFollowedTeams = () => {
        const stored = localStorage.getItem('followedTeams')
        return stored ? JSON.parse(stored) : []
    }

    // Helper function to update followed players in localStorage
    const updateFollowedPlayers = (playerIds) => {
        localStorage.setItem('followedPlayers', JSON.stringify(playerIds))
        window.dispatchEvent(new CustomEvent('followedPlayersChanged'))
    }

    // Helper function to update followed teams in localStorage
    const updateFollowedTeams = (teamIds) => {
        localStorage.setItem('followedTeams', JSON.stringify(teamIds))
        window.dispatchEvent(new CustomEvent('followedTeamsChanged'))
    }

    // Calculate match score for search relevance (higher = better match)
    const getMatchScore = (item, query, type) => {
        const queryLower = query.toLowerCase()
        
        if (type === 'player') {
            const fullNameLower = item.fullName.toLowerCase()
            const displayNameLower = item.displayName.toLowerCase()
            const teamLower = item.team.toLowerCase()
            
            // Exact match gets highest score
            if (fullNameLower === queryLower || displayNameLower === queryLower) {
                return 100
            }
            // Starts with gets high score
            if (fullNameLower.startsWith(queryLower) || displayNameLower.startsWith(queryLower)) {
                return 80
            }
            // Contains gets lower score
            if (fullNameLower.includes(queryLower) || displayNameLower.includes(queryLower)) {
                return 60
            }
            // Team match gets even lower score
            if (teamLower.includes(queryLower)) {
                return 40
            }
        } else if (type === 'team') {
            const nameLower = item.name.toLowerCase()
            const teamIDLower = item.teamID.toLowerCase()
            const divisionLower = item.division.toLowerCase()
            
            // Exact match gets highest score
            if (nameLower === queryLower || teamIDLower === queryLower) {
                return 100
            }
            // Starts with gets high score
            if (nameLower.startsWith(queryLower) || teamIDLower.startsWith(queryLower)) {
                return 80
            }
            // Contains gets lower score
            if (nameLower.includes(queryLower) || teamIDLower.includes(queryLower)) {
                return 60
            }
            // Division match gets even lower score
            if (divisionLower.includes(queryLower)) {
                return 40
            }
        }
        return 0
    }

    // When search query changes, check if it matches a player or team
    useEffect(() => {
        if (searchQuery.trim()) {
            // Find all matching items based on current filter
            let matchingItems = []
            
            if (filter === 'player') {
                matchingItems = playersData
                    .map(player => ({
                        item: { type: 'player', id: player.id, name: player.displayName, team: player.team, number: player.number, image: player.profilePhoto },
                        score: getMatchScore(player, searchQuery, 'player')
                    }))
                    .filter(({ score }) => score > 0)
                    .sort((a, b) => b.score - a.score)
                    .map(({ item }) => item)
            } else if (filter === 'team') {
                matchingItems = teamData
                    .map(team => ({
                        item: team,
                        score: getMatchScore(team, searchQuery, 'team')
                    }))
                    .filter(({ score }) => score > 0)
                    .sort((a, b) => b.score - a.score)
                    .map(({ item }) => item)
            } else {
                // Search both players and teams
                const matchingPlayers = playersData
                    .map(player => ({
                        item: { type: 'player', id: player.id, name: player.displayName, team: player.team, number: player.number, image: player.profilePhoto },
                        score: getMatchScore(player, searchQuery, 'player')
                    }))
                    .filter(({ score }) => score > 0)
                
                const matchingTeams = teamData
                    .map(team => ({
                        item: team,
                        score: getMatchScore(team, searchQuery, 'team')
                    }))
                    .filter(({ score }) => score > 0)
                
                matchingItems = [...matchingPlayers, ...matchingTeams]
                    .sort((a, b) => b.score - a.score)
                    .map(({ item }) => item)
            }

            if (matchingItems.length > 0) {
                const bestMatch = matchingItems[0] // Closest match
                
                setDisplayedItems(prev => {
                    // Check if item is already in the list
                    const isAlreadyAdded = prev.some(p => p.id === bestMatch.id && p.type === bestMatch.type);
                    
                    if (isAlreadyAdded) {
                        return prev; // Don't add duplicates
                    }
                    
                    // Create a map of locked positions (selected items stay in their positions)
                    const lockedPositions = new Map()
                    prev.forEach((item, idx) => {
                        const optionIndex = idx + baseOffset
                        if (selectedIndices.includes(optionIndex)) {
                            lockedPositions.set(idx, item) // Lock this position with this item
                        }
                    })
                    
                    // Get selected item IDs
                    const selectedItemIds = Array.from(lockedPositions.values()).map(p => `${p.type}-${p.id}`)
                    
                    // Get non-selected items (excluding locked ones)
                    const nonSelectedItems = prev
                        .filter(p => !selectedItemIds.includes(`${p.type}-${p.id}`))
                    
                    // Add new item to non-selected list
                    const newNonSelected = [...nonSelectedItems, bestMatch];
                    
                    // Keep only the most recent non-selected items (max slots available)
                    const availableSlots = 2 - lockedPositions.size
                    const keptNonSelected = newNonSelected.slice(-Math.max(0, availableSlots))
                    
                    // Reconstruct array: locked positions stay, fill remaining with non-selected
                    const result = []
                    let nonSelectedIdx = 0
                    
                    for (let i = 0; i < 2; i++) {
                        if (lockedPositions.has(i)) {
                            // This position is locked, keep the selected item
                            result[i] = lockedPositions.get(i)
                        } else if (nonSelectedIdx < keptNonSelected.length) {
                            // This position is free, fill with non-selected item
                            result[i] = keptNonSelected[nonSelectedIdx++]
                        }
                    }
                    
                    return result.filter(Boolean).slice(0, 2) // Remove undefined and limit to 2
                });
            }
        }
        // Don't reset when search is cleared - keep current displayed items
    }, [searchQuery, selectedIndices, filter]);

    const skipButtonIndex = displayedItems.length + 2;
    const isSkipSelected = selectedIndices.includes(skipButtonIndex);

    const handleItemClick = (idx) => {
        // Get the item that was clicked
        const itemIndex = idx - baseOffset
        const clickedItem = displayedItems[itemIndex]
        
        if (!clickedItem) return
        
        // Toggle item selection (multiple allowed)
        const isCurrentlySelected = selectedIndices.includes(idx)
        const newSelections = isCurrentlySelected
            ? selectedIndices.filter(i => i !== idx && i !== skipButtonIndex) // Remove this item, also remove skip if selected
            : [...selectedIndices.filter(i => i !== skipButtonIndex), idx]; // Add this item, remove skip if selected
        
        // Update localStorage with followed players or teams
        if (clickedItem.type === 'player') {
            const followedPlayers = getFollowedPlayers()
            if (isCurrentlySelected) {
                // Remove from followed players
                const updated = followedPlayers.filter(id => id !== clickedItem.id)
                updateFollowedPlayers(updated)
            } else {
                // Add to followed players
                if (!followedPlayers.includes(clickedItem.id)) {
                    const updated = [...followedPlayers, clickedItem.id]
                    updateFollowedPlayers(updated)
                }
            }
        } else if (clickedItem.type === 'team') {
            const followedTeams = getFollowedTeams()
            if (isCurrentlySelected) {
                // Remove from followed teams
                const updated = followedTeams.filter(id => id !== clickedItem.teamID)
                updateFollowedTeams(updated)
            } else {
                // Add to followed teams
                if (!followedTeams.includes(clickedItem.teamID)) {
                    const updated = [...followedTeams, clickedItem.teamID]
                    updateFollowedTeams(updated)
                }
            }
        }
        
        onSelection(newSelections.length > 0 ? newSelections : null);
    };

    const handleSkipClick = () => {
        // Single selection for skip button - replaces all selections
        // Clear all followed players and teams when skipping
        updateFollowedPlayers([])
        updateFollowedTeams([])
        onSelection(skipButtonIndex);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '393px', alignItems: 'center', marginTop: '32px', position: 'relative', zIndex: 2 }}>
            {/* Search bar */}
            <div className='search-bar'>
                <img src={search} alt="search" className='search-icon'/>
                <input 
                    type="text" 
                    placeholder="Search a player or team" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='search-input'
                />
            </div>
            
            {/* Filter buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '42px', width: '333px' }}>
                <button
                    type="button"
                    onClick={() => setFilter('player')}
                    style={{
                        height: '40px',
                        backgroundColor: 'transparent',
                        color: filter === 'player' ? '#5AFFE7' : '#B3B3B3',
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: '140%',
                        letterSpacing: '0.12px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    Player
                </button>
                <button
                    type="button"
                    onClick={() => setFilter('team')}
                    style={{
                        height: '40px',
                        backgroundColor: 'transparent',
                        color: filter === 'team' ? '#5AFFE7' : '#B3B3B3',
                        fontSize: '12px',
                        fontWeight: 600,
                        lineHeight: '140%',
                        letterSpacing: '0.12px',
                        textAlign: 'center',
                        cursor: 'pointer'
                    }}
                >
                    Team
                </button>
            </div>

            {/* Player/Team list */}
            {displayedItems.map((item, idx) => {
                const optionIdx = idx + 2; // Offset by 2 (search bar and filter buttons)
                const isSelected = selectedIndices.includes(optionIdx);
                
                return (
                    <button
                        key={`${item.type}-${item.id}`}
                        type="button"
                        className={isSelected ? (item.type === 'team' ? "team-result-active" : "player-result-active") : (item.type === 'team' ? "team-result" : "player-result")}
                        onClick={() => handleItemClick(optionIdx)}
                        style={{ position: 'relative', zIndex: 2, width: '333px'}}
                    >
                        {item.image && (
                            <img 
                                src={item.image} 
                                alt={item.name}
                                className={item.type === 'team' ? "team-icon" : "player-icon"}
                            />
                        )}
                        <span style={{display: 'flex', gap: '35px', width: '197px', justifyContent: 'space-between', alignItems: 'end'}}>
                            <p style={{fontSize: '16px', fontWeight: 400, lineHeight: '130%', letterSpacing: '0.096px', color: '#FFFFFF'}}>{item.name}</p> 
                            {item.type === 'player' ? (
                                <div style={{display: 'flex', gap: '7px'}}>
                                    <p style={{fontSize: '12px', fontWeight: 400, lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3'}}>{item.team}</p>
                                    <p style={{fontSize: '12px', fontWeight: 400, lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3'}}>{item.number}</p>
                                </div>
                            ) : (
                                <div style={{display: 'flex', gap: '7px'}}>
                                    <p style={{fontSize: '12px', fontWeight: 400, lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3'}}>{item.division}</p>
                                </div>
                            )}
                        </span>
                    </button>
                );
            })}

            {/* Skip option */}
            <button
                type="button"
                className={isSkipSelected ? "selection-button-active" : "selection-button"}
                onClick={handleSkipClick}
                style={{ position: 'relative', zIndex: 2 }}
            >
                Skip for now
            </button>
        </div>
    );
}

