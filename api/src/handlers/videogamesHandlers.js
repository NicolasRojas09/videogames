const { getAllGames, getGamesById, getGamesByName, createGames } = require('../controllers/videogamesControllers')

const getVideoGamesHandler = async (req, res) => {

    try {
        const response = await getAllGames()
        res.status(200).json(response)   
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getVideoGamesByIdHandler = async (req, res) => {
    const { id } = req.params
    const idType = isNaN(id) ? "database" : "api" ; // pregunto cual es el tipo de dato asi se si usar la db o los datos de la api

    try {
        const response = await getGamesById(id, idType)
        res.status(200).json(response)   
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getVideoGamesByNameHandler = async (req, res) => {
    const { name } = req.query
    
    try {
        const response = await getGamesByName(name)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postVideoGameHandler = async (req, res) => {
    const { name, description, plataforms, image, releaseDate, rating, genres } = req.body

    try {
        const response = await createGames(name, description, plataforms, image, releaseDate, rating, genres)
        res.status(200).json(response)   
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { getVideoGamesHandler, 
                   getVideoGamesByIdHandler, 
                   getVideoGamesByNameHandler, 
                   postVideoGameHandler };