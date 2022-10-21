import UserBase from './UserBase.js';
import mongoose from 'mongoose';

const User = UserBase.discriminator(
    'user',
    new mongoose.Schema({}, {discriminatorKey: 'role'}),
);

export default User;
