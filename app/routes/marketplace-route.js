import express from "express";

import * as marketplaceController from '../controllers/marketplace-controller.js';

const router = express.Router();

router.route('/marketplace/')
    .get(marketplaceController.find)
    .post(marketplaceController.post);

router.route('/marketplace/:id')
    .get(marketplaceController.get)
    .put(marketplaceController.put)
    .delete(marketplaceController.remove);    

export default router;