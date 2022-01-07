module.exports = (sequalize, type) => {
    return sequalize.define( 'usuario', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombre_usuario: type.STRING,
        email: type.STRING,
        contraseña: type.STRING(150)
    });
}