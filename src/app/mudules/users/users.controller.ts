import { Request, Response } from 'express';
import { userServices } from './users.services';
import {
  getErrorResponse,
  getSuccessResponse,
} from '../../utility/responseFunction';
import userValidationSchema from './users.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // zod validation
    const zodParsedUserData = userValidationSchema.parse(userData);

    // calling service function to create user to DB
    const result = await userServices.createUserToDB(zodParsedUserData);

    res
      .status(201)
      .json(getSuccessResponse(true, 'User is created successfully', result));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err) {
    // console.log(err);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json(getErrorResponse(false, 'User Does not exists', err));
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const updatedUserData: object = req.body;

    // checking if any data available that need to be updated
    if (Object.keys(updatedUserData).length == 0) {
      throw new Error('No data is received that need to be updated');
    }

    // send request to service function of updating user
    const result = await userServices.updateUserByIdFromDB(
      parseInt(userId),
      updatedUserData,
    );

    res
      .status(200)
      .json(getSuccessResponse(true, 'User info Updated successfully', result));
  } catch (err) {
    res
      .status(400)
      .json(getErrorResponse(false, 'User Not found/Invalid request', err));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await userServices.deleteUserFromDB(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    res.status(404).json(getErrorResponse(false, 'User not found', err));
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUserById,
};
