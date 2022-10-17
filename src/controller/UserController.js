import UserService from '../service/user.service.js'

let UserController = {
  home: (req, res) => {
    let user = UserService.get(1)
 console.log("user ", user);
    res.render('user/home.twig', { title: "User Home", user })
  },
};
export default UserController;
