import UserService from "../service/user.service.js";

let UserController = {
  home: (req, res) => {
    res.render("user/home.twig", { title: "User Home", data: {} });
  },
};
export default UserController;
