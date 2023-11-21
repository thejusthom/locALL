import userRouter from './user-route.js';
import eventRouter from './event-route.js';

export default (app) => {
    app.use('/users', userRouter);
    app.use('/events', eventRouter);
}