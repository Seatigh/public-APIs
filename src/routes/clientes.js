module.exports = app => {

    const Clientes = app.db.models.Clientes;

    app.route('/clientes')
    .get((req, res) => {
        Clientes.findAll({})
        .then(result => res.json(result))
        .catch(err => {
            res.status(412).json({msg: err.message});
        });
    })
    .post((req, res) => {
        Clientes.create(req.body)
        .then(result => res.json(result))
        .catch(err => {
            res.status(412).json({msg: err.message});
        });
    });

    app.route('/clientes/:dni')
    .get((req, res) => {
        Clientes.findByPk(req.params.dni)
        .then(result => res.json(result))
        .catch(err => {
            res.status(412).json({msg: err.message});
        });
    })
    .put((req, res) => {
        Clientes.update(req.body, {where: req.params})
        .then(result => res.status(204).json({msg: `Cliente ${req.params.dni} modificado correctamente.`}))
        .catch(err => {
            res.status(412).json({msg: err.message});
        });
    })
    .delete((req, res) => {
        Clientes.destroy({where: req.params})
        .then(result => res.status(204).json({msg: `Cliente ${req.params.dni} eliminado correctamente.`}))
        .catch(err => {
            res.status(412).json({msg: err.message});
        });
    });
};