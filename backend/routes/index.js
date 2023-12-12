import userRouter from './user-route.js'
import locationRouter from './location-route.js';
import happeningRouter from './happenings-route.js'
import eventRouter from './event-route.js';
import marketplaceRouter from './marketplace-route.js';
import feedshareRouter from './feedshare-route.js';

const LocationEndpoint = '/location/:locationId';

export default (app) => {
    app.use('/users', userRouter);
    app.use('/location', locationRouter);
    app.use(`${LocationEndpoint}/happenings`, happeningRouter);
    app.use(`${LocationEndpoint}/events`, eventRouter);
    app.use('/marketplace', marketplaceRouter);
    app.use('/feedshare', feedshareRouter);
}