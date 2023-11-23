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

export const userControllers = {
  createUser,
};
