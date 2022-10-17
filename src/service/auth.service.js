const TEMPLATEADMIN = [{ id: 1, name: 'admin', role: 'admin' }];

let AuthService = {
  get: (adminId) => {
    return TEMPLATEADMIN.find((u) => u.id === adminId);
  },
  all: () => {
    return TEMPLATEADMIN;
  },
  add: (admin) => {
    return TEMPLATEADMIN.push(admin);
  },
  edit: (admin) => {
    let adminFromSource = TEMPLATEADMIN.find((a) => a.id === admin.id);
    adminFromSource = admin;
    return TEMPLATEADMIN;
  },
  delete: (admin) => {
    return TEMPLATEADMIN.filter((a) => admin.id != a.id);
  }
};
export default AuthService;
