import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let db = null;

module.exports = app => {

    const config = app.libs.config;

    // Si no existe la base de datos, se construye mediante Sequelize con los modelos especificados en el directorio 'models'
    if (!db) {
        
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, 'models');
        fs.readdirSync(dir).forEach(fileName => {
            const modelDir = path.join(dir, fileName);
            const model = require(modelDir)(sequelize, Sequelize.DataTypes);
            db.models[model.name] = model;
        });

        // Object.keys(db.models).forEach(key => {
        //     db.models[key].associate(db.models);
        // })
    };

    return db;

};