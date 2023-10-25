module.exports = app => {

    // Endpoint inicial
    app.get('/', (req, res) => {
        res.json({status: 'Test API'});
    });
}