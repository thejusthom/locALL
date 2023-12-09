import express from 'express';
import * as donationController from '../controllers/donation-controller.js';

const donationRouter = express.Router();

//get all happenings and post a donation
donationRouter.route('/')
    .get(donationController.get)
    .post(donationController.post);
    
    // Specific path to get users using params
donationRouter.route('/params')
.get(donationController.getByParams);

//get, update and delete a donation
donationRouter.route('/:donationId')
    .get(donationController.getById)
    .put(donationController.update)
    .delete(donationController.remove);

export default donationRouter;