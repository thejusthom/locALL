import * as eventController from '../controllers/event-controller.js';
import express from 'express';

const eventRouter = express.Router();

// get all events and post a event
eventRouter.route('/')
  .get(eventController.getAll)
  .post(eventController.create);

// Specific path to get users using params
eventRouter.route('/params')
.get(eventController.getByParams);

// get, update and delete a event by id
eventRouter.route('/:eventId')
  .get(eventController.getById)
  .put(eventController.updateById)
  .delete(eventController.deleteById);

export default eventRouter;
