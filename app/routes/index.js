import userRouter from './user-route.js'
import locationRouter from './location-route.js';
import happeningRouter from './happenings-route.js'

const LocationEndpoint = '/location/:locationId';
export default (app) => {
    app.use('/users',userRouter)
    app.use('/location',locationRouter)
    app.use(`${LocationEndpoint}/happenings`,happeningRouter)
}