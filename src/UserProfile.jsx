import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Feed from './components/Feed'
import { feedData } from './data/feedData'
import back from './assets/Icons/Back Icon.png'
import settings from './assets/Icons/Settings Icon.png'

// Pix questions data array
const pixQuestions = [
    {
        id: 1,
        question: 'Will CIN beat BAL?',
        points: '+1 pts'
    },
    {
        id: 2,
        question: 'Will BUF score more than 17 pts?',
        points: '+1 pts'
    },
    {
        id: 3,
        question: 'Will J.Chase(WR) record 80+ total yards?',
        points: '+2 pts'
    },
    {
        id: 4,
        question: 'Will G.Smith(LV) throw at least 1 int?',
        points: '+2 pts'
    },
    {
        id: 5,
        question: 'Will S.Sanders(CLE) pass 160+ yards?',
        points: '+2 pts'
    },
    {
        id: 6,
        question: 'How many total clicks will G.Pickens\' highlights receive?',
        points: '+5 pts',
        buttonText: {
            yes: 'Over 60k',
            no: 'Under 60k'
        }
    }
]

// Reusable PixQuestion component
function PixQuestion({ question, points, buttonText, isLast, selectedAnswer, onAnswerChange }) {
    
    // Default button text if not provided
    const yesText = buttonText?.yes || 'Yes'
    const noText = buttonText?.no || 'No'
    
    const handleYesClick = () => {
        if (selectedAnswer === 'yes') {
            onAnswerChange(null) // Unselect if already selected
        } else {
            onAnswerChange('yes')
        }
    }
    
    const handleNoClick = () => {
        if (selectedAnswer === 'no') {
            onAnswerChange(null) // Unselect if already selected
        } else {
            onAnswerChange('no')
        }
    }
    
    // Get styles for Yes button
    const getYesButtonStyle = () => {
        const baseStyle = {
            display: 'flex',
            width: '167px',
            height: '50px',
            padding: '20px 48px',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '150%',
            letterSpacing: '0.07px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: '"Aktiv Grotesk Trial", sans-serif',
            color: '#FFFFFF'
        }
        
        if (selectedAnswer === 'yes') {
            return {
                ...baseStyle,
                justifyContent: 'space-between',
                borderRadius: '10px 0 0 10px',
                background: 'linear-gradient(270deg, #1A1A1A 0%, #118E80 100%)',
                color: '#5AFFE7'
            }
        } else {
            return {
                ...baseStyle,
                justifyContent: 'flex-start',
                borderRadius: '10px 0 0 10px',
                background: '#1A1A1A',
                color: selectedAnswer === null ? '#FFFFFF' : '#808080'
            }
        }
    }
    
    // Get styles for No button
    const getNoButtonStyle = () => {
        const baseStyle = {
            display: 'flex',
            width: '167px',
            height: '50px',
            padding: '20px 48px',
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '150%',
            letterSpacing: '0.07px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: '"Aktiv Grotesk Trial", sans-serif',
            color: '#FFFFFF'
        }
        
        if (selectedAnswer === 'no') {
            return {
                ...baseStyle,
                borderRadius: '0 10px 10px 0',
                background: 'linear-gradient(90deg, #1A1A1A 0%, #118E80 100%)',
                color: '#5AFFE7'
            }
        } else {
            return {
                ...baseStyle,
                gap: '164px',
                borderRadius: '0 10px 10px 0',
                background: '#1A1A1A',
                color: selectedAnswer === null ? '#FFFFFF' : '#808080'
            }
        }
    }
    
    // Parse question to extract team names and player names, making them bold
    // Excludes anything in parentheses
    const parseQuestion = (text) => {
        const parts = []
        let lastIndex = 0
        
        // First, find all parentheses sections and mark them as non-bold
        const parenthesesRanges = []
        const parenRegex = /\([^)]+\)/g
        let parenMatch
        while ((parenMatch = parenRegex.exec(text)) !== null) {
            parenthesesRanges.push({ start: parenMatch.index, end: parenRegex.lastIndex })
        }
        
        // Helper function to check if a position is inside parentheses
        const isInParentheses = (index) => {
            return parenthesesRanges.some(range => index >= range.start && index < range.end)
        }
        
        // Find all matches for team codes (2-4 uppercase letters) and player names (Capital.Letter format)
        // Team codes: 2-4 consecutive uppercase letters
        // Player names: Capital letter, period, Capital letter(s), optional lowercase letters
        const allMatches = []
        
        // Find team codes (2-4 uppercase letters as word boundaries)
        const teamRegex = /\b([A-Z]{2,4})\b/g
        let teamMatch
        while ((teamMatch = teamRegex.exec(text)) !== null) {
            if (!isInParentheses(teamMatch.index)) {
                allMatches.push({
                    index: teamMatch.index,
                    end: teamRegex.lastIndex,
                    text: teamMatch[1],
                    type: 'team'
                })
            }
        }
        
        // Find player names (pattern: Capital.Letter format like J.Chase, C.Lamb)
        const playerRegex = /\b([A-Z]\.[A-Z][a-z]+)\b/g
        let playerMatch
        while ((playerMatch = playerRegex.exec(text)) !== null) {
            if (!isInParentheses(playerMatch.index)) {
                allMatches.push({
                    index: playerMatch.index,
                    end: playerRegex.lastIndex,
                    text: playerMatch[1],
                    type: 'player'
                })
            }
        }
        
        // Sort matches by index
        allMatches.sort((a, b) => a.index - b.index)
        
        // Build parts array
        for (const match of allMatches) {
            // Add text before this match
            if (match.index > lastIndex) {
                const beforeText = text.substring(lastIndex, match.index)
                parts.push({ text: beforeText, bold: false })
            }
            // Add the match as bold
            parts.push({ text: match.text, bold: true })
            lastIndex = match.end
        }
        
        // Add remaining text
        if (lastIndex < text.length) {
            parts.push({ text: text.substring(lastIndex), bold: false })
        }
        
        // If no matches found, return the whole text as non-bold
        if (parts.length === 0) {
            parts.push({ text, bold: false })
        }
        
        return parts
    }
    
    const questionParts = parseQuestion(question)
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'start', alignItems: 'start'}}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'start', alignItems: 'start'}}>
                <p style={{ fontSize: '16px', fontWeight: '400', lineHeight: '130%', letterSpacing: '0.096px', color: '#FFFFFF', textAlign: isLast ? 'left' : undefined }}>
                    {questionParts.map((part, index) => 
                        part.bold ? (
                            <b key={index} style={{ color: '#FFFFFF', fontWeight: '600' }}>{part.text}</b>
                        ) : (
                            <span key={index}>{part.text}</span>
                        )
                    )}
                </p>
                <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '150%', letterSpacing: '0.07px', color: '#5AFFE7' }}>{points}</p>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center'}}>
                <button 
                    type='button' 
                    onClick={handleYesClick}
                    style={getYesButtonStyle()}
                >
                    {yesText}
                </button>
                <button 
                    type='button' 
                    onClick={handleNoClick}
                    style={getNoButtonStyle()}
                >
                    {noText}
                </button>
            </div>
        </div>
    )
}

