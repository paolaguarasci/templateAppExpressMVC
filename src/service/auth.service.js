const TEMPLATEADMIN = [{ id: 1, name: "admin", role: "admin" }];

import crypto from "crypto";

let AuthService = {
  registration: () => {},
  login: (username) => {
    return User.findOne({ username: username }, (err, person) => {
      console.log(person);
    });
  },
  logout: () => {},
};
export default AuthService;
