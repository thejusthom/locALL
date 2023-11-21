import express from "express";

import * as marketplaceController from '../controllers/marketplace-controller.js';

const marketplaceRouter = express.Router();

marketplaceRouter.route('/')
    .get(marketplaceController.find)
    .post(marketplaceController.post);

marketplaceRouter.route('/:id')
    .get(marketplaceController.get)
    .put(marketplaceController.put)
    .delete(marketplaceController.remove);    

export default marketplaceRouter;