import { Request, Response } from 'express';
import { userServices } from './users.services';
import {
  getErrorResponse,
  getSuccessResponse,
} from '../../utility/responseFunction';
import userValidationSchema, {
  orderValidationSchema,
} from './users.validation';
import { TOrder } from './users.interface';

/********** Users CRUD controllers function **********/

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    // validating user data using zod
    const zodParsedUserData = userValidationSchema.parse(userData);

    // calling service function to create user to DB
    const result = await userServices.createUserToDB(zodParsedUserData);

    // getSuccessResponse and getErrorResponse are two utility function to format response
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
    // calling service function to get all available users
    const result = await userServices.getAllUsersFromDB();

    // getSuccessResponse and getErrorResponse are two utility function to format response
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

    // calling service function get a specific user
    const result = await userServices.getUserByIdFromDB(parseInt(userId));

    // getSuccessResponse and getErrorResponse are two utility function to format response
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

    // getSuccessResponse and getErrorResponse are two utility function to format response
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

    // calling service function to delete a specific user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await userServices.deleteUserFromDB(parseInt(userId));

    // getSuccessResponse and getErrorResponse are two utility function to format response
    res
      .status(200)
      .json(getSuccessResponse(true, 'User deleted successfully!', null));
  } catch (err) {
    res.status(404).json(getErrorResponse(false, 'User not found', err));
  }
};

/********** Orders CRUD controllers function **********/

const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order: object = req.body;

    // validating order object using ZOD
    const zodParsedOrder: TOrder = orderValidationSchema.parse(order);

    // calling service function to add an order to a specific user orders array
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await userServices.addProductToUserIntoDB(
      parseInt(userId),
      zodParsedOrder,
    );

    // getSuccessResponse and getErrorResponse are two utility function to format response
    res
      .status(200)
      .json(getSuccessResponse(true, 'Order created successfully!', null));
  } catch (err) {
    res
      .status(400)
      .json(getErrorResponse(false, 'Invalid data format/User not found', err));
  }
};

const getAllOrderByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // calling service function to get all orders of a specific user
    const result = await userServices.getAllOrderByUserIdFromDB(
      parseInt(userId),
    );

    // getSuccessResponse and getErrorResponse are two utility function to format response
    res
      .status(200)
      .json(getSuccessResponse(true, 'Order fetched successfully!', result[0]));
  } catch (err) {
    res.status(404).json(getErrorResponse(false, 'Orders/User not found', err));
  }
};

const getTotalPriceOfUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // calling service function to get total price of a specific user
    const result = await userServices.getTotalPriceOfUserByIdFromDB(
      parseInt(userId),
    );
    // getSuccessResponse and getErrorResponse are two utility function to format response
    res
      .status(200)
      .json(
        getSuccessResponse(
          true,
          'Total price calculated successfully!',
          result.length == 0 ? { totalPrice: 0 } : result[0],
        ),
      );
  } catch (err) {
    res.status(400).json(getErrorResponse(false, 'User/Orders not found', err));
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUserById,
  addProduct,
  getAllOrderByUserId,
  getTotalPriceOfUserById,
};
