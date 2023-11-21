import * as eventController from '../controllers/event-controller.js';
import express from 'express';

const eventRouter = express.Router();

eventRouter.route('/')
  .get(eventController.getAll)
  .post(eventController.create);

eventRouter.route('/:id')
  .get(eventController.getById)
  .put(eventController.updateById)
  .delete(eventController.deleteById);

export default eventRouter;
