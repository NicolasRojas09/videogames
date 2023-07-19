import { GET_GAMES, SEARCH_GAMES, ORDER, FILTER, PAGES, OPCION, LOADING } from "./action-types";
import axios from 'axios'

export const getGames = () => {
    return async (dispatch) => {
        try {
            await axios('http://localhost:3001/videogames')
            .then(response => response.data)
            .then(data => dispatch({type: GET_GAMES, payload: data}))
        } catch (error) {
            console.log(error.message);
        }
        
    }
}

export const searchGames = (name) => {
    return async (dispatch) => {
        try {
            await axios(`http://localhost:3001/videogames/name?name=${name}`)
            .then(response => response.data)
            .then(data => dispatch({type: SEARCH_GAMES, payload: data}))
        } catch (error) {
            console.log(error.message);
        }
        
    }
}

export const orderGames = (order) => {
    return { type: ORDER, payload: order }
}

export const filterGames = (valor) => {
    return { type: FILTER, payload: valor }
}

export const pagesGames = (pag) => {
    return { type: PAGES, payload: pag }
}

export const opcionChange = (opcion) => {
    return { type: OPCION, payload: opcion }
}

export const loadingGames = (valor) => {
    return { type: LOADING, payload: valor }
}