import userRouter from './user-route.js'
export default (app) => {
    app.use('/users',userRouter)
}