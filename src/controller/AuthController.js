import AuthService from "../service/auth.service.js";

let AuthController = {
  loginGet: (req, res) => {
    res.render("auth/login.twig", { title: "Login Page" });
  },
  loginPost: (req, res) => {
    let user = AuthService.login(req.body.username);

    res.render("auth/login.twig", { title: "Login Page" });
  },
};
export default AuthController;
