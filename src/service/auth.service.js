import User from "../model/User.js";
import UserBase from "../model/UserBase.js";

const AuthService = {
  registration: async (registrationRequest) => {
    return await User.create({
      username: registrationRequest.username,
      password: registrationRequest.password,
    });
  },
  login: async (username, candidatePassword) => {
    try {
      const user = await UserBase.findOne({ username: username });
      const checkPassword = await user.comparePassword(candidatePassword);
    } catch (e) {
      console.log("Errore in service login ")
      throw Error(e)
    }
    return checkPassword ? user : {};
  },
  logout: () => {},
};
export default AuthService;
