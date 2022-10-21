import UserService from '../service/user.service.js';

const EditorController = {
  home: async (req, res) => {
    const userList = await UserService.all();
    const data = JSON.stringify({
      userList,
    });
    res.render('editor/home.twig', {title: 'Editor Home', data});
  },
};
export default EditorController;
