import userRouter from './user-route.js'
import marketplaceRouter from './marketplace-route.js';

export default (app) => {
    app.use('/marketplace', marketplaceRouter)
    app.use('/users',userRouter)
}