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
      let user = await AuthService.registration(req.body);
      res.render("auth/registration.twig", { title: "Registration Page" });
    } catch (e) {
      console.log("Constroller ", e.message);
      res.render("error.twig");
    }
  },

  loginPost: async (req, res) => {
    console.log("user ", req.session);
    let redirectTo = req.originalUrl != "/auth/login" ? req.originalUrl : "/";
    res.redirect(redirectTo);
  },

  logout: async (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/auth/login");
    });
  },
};
export default AuthController;
