const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getVideoGamesHandler, 
        getVideoGamesByIdHandler, 
        getVideoGamesByNameHandler,
        postVideoGameHandler } = require('../handlers/videogamesHandlers')
const { getGenresHandler } = require('../handlers/genresHandlers')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideoGamesHandler)
router.get('/videogames/name', getVideoGamesByNameHandler)
router.get('/videogames/:id', getVideoGamesByIdHandler)
router.post('/videogames', postVideoGameHandler)

router.get('/genres', getGenresHandler)

module.exports = router;
