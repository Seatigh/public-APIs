// Fichero de configuración de la base de datos física
module.exports = {
    database: 'hipotecas',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'hipotecas-db.sqlite',
        define: {
            underscore: true
        }
    }
};