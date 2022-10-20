import AuthService from "../service/auth.service.js";

let AuthController = {
  loginGet: async (req, res) => {
    res.render("auth/login.twig", { title: "Login Page" });
  },

  registrationGet: async (req, res) => {
    res.render("auth/registration.twig", { title: "Registration Page" });
  },

  registrationPost: async (req, res) => {
    // TODO Validation request
    try {
      await AuthService.registration(req.body);
      res.redirect("/");
    } catch (e) {
      res.render("error.twig");
    }
  },

  loginPost: async (req, res) => {
    res.redirect("/");
  },

  logout: async (req, res) => {
    req.logout(() => {});
    res.redirect("/auth/login");
  },
};
export default AuthController;
