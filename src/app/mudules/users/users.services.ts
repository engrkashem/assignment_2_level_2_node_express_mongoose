import { TOrder, TUser } from './users.interface';
import { User } from './users.model';

const createUserToDB = async (userData: TUser) => {
  // check if user already exists
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Exists');
  }
  // creating instance
  const user = new User(userData);

  // calling instance method to save user to DB
  const result = await user.save();

  return result;
};

const getAllUsersFromDB = async () => {
  // aggregating for filtering some fields to show in the response
  const result = await User.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

const getUserByIdFromDB = async (userId: number) => {
  // check if user already exists
  const response = await User.isUserExists(userId);

  // throw error if user not found
  if (!response) {
    throw new Error('User does not exists.');
  }

  // retrieve data of a specific user from db
  const result = await User.findOne({ userId: userId });

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  // check if user already exists
  if (await User.isUserExists(userId)) {
    // deleting a specific user from db
    const result = await User.deleteOne({ userId: userId });
    return result;
  } else throw new Error('User not found');
};

const updateUserByIdFromDB = async (
  userId: number,
  updatedUserData: object,
) => {
  // check if user already exists
  if (await User.isUserExists(userId)) {
    // updating info of a specific user into db
    const result = await User.updateOne({ userId: userId }, updatedUserData);
    return result;
  } else throw new Error('User not found');
};

const addProductToUserIntoDB = async (userId: number, order: TOrder) => {
  // check if user already exists
  if (await User.isUserExists(userId)) {
    // filtering required user and inserting order to his orders array
    const result = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: order } },
      { upsert: true, new: true },
    );

    return result;
  }
  throw new Error('User is not found');
};

const getAllOrderByUserIdFromDB = async (userId: number) => {
  // check if user already exists
  if (await User.isUserExists(userId)) {
    // filtering specific user and returning only orders properties by using project aggregation pipeline
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $project: { orders: 1, _id: 0 } },
    ]);
    return result;
  }
  throw new Error('user is not found');
};

const getTotalPriceOfUserByIdFromDB = async (userId: number) => {
  // check if user already exists
  if (await User.isUserExists(userId)) {
    // selecting specific user, unwinding orders array, grouping to find total price and showing only total price in the response
    const result = await User.aggregate([
      { $match: { userId: userId } },
      { $unwind: '$orders' },
      { $group: { _id: null, totalPrice: { $sum: '$orders.price' } } },
      { $project: { totalPrice: 1, _id: 0 } },
    ]);

    return result;
  }
  throw new Error('User not found');
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  deleteUserFromDB,
  updateUserByIdFromDB,
  addProductToUserIntoDB,
  getAllOrderByUserIdFromDB,
  getTotalPriceOfUserByIdFromDB,
};