export default function UserProfile() {
    const navigate = useNavigate()
    const username = localStorage.getItem('username') || 'username'
    
    // Load saved pix selections from localStorage
    const getSavedPixSelections = () => {
        const saved = localStorage.getItem('pixSelections')
        return saved ? JSON.parse(saved) : {}
    }
    
    // Initialize state with saved selections
    const [pixSelections, setPixSelections] = useState(() => getSavedPixSelections())
    
    // Save selections to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('pixSelections', JSON.stringify(pixSelections))
    }, [pixSelections])
    
    // Handle answer change for a specific pix question
    const handlePixAnswerChange = (pixId, answer) => {
        setPixSelections(prev => ({
            ...prev,
            [pixId]: answer
        }))
    }
    
    const handleBackClick = () => {
        navigate(-1) // Go back to previous page in browser history
    }
    
    return (
        <div className="App">
            <header className="App-header" style={{ paddingTop: `120px`}}>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '393px',
                    zIndex: 100,
                    pointerEvents: 'none'
                }}>
                    <div className='header' style={{ pointerEvents: 'auto' }}>
                        <div
                            onClick={handleBackClick}
                            style={{
                                width: '25px',
                                height: '25px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                pointerEvents: 'auto'
                            }}
                        >
                            <img src={back} style={{ width: '25px', height: '25px', pointerEvents: 'none' }} alt='back' />
                        </div>
                        <div style={{width: '25px', height: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={settings} style={{ width: '25px', height: '25px' }} alt='settings' />
                        </div>
                    </div>
                </div>
                <div className='username'><p>@ {username}</p></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'start', alignItems: 'start', width: '333px', alignSelf: 'start', margin: '0px 30px 21px 30px'}}>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'start', alignItems: 'start'}}>
                        <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3' }}>Member since </p>
                        <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF' }}>October 2025</p>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'start', alignItems: 'start'}}>
                        <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3' }}>Following </p>
                        <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#FFFFFF' }}>17 players 2 teams</p>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'start', alignItems: 'start'}}>
                        <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#B3B3B3' }}>2025 Pix </p>
                        <p style={{ fontSize: '12px', fontWeight: '600', lineHeight: '140%', letterSpacing: '0.12px', color: '#5AFFE7' }}>330 pts</p>
                    </div>
                </div>
                <div style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0.06%, #000 1.94%)', paddingTop: '20px'}}>
                    <div style={{ display: 'flex', height: '122px', padding: '24px 30px', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', alignSelf: 'stretch', borderRadius: '20px', backgroundColor: '#0D0D0D'}}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'start', alignItems: 'start'}}>
                            <p style={{ fontSize: '18px', fontWeight: '600', lineHeight: '120%', color: '#B3B3B3' }}>Week 14 Results</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', lineHeight: '150%', letterSpacing: '0.07px', color: '#5AFFE7' }}>+14 pts</p>
                        </div>
                        <p style={{ fontSize: '10px', fontWeight: '400', lineHeight: '140%', letterSpacing: '0.1px', color: '#B3B3B3' }}>Tap for details</p>
                    </div>
                    <div style={{ display: 'flex', padding: '30px 30px', flexDirection: 'column', alignItems: 'flex-start', gap: '30px', alignSelf: 'stretch', borderRadius: '20px', backgroundColor: '#0D0D0D', marginTop: '15px'}}>
                        <p style={{ fontSize: '18px', fontWeight: '600', lineHeight: '120%', color: '#B3B3B3' }}>Week 15 Pix</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'start', alignItems: 'start', width: '100%'}}>
                            {pixQuestions.map((pix, index) => (
                                <PixQuestion 
                                    key={pix.id}
                                    question={pix.question}
                                    points={pix.points}
                                    buttonText={pix.buttonText}
                                    isLast={index === pixQuestions.length - 1}
                                    selectedAnswer={pixSelections[pix.id] || null}
                                    onAnswerChange={(answer) => handlePixAnswerChange(pix.id, answer)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ alignItems: 'center', position: 'fixed', marginBottom: '20px', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, '-webkit-transform': 'translateX(-50%)'}}>
                    <button type='button' className='Log-button' onClick={() => navigate('/leaderboard')}>Leaderboard</button>
                </div>
            </header>
        </div>
    )
}
