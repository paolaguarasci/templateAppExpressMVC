import UserBase from '../model/UserBase.js';

const UserBaseService = {
  get: async (userBaseId) => {
    const userBase = await UserBase.findById(userBaseId);
    return userBase;
  },
  all: async () => {
    return await UserBase.find({});
  },
  edit: async (userBase) => {
    return await UserBase.updateOne(userBase);
  },
  delete: async (userBase) => {
    return await UserBase.deleteOne(userBase);
  },
  bulkEdit: async (userBases) => {
    return await UserBase.updateMany(userBases);
  },
  bulkDelete: async (userBases) => {
    return await UserBase.deleteMany(userBases);
  },
};

export default UserBaseService;
