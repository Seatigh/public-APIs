module.exports = app => {

    // Inicialización de la bbdd y posteriormente de la API
    app.db.sequelize.sync().then(() => {
        app.listen(app.get('port'), () => {
            console.log('Server running on port', app.get('port'));
        });
    });

};