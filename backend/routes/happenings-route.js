import express from 'express';
import * as happeningController from '../controllers/happenings-controller.js';

const router = express.Router();

//get all happenings and post a happening
router.route('/')
    .get(happeningController.get)
    .post(happeningController.post);
    
//get, update and delete a happening
router.route('/:happeningId')
    .get(happeningController.getById)
    .put(happeningController.update)
    .delete(happeningController.remove);

export default router;