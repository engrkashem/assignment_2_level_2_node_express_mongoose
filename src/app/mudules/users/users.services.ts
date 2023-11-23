import { TUser } from './users.interface';
import { User } from './users.model';

const createUserToDB = async (userData: TUser) => {
  // creating instance
  const user = new User(userData);

  // calling instance method to save user to DB
  const result = await user.save();

  return result;
};

export const userServices = {
  createUserToDB,
};
