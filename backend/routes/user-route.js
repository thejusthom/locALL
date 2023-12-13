import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

// Default path 
router.route('/')
    .get(userController.get)
    .post(userController.post);

// Specific path to get users using params
router.route('/params')
    .get(userController.getByParams);

// Specific Path to make changes to an user providing id
router.route('/:id')
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.remove);

// Specific path to login
router.route('/login')
    .post(userController.loginUser);

// Specific path to logout
router.route('/logout')
    .post(userController.logout);

// Specific path to refresh token
router.route('/refresh-token')
    .post(userController.refreshTokens);

export default router;