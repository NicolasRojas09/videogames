require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios')
const { Genre } = require('../db')


const getAllGenres = async () => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(response => response.data.results)
    
    const genresMapeado = genresApi?.map(genre => {
        return {
            id: genre.id,
            name: genre.name,
            image: genre.image_background
        }
    })

    const count = await Genre.count()
    if (count === 0){
        await Genre.bulkCreate(genresMapeado)
    }

    return genresMapeado
}

module.exports = { getAllGenres }