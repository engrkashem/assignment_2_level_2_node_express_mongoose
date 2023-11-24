/********** Interfaces for Schema **********/

import { Model } from 'mongoose';

// sub interfaces
export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

// main interface
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies?: string[];
  address: TAddress;
  orders?: TOrder[];
};

/********** Model for Custom static method **********/
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
}
