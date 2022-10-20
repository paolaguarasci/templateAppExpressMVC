import User from "../model/User.js";

let UserService = {
  get: async (userId) => {
    let user = await User.findById(userId);
    return user
  },
  all: async () => {
    return await User.find({});
  },
  add: async (user) => {
    return await User.create(user);
  },
  edit: async (user) => {
    return await User.updateOne(user);
  },
  delete: async (user) => {
    return await User.deleteOne(user);
  },

  bulkEdit: async (users) => {
    return await User.updateMany(users);
  },
  bulkDelete: async (users) => {
    return await User.deleteMany(users);
  },
};

export default UserService;
