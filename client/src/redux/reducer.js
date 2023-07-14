import { GET_GAMES, SEARCH_GAMES, ORDER, FILTER, PAGES } from "./action-types"


const initialState = {
    games: [],
    allGames: [],
    originalOrder: [],
    currentPage: 1,
    totalJuegos: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload,
                originalOrder: action.payload,
                totalJuegos: action.payload.length,
            }
        
        case SEARCH_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload,
                originalOrder: action.payload,
                totalJuegos: action.payload.length,
            }
            
        case ORDER:
            const gamesCopy = [...state.games]
            console.log(gamesCopy);
            return {
                ...state,
                games: action.payload === 'AA' ? gamesCopy.sort((a,b) => a.name.localeCompare(b.name))
                : action.payload === 'AD' ? gamesCopy.sort((a,b) => b.name.localeCompare(a.name))
                : action.payload === 'RA' ? gamesCopy.sort((a,b) => a.rating - b.rating)
                : action.payload === 'RD' ? gamesCopy.sort((a,b) => b.rating - a.rating)
                : [...state.originalOrder]
            }

        case FILTER:
            const allGamesFiltered = 
                action.payload === 'created' ? state.allGames.filter(game => 
                    game.created === true)
                : action.payload === 'api' ? state.allGames.filter(game => 
                    game.created === false)
                : action.payload === 'default' ? [...state.allGames]
                : state.allGames.filter(game => {
                    const result = game.genres.find(genre => genre.name === action.payload)
                    return result?.name === action.payload
                })
                    
            console.log(allGamesFiltered)
            return {
                ...state,
                games: allGamesFiltered,
                originalOrder: allGamesFiltered,
                totalJuegos: allGamesFiltered.length
            }
        
        case PAGES:
            console.log(action.payload);
            return {
                ...state,
                currentPage: action.payload
            }

        default:
            return {...state}
    }
}

export default reducer