require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios')
const { Videogame, Genre } = require('../db');
const { Op } = require('sequelize')

// OBTENER TODOS LOS JUEGOS

const getAllGames = async () => {
    const gamesDB =  await Videogame.findAll({
        where:{created: true},
        include: [{ model: Genre }]
    })
    const datos = [];

    for (let pagina = 1; pagina <= 5; pagina++) {
        const gamesApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${pagina}`)
        .then(response => response.data.results)
        datos.push(...gamesApi); //aqui uso spread operator para que añada uno a uno los resultados y no un array completo
    }
    
    const atributosNecesariosApi = datos?.map(game => {
        return{
            id: game.id,
            name: game.name,
            image: game.background_image,
            releaseDate: game.released,
            rating: game.rating,
            created: false,
            genres: game.genres.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name,
                    image: genre.image_background
                }
            })
        }
    })

    return [...gamesDB, ...atributosNecesariosApi]
}

// OBTENER JUEGO POR ID

const getGamesById = async (id, idType) => {
    const game =
        idType === "api" 
        ? await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                .then(response => response.data)
        : await Videogame.findByPk(id, {
            include: [{ model: Genre }] // Incluir la relación con el modelo Genre
          })
    return game
}

// OBTENER JUEGO POR NAME

const getGamesByName = async (name) => {
    const gamesDB = await Videogame.findAll({
        where:{
            name:{                     //Op.iLike es realiza una comparación de tipo "ilike" (insensible a mayúsculas y minúsculas) en la base de datos
                [Op.iLike]:`%${name}%` //es un patrón de búsqueda que se utiliza para buscar cualquier registro que contenga la cadena "name" en cualquier posición
            }
        },
        include: [{ model: Genre }]
    })

    const gamesApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
    .then(response => response.data.results)

    const atributosNecesariosApi = gamesApi?.map(game => {
        return{
            id: game.id,
            name: game.name,
            image: game.background_image,
            releaseDate: game.released,
            rating: game.rating,
            created: false,
            genres: game.genres.map(genre => {
                return {
                    id: genre.id,
                    name: genre.name,
                    image: genre.image_background
                }
            })
        }
    })
    
    const games = [...gamesDB, ...atributosNecesariosApi]

    if (games.length === 0){
        throw new Error('No existen juegos con ese nombre')
    }else{
        return games.slice(0, 15)
    }
}

// POSTEAR UN JUEGO

const createGames = async (name, description, plataforms, image, releaseDate, rating, genres) => {
    const juegoCreado = await Videogame.create({name, description, plataforms, image, releaseDate, rating})

    const generos = await Genre.findAll({
        where: {
          id: genres
        }
    })
    
    await juegoCreado.addGenres(generos)
}


module.exports = { getAllGames,  getGamesById, getGamesByName, createGames};