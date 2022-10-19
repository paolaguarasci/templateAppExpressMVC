import User from "../model/User.js";
import UserBase from "../model/UserBase.js";

let AuthService = {
  registration: async (registrationRequest) => {
    try {
      return await User.create({
        username: registrationRequest.username,
        password: registrationRequest.password,
      });
    } catch (e) {
      throw Error(e);
    }
  },
  login: async (username, candidatePassword) => {
    let user = await UserBase.findOne({ username: username });
    let checkPassword = await user.comparePassword(candidatePassword);
    return checkPassword ? user : {};
  },
  logout: () => {},
};
export default AuthService;
