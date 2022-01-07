const Sequelize = require('sequelize');

const PersonaModel = require('./Model/Personaje');
const PeliculaModel = require('./Model/Peliculas');
const GeneroModel = require('./Model/Generos');
const UsuarioModel = require('./Model/Usuarios');


const sequelize = new Sequelize('alkemy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Personaje = PersonaModel (sequelize, Sequelize);
const Pelicula = PeliculaModel (sequelize, Sequelize);
const Genero = GeneroModel (sequelize, Sequelize);
const Usuario = UsuarioModel (sequelize, Sequelize);


//Asociaciones de tablas
const peliPersonaje = sequelize.define('pelipersonaje', {}, { timestamps: false });
const peliGenero = sequelize.define('peligenero', {}, { timestamps: false });

Genero.belongsToMany(Pelicula, { through: 'peligenero' });
Pelicula.belongsToMany(Genero, { through: 'peligenero' });
Personaje.belongsToMany(Pelicula, { through: 'pelipersonaje' });
Pelicula.belongsToMany(Personaje, { through: 'pelipersonaje' });


sequelize.sync({ force: false})
    .then(()=>{
        console.log('Tablas Sincronizadas')
    })

module.exports = {
    Personaje,
    Pelicula,
    Genero,
    Usuario,
    peliPersonaje,
    peliGenero,
    sequelize

    
}