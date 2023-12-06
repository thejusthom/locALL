import express from 'express';
import * as donationController from '../controllers/donation-controller.ts';

const router = express.Router();

//get all happenings and post a donation
router.route('/')
    .get(donationController.get)
    .post(donationController.post);
    
//get, update and delete a donation
router.route('/:donationId')
    .get(donationController.getById)
    .put(donationController.update)
    .delete(donationController.remove);

export default router;