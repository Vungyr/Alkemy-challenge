module.exports = (sequelize , type) => {
    return sequelize.define('personaje', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombre: type.STRING,
        edad: type.INTEGER,
        peso: type.INTEGER,
        imagen: type.STRING,
        historia: type.STRING,
        activo: type.INTEGER
    })
}