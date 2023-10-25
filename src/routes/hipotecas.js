module.exports = app => {

    const Hipotecas = app.db.models.Hipotecas;
    const Clientes = app.db.models.Clientes;

    // Endpoint para consultar todas las hipotecas que hay en la bbdd (get)
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

    // Endpoint para consultar las hipotecas de un cliente específico por dni (get)
    app.route('/hipotecas/:cliente')
    .get((req, res) => {
        Hipotecas.findAll({where: req.params})
        .then(result => res.json(result))
        .catch(err => {
            res.status(412).json({ error_msg: err.message});
        });
    });

    // Endpoint para calcular los datos necesarios de una hipoteca y crearla en la base de datos (post)
    app.route('/simular-hipoteca')
    .post((req, res) => {
        // Se comprueba primero que existan todos los campos necesarios en la solicitud
        const { dni, tae, plazo } = req.body;
        if (!dni || !tae || !plazo) {
            return res.status(412).json({ error_msg: 'Faltan campos obligatorios en la solicitud.' });
        }
        // Se busca el cliente sobre el que se va a calcular la hipoteca
        Clientes.findByPk(dni)
        .then(result => {
            // Calcular la hipoteca según la fórmula especificada
            const i = tae / 100 / 12;
            const n = plazo * 12;
            const cuota = (result.capitalSolicitado * i) / (1 - Math.pow(1 + i, -n));
            // Crear la hipoteca en la bbdd
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