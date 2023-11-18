import cors from 'cors';
import express from 'express';
import registerRouter from './routes/index.js';
import mongoose from 'mongoose';

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    mongoose.connect('mongodb+srv://thomsonth:ffs2sjXiAQIvnqmP@info6150-test.twitsfc.mongodb.net/coursedb?retryWrites=true&w=majority');
    registerRouter(app);
}

export default initialize;