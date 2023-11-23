import { Request, Response } from 'express';
import { userServices } from './users.services';
import {
  getErrorResponse,
  getSuccessResponse,
} from '../../utility/responseFunction';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUserToDB(userData);

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
