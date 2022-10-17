const TEMPLATEUSERS = [
  { id: 1, name: 'paola', role: 'user' },
  { id: 2, name: 'antonio', role: 'user' },
  { id: 3, name: 'giorgio', role: 'user' }
];

let UserService = {
  get: (userId) => {
    return TEMPLATEUSERS.find((u) => u.id ===  userId)
  },
  all: () => {
    return TEMPLATEUSERS;
  },
  add: (user) => {
    TEMPLATEUSERS.push(user);
  },
  edit: (user) => {
    let userFromSource = TEMPLATEUSERS.find((u) => u.id === user.id);
    userFromSource = user;
    return TEMPLATEUSERS;
  },
  delete: (user) => {
    return TEMPLATEUSERS.filter((u) => u.id != user.id);
  }
};
export default UserService;
