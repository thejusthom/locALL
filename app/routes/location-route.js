import express from 'express';
import happeningRouter from './happenings-route.js'

const router = express.Router();

//to set the locationId in the request object of happenings router
router.use('/:locationId/happenings', function(req, res, next) {
        req.locationId = req.params.locationId;
        next()
      }, happeningRouter);

export default router;