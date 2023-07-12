import { GET_GAMES, SEARCH_GAMES, ORDER } from "./action-types"


const initialState = {
    games: [],
    allGames: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
            }
        
        case SEARCH_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
            }
            
        case ORDER:
            const allGamesCopy = [...state.allGames]
            return {
                ...state,
                games: action.payload === 'AA' ? allGamesCopy.sort((a,b) => a.name.localeCompare(b.name))
                : action.payload === 'AD' ? allGamesCopy.sort((a,b) => b.name.localeCompare(a.name))
                : action.payload === 'RA' ? allGamesCopy.sort((a,b) => a.rating - b.rating)
                : allGamesCopy.sort((a,b) => b.rating - a.rating)
            }
        default:
            return {...state}
    }
}

export default reducer