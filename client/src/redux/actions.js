import { GET_GAMES, SEARCH_GAMES, ORDER } from "./action-types";
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