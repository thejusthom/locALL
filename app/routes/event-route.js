import * as eventController from '../controllers/event-controller.js';
import express from 'express';

const eventRouter = express.Router();

// get all events and post a event
eventRouter.route('/')
  .get(eventController.getAll)
  .post(eventController.create);

// get, update and delete a event by id
eventRouter.route('/:eventId')
  .get(eventController.getById)
  .put(eventController.updateById)
  .delete(eventController.deleteById);

export default eventRouter;
