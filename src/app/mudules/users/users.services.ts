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

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
};
