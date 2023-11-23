import express from 'express';
import { userControllers } from './users.controller';

/********** Router **********/
const router = express.Router();

/****** Creating routes for API endpoints using controller function ******/
router.post('/', userControllers.createUser);

export const userRoutes = router;
