import express from 'express';
import happeningRouter from './happenings-route.js'
import marketplaceRouter from './marketplace-route.js';
import eventRouter from './event-route.js';
import donationRouter from './donation-route.js';
import feedshareRouter from './feedshare-route.js';

const router = express.Router();

//to set the locationId in the request object of happenings router
router.use('/:locationId/happenings', function(req, res, next) {
        req.locationId = req.params.locationId;
        next()
      }, happeningRouter);

router.use('/:locationId/marketplace', function(req, res, next) {
        req.locationId = req.params.locationId;
        next()
      }, marketplaceRouter); 

//To save locationId in request obj of event router
router.use('/:locationId/events', (request, response, next) => {
  request.locationId = request.params.locationId;
  next();
}, eventRouter);

router.use('/:locationId/donations', (request, response, next) => {
  request.locationId = request.params.locationId;
  next();
}, donationRouter);

router.use('/:locationId/feedshare', function(req, res, next) {
  req.locationId = req.params.locationId;
  next()
}, feedshareRouter); 

export default router;