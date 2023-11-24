import { Request, Response } from 'express';
import { userServices } from './users.services';
import {
  getErrorResponse,
  getSuccessResponse,
} from '../../utility/responseFunction';
import userValidationSchema from './users.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // zod validation
    const zodParsedUserData = userValidationSchema.parse(userData);

    // calling service function to create user to DB
    const result = await userServices.createUserToDB(zodParsedUserData);

    res
      .status(201)
      .json(getSuccessResponse(true, 'User is created successfully', result));
  } catch (err) {
    res
      .status(400)
      .json(getErrorResponse(false, 'User creation request is denied', err));
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res
      .status(200)
      .json(
        getSuccessResponse(true, 'User retrieve request is successful', result),
      );
  } catch (err) {
    res.status(400).json(getErrorResponse(false, 'something went wrong', err));
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getUserByIdFromDB(parseInt(userId));

    res
      .status(200)
      .json(getSuccessResponse(true, 'User data is available', result));
  } catch (err) {
    res.status(400).json(getErrorResponse(false, 'Invalid request', err));
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
};
