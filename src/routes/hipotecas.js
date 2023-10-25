module.exports = app => {

    const Hipotecas = app.db.models.Hipotecas;
    const Clientes = app.db.models.Clientes;

    app.route('/hipotecas')
    .get((req, res) => {
        Hipotecas.findAll({})
        .then(result => res.json(result))
        .catch(err => {
            res.status(412).json({ error_msg: err.message});
        });
    });
    // .post((req, res) => {
    //     Hipotecas.create(req.body)
    //         .then(result => res.json(result))
    //         .catch(err => {
    //             res.status(412).json({msg: err.message});
    //         });
    // });

    app.route('/hipotecas/:cliente')
    .get((req, res) => {
        Hipotecas.findAll({where: req.params})
        .then(result => res.json(result))
        .catch(err => {
            res.status(412).json({ error_msg: err.message});
        });
    });

    app.route('/simular-hipoteca')
    .post((req, res) => {
        const { dni, tae, plazo } = req.body;
        if (!dni || !tae || !plazo) {
            return res.status(412).json({ error_msg: 'Faltan campos obligatorios en la solicitud.' });
        }
        Clientes.findByPk(dni)
        .then(result => {
            const i = tae / 100 / 12;
            const n = plazo * 12;
            const cuota = (result.capitalSolicitado * i) / (1 - Math.pow(1 + i, -n));
            Hipotecas.create({
                cliente: dni,
                cuota: cuota,
                importeTotal: cuota * n
            })
            .then(result => res.json(result))
            .catch(err => {
                res.status(412).json({ error_msg: err.message});
            })
        })
        .catch(err => {
            res.status(412).json({ error_msg: err.message});
        });
    });

};