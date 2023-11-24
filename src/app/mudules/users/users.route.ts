import express from 'express';
import { userControllers } from './users.controller';

/********** Router **********/
const router = express.Router();

/********** Users endpoint routes **********/
//crete user
router.post('/', userControllers.createUser);

// retrieve all user
router.get('/', userControllers.getAllUser);

// retrieve user by userId
router.get('/:userId', userControllers.getUserById);

// update user by userId
router.put('/:userId', userControllers.updateUserById);

// delete user bu userId from db
router.delete('/:userId', userControllers.deleteUser);

/********** Orders endpoint routes **********/

// add order
router.put('/:userId/orders', userControllers.addProduct);

// retrieve all order of a user
router.get('/:userId/orders', userControllers.getAllOrderByUserId);

export const userRoutes = router;
