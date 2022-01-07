module.exports = (sequelize , type) => {
    return sequelize.define('generos', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombre: type.STRING,
        imagen: type.STRING,
    })
}