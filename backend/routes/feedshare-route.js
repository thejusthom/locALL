import express from "express";

import * as feedshareController from '../controllers/feedshare-controller.js';

const feedshareRouter = express.Router();

feedshareRouter.route('/')
    .get(feedshareController.find)
    .post(feedshareController.post);

feedshareRouter.route('/:id')
    .get(feedshareController.get)
    .put(feedshareController.put)
    .delete(feedshareController.remove);

export default feedshareRouter;