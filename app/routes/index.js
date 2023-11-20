import marketplaceRouter from './marketplace-route.js';

export default (app) => {
    app.use('/marketplace', marketplaceRouter)
}