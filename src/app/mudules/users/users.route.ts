import express from 'express';
import { userControllers } from './users.controller';

/********** Router **********/
const router = express.Router();

/****** Creating routes for API endpoints using controller function ******/
//crete user
router.post('/', userControllers.createUser);

// retrieve all user
router.get('/', userControllers.getAllUser);

export const userRoutes = router;
