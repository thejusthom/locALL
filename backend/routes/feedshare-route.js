/**
 * Express router for feedshare routes.
 * @module feedshareRouter
 */

import express from "express";

import * as feedshareController from '../controllers/feedshare-controller.js';

const feedshareRouter = express.Router();

/**
 * Route for retrieving all feedshares.
 * @name GET /feedshare
 * @function
 * @memberof module:feedshareRouter
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with feedshares
 */
feedshareRouter.route('/')
    .get(feedshareController.find)
    .post(feedshareController.post);

/**
 * Route for retrieving feedshares by parameters.
 * @name GET /feedshare/params
 * @function
 * @memberof module:feedshareRouter
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with feedshares
 */
feedshareRouter.route('/params')
    .get(feedshareController.getByParams);

/**
 * Route for retrieving a specific feedshare by ID.
 * @name GET /feedshare/:id
 * @function
 * @memberof module:feedshareRouter
 * @inner
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with the feedshare
 */
feedshareRouter.route('/:id')
    .get(feedshareController.get)
    .put(feedshareController.put)
    .delete(feedshareController.remove);

export default feedshareRouter;