import { TUser } from './users.interface';
import { User } from './users.model';

const createUserToDB = async (userData: TUser) => {
  // creating instance
  const user = new User(userData);

  // calling instance method to save user to DB
  const result = await user.save();

  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

const getUserByIdFromDB = async (userId: number) => {
  const response = await User.isUserExists(userId);

  if (!response) throw new Error('User is not found. Invalid user ID');

  const result = await User.findOne({ userId: userId });

  return result;
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
};
