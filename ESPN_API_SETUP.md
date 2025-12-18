# ESPN API Integration Setup

This app is configured to fetch live player statistics from ESPN's API. Here's how to set it up and use it.

## Overview

The app uses ESPN's public API endpoints to fetch:
- Player statistics (yards, touchdowns, receptions, etc.)
- Team information
- Jersey numbers
- Health status

## Configuration

### ESPN Athlete IDs

Each player needs to be mapped to their ESPN athlete ID in `src/services/nflStatsService.js`. 

To find a player's ESPN athlete ID:
1. Go to ESPN.com and search for the player
2. Navigate to their profile page
3. Look at the URL or page source to find their athlete ID
4. Update the `ESPN_ATHLETE_IDS` object in `nflStatsService.js`

Example:
```javascript
const ESPN_ATHLETE_IDS = {
  'puka-nacua': '4362628',  // Replace with actual ESPN ID
  'jonathon-taylor': '3918297',
  // ... etc
}
```

### Current Status

The ESPN athlete IDs in the code are placeholders and need to be updated with real IDs from ESPN's website.

## CORS Issues

ESPN's API may have CORS (Cross-Origin Resource Sharing) restrictions that prevent direct browser requests. If you encounter CORS errors:

### Option 1: Use a Backend Proxy (Recommended)

Create a simple backend server that proxies requests to ESPN's API:

```javascript
// Example Express.js proxy server
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/api/espn/athlete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy server running on port 3001'));
```

Then update the fetch URLs in `nflStatsService.js` to point to your proxy:
```javascript
const url = `http://localhost:3001/api/espn/athlete/${athleteId}`
```

### Option 2: Browser Extension/CORS Disabler

For development only, you can use a browser extension to disable CORS restrictions. **Do not use this in production.**

### Option 3: Alternative Sports API

Consider using a sports data API service that provides:
- Official API access
- Better documentation
- CORS support
- Rate limiting

Popular options:
- [SportsDataIO](https://sportsdata.io/)
- [RapidAPI Sports](https://rapidapi.com/api-sports/api/api-nfl)
- [The Odds API](https://the-odds-api.com/)

## How It Works

1. **Data Fetching**: The `nflStatsService.js` service fetches player data from ESPN's API
2. **Caching**: Data is cached for 5 minutes to reduce API calls
3. **Fallback**: If API fails, the app uses static data from `playersData.js`
4. **Hooks**: The `usePlayerStats` hook automatically fetches and updates player data

## Usage in Components

```javascript
import { usePlayerStats } from './hooks/usePlayerStats'

function Profile() {
  const defaultPlayer = getPlayerByName('CeeDee Lamb')
  const { player, loading, error, refetch } = usePlayerStats(
    defaultPlayer.id,
    defaultPlayer
  )
  
  // `player` will have live stats from ESPN (or default if API fails)
  // `loading` indicates if fetch is in progress
  // `refetch()` manually refreshes the data
}
```

## API Endpoints Used

- Player Info: `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/{id}`
- Player Stats: `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/{year}/types/2/athletes/{id}/statistics`

Where:
- `{id}` is the ESPN athlete ID
- `{year}` is the current NFL season year
- `types/2` represents regular season stats

## Notes

- Stats update automatically based on the current NFL season
- Cache duration is 5 minutes (configurable in `nflStatsService.js`)
- The app gracefully falls back to static data if API calls fail
- Player position determines which stats are displayed (WR/TE/RB/QB)

## Troubleshooting

**Issue**: CORS errors in browser console
**Solution**: Set up a backend proxy (see Option 1 above)

**Issue**: Stats not updating
**Solution**: 
- Check that ESPN athlete IDs are correct
- Verify network requests in browser DevTools
- Clear cache: `clearCache()` from `nflStatsService.js`

**Issue**: Wrong stats displayed
**Solution**: Check that player positions match in `playersData.js` and ESPN API response

