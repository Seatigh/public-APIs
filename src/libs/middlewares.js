import express from 'express';

module.exports = app => {

    // Settings
    app.set('port', process.env.PORT | 3000);
    app.set('json spaces', 2);

    // Middlewares
    app.use(express.json());

};