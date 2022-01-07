module.exports = (sequelize , type) => {
    return sequelize.define('peliculas', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        titulo: type.STRING,
        fecha_creacion: type.DATE,
        imagen: type.STRING,
        calificacion: type.INTEGER,
        activo: type.INTEGER,
    })
}