import User from "../model/User.js";

let UserService = {
  get: async (userId) => {
    let user = await User.findOne({ username: 'user'});
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
