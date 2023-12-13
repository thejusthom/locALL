import express from "express";

import * as marketplaceController from '../controllers/marketplace-controller.js';

const marketplaceRouter = express.Router();

// General path to get marketplaces
marketplaceRouter.route('/')
    .get(marketplaceController.find)
    .post(marketplaceController.post);

// Specific path to get users using params
marketplaceRouter.route('/params')
.get(marketplaceController.getByParams);

// Specific path to get marketplace using params
marketplaceRouter.route('/:id')
    .get(marketplaceController.get)
    .put(marketplaceController.put)
    .delete(marketplaceController.remove);    

export default marketplaceRouter;