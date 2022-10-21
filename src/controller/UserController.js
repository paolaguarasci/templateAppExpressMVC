import UserService from '../service/user.service.js'; // eslint-disable-line no-unused-vars

const UserController = {
  home: async (req, res) => {
    res.render('user/home.twig', {title: 'User Home', data: '{}'});
  },
};
export default UserController;
