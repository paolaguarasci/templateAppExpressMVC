// file deepcode ignore NoRateLimitingForExpensiveWebOperation: c'e', globale, ma non lo rileva
import AuthService from "../service/auth.service.js";
import sanitizeHtml from "sanitize-html";

let AuthController = {
  loginGet: async (req, res) => {
    res.render("auth/login.twig", { title: "Login Page" });
  },

  registrationGet: async (req, res) => {
    res.render("auth/registration.twig", {
      title: "Registration Page",
    });
  },

  registrationPost: async (req, res) => {
    let newUser = req.body;
    try {
      await AuthService.registration(newUser);
      res.redirect("/");
    } catch (e) {
      console.log(e.message)
      res.render("auth/registration.twig", {
        title: "Registration Page",
        data: { err: e },
      });
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
