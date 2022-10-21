import Admin from '../model/Admin.js';

const AdminService = {
  get: async (adminId) => {
    return await Admin.findById(adminId);
  },
  all: async () => {
    return await Admin.find({});
  },
  add: async (admin) => {
    return await Admin.create(admin);
  },
  edit: async (admin) => {
    return await Admin.updateOne(admin);
  },
  delete: async (admin) => {
    return await Admin.deleteOne(admin);
  },
  bulkEdit: async (admins) => {
    return await Admin.updateMany(admins);
  },
  bulkDelete: async (admins) => {
    return await Admin.deleteMany(admins);
  },
};
export default AdminService;
