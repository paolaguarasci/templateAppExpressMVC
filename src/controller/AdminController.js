import AdminService from '../service/admin.service.js';
import EditorService from '../service/editor.service.js';
import UserService from '../service/user.service.js';

const AdminController = {
  home: async (req, res) => {
    const userList = await UserService.all();
    const editorList = await EditorService.all();
    const adminList = await AdminService.all();
    const data = JSON.stringify({
      userList,
      editorList,
      adminList,
    });
    res.render('admin/home.twig', {title: 'Admin Home', data});
  },
};
export default AdminController;
