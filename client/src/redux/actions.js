import { GET_GAMES, SEARCH_GAMES, ORDER, FILTER, PAGES } from "./action-types";
import axios from 'axios'

export const getGames = () => {
    return function(dispatch) {
        axios('http://localhost:3001/videogames')
        .then(response => response.data)
        .then(data => dispatch({type: GET_GAMES, payload: data}))
    }
}

export const searchGames = (name) => {
    return function(dispatch) {
        axios(`http://localhost:3001/videogames/name?name=${name}`)
        .then(response => response.data)
        .then(data => dispatch({type: SEARCH_GAMES, payload: data}))
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