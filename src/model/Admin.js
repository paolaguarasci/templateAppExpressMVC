import UserBase from './UserBase.js';
import mongoose from 'mongoose';

const Admin = UserBase.discriminator(
    'admin',
    new mongoose.Schema({}, {discriminatorKey: 'role'}),
);

export default Admin;
