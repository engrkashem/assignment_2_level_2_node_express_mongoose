import { TUser } from './users.interface';
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
  const result = await User.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

const getUserByIdFromDB = async (userId: number) => {
  const response = await User.isUserExists(userId);

  if (!response) {
    throw new Error('User does not exists.');
  }

  const result = await User.findOne({ userId: userId });

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId: userId });
    return result;
  } else throw new Error('User not found');
};

const updateUserByIdFromDB = async (
  userId: number,
  updatedUserData: object,
) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne({ userId: userId }, updatedUserData);
    return result;
  } else throw new Error('User not found');
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  deleteUserFromDB,
  updateUserByIdFromDB,
};
