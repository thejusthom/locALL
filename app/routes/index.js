import userRouter from './user-route.js';
import eventRouter from './event-route.js';
import marketplaceRouter from './marketplace-route.js';

export default (app) => {
    app.use('/users', userRouter);
    app.use('/events', eventRouter);
    app.use('/marketplace', marketplaceRouter);
}