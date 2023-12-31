import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './users.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// reEx to validate email
const emailRegEx =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/********** Schemas **********/

// sub schema
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'First name can not be empty string'],
    maxlength: [20, 'First name must be less than 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [1, 'Last name can not be empty string'],
    maxlength: [20, 'Last name must be less than 20 characters'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'], trim: true },
  city: { type: String, required: [true, 'City is required'], trim: true },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: { type: Number, required: [true, 'Product price is required'] },
  quantity: { type: Number, required: [true, 'Product quantity is required'] },
});

// main Schema
export const userSchema = new Schema<TUser>(
  {
    userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Last name must be less than 20 characters'],
      minlength: [3, 'Password is too short. min 3 characters is needed.'],
    },
    fullName: {
      type: fullNameSchema,
      required: [true, 'Full name is required'],
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [emailRegEx, '{VALUE} is not valid email address.'],
    },
    isActive: { type: Boolean, default: true },
    hobbies: [{ type: String }],
    address: { type: addressSchema, required: [true, 'Address is required'] },
    orders: [{ type: orderSchema }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        if (ret.orders.length == 0) {
          delete ret.orders;
        }
      },
    },
  },
);

/********** Middlewares **********/

// pre middleware to save
userSchema.pre('save', async function (next) {
  // const user=this;
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
  next();
});

/********** Custom static method (check if a specific user exists) **********/
userSchema.statics.isUserExists = async (userId: number) => {
  return await User.exists({ userId: userId });
};

/********** Model (Schema) **********/
export const User = model<TUser, UserModel>('User', userSchema);
