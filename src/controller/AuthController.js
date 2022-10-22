// file deepcode ignore NoRateLimitingForExpensiveWebOperation
import AuthService from "../service/auth.service.js";
import UserBaseService from "../service/userbase.service.js";
import passport from "passport";

const AuthController = {
  loginGet: async (req, res) => {
    res.render("auth/login.twig", { title: "Login Page" });
  },

  registrationGet: async (req, res) => {
    res.render("auth/registration.twig", {
      title: "Registration Page",
    });
  },

  registrationPost: async (req, res, next) => {
    const newUser = req.body;
    try {
      let userFromDB = await AuthService.registration(newUser);
      passport.authenticate("local", {
        session: true,
        failureRedirect: "/auth/login",
        successRedirect: `/${userFromDB.role}`,
        failureMessage: true,
      })(req, res, next);
    } catch (err) {
      res.render("auth/registration.twig", {
        title: "Registration Page",
        data: { err: err },
      });
    }
  },

  loginPost: async (req, res) => {
    let userIdInSession = req.session.passport.user;
    let userInSessionFromDB = await UserBaseService.get(userIdInSession);
    res.redirect(`/${userInSessionFromDB.role}`);
  },

  logout: async (req, res) => {
    await req.logout(() => {
      return res.redirect("/auth/login")
    });
  },
};
export default AuthController;
