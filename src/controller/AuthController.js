import AuthService from '../service/auth.service.js'

let AuthController = {
  loginGet: (req, res) => {
    res.render('auth/login.twig', { title: "Login Page"})
  },
  loginPost: (req, res) => {
    // TODO redirect in base al ruolo
    res.render('auth/login.twig', { title: "Login Page"})
  }
};
export default AuthController;