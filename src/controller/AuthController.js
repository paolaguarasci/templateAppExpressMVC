// file deepcode ignore NoRateLimitingForExpensiveWebOperation
import AuthService from '../service/auth.service.js';

const AuthController = {
  loginGet: async (req, res) => {
    res.render('auth/login.twig', {title: 'Login Page'});
  },

  registrationGet: async (req, res) => {
    res.render('auth/registration.twig', {
      title: 'Registration Page',
    });
  },

  registrationPost: async (req, res) => {
    const newUser = req.body;
    try {
      await AuthService.registration(newUser);
      res.redirect('/');
    } catch (e) {
      console.log(e.message);
      res.render('auth/registration.twig', {
        title: 'Registration Page',
        data: {err: e},
      });
    }
  },

  loginPost: async (req, res) => {
    res.redirect('/');
  },

  logout: async (req, res) => {
    req.logout(() => {});
    res.redirect('/auth/login');
  },
};
export default AuthController;
