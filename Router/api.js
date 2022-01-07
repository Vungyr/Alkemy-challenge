const router = require('express').Router();

const PeliculasRouter = require('./movies/peliculas');
const PersonajesRouter = require('./characters/personajes');
const GeneroRouter = require('./genero/genero');
const UserRouter = require('./auth/registro');
const middlewares = require('./middleware');


//rutas de movies
router.use('/movies',middlewares.checkToken,PeliculasRouter);

//rutas de characters
router.use('/characters',middlewares.checkToken,PersonajesRouter);

//rutas de Genero
router.use('/generos',middlewares.checkToken,GeneroRouter);

//rutas de auth
router.use ('/auth',UserRouter);

module.exports= router;