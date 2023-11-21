import express from 'express';
import * as happeningController from '../controllers/happenings-controller.js';

const router = express.Router();

router.route('/')
    .get(happeningController.get)
    .post(happeningController.post);
    
router.route('/:happeningId')
    .get(happeningController.getById)
    .put(happeningController.update)
    .delete(happeningController.remove);

export default router;