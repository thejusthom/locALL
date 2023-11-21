import cors from 'cors';
import express from 'express';
import registerRouter from './routes/index.js';
import mongoose from 'mongoose';

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    // mongoose.connect('mongodb+srv://vijayachandran-a:2DyQTUKnpp2AmvEG@info6150fall2023.h1f7hev.mongodb.net/?retryWrites=true&w=majority');
    //mongoose.connect('mongodb+srv://thomsonth:ffs2sjXiAQIvnqmP@info6150-test.twitsfc.mongodb.net/coursedb?retryWrites=true&w=majority');
    mongoose.connect('mongodb+srv://anthonirajs:IyLAYTfE57djZm0j@info6150fall2023.ajzgwia.mongodb.net/coursedb?retryWrites=true&w=majority');
    registerRouter(app);
}

export default initialize;