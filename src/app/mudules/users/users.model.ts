import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './users.interface';

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
const userSchema = new Schema<TUser>({
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
    trim: true,
    maxlength: [20, 'Last name must be less than 20 characters'],
    minlength: [3, 'Password is too short. min 3 characters is needed.'],
  },
  fullName: { type: fullNameSchema, required: [true, 'Full name is required'] },
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
  isDeleted: { type: Boolean },
});

/********** Model (Schema) **********/
export const User = model<TUser>('User', userSchema);
