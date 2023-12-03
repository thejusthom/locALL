import cors from 'cors';
import express from 'express';
import registerRouter from './routes/index.js';
import mongoose from 'mongoose';

const initialize = (app) => {
    app.use(cors());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    // mongoose.connect('mongodb+srv://vijayachandran-a:2DyQTUKnpp2AmvEG@info6150fall2023.h1f7hev.mongodb.net/?retryWrites=true&w=majority');
    //mongoose.connect('mongodb+srv://thomsonth:ffs2sjXiAQIvnqmP@info6150-test.twitsfc.mongodb.net/coursedb?retryWrites=true&w=majority');
    const url = 'mongodb://127.0.0.1/locall';
    mongoose.connect(url).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB: ', err.message);
    });
    registerRouter(app);
}

export default initialize;