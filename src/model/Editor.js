import UserBase from './UserBase.js';
import mongoose from 'mongoose';

const Editor = UserBase.discriminator(
    'editor',
    new mongoose.Schema({}, {discriminatorKey: 'role'}),
);
export default Editor;
