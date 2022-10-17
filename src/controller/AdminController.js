import AdminService from '../service/admin.service.js'
import EditorService from '../service/editor.service.js'
import UserService from '../service/user.service.js'

let AdminController = {
  home: (req, res) => {
    let userList = UserService.all();
    let editorList = EditorService.all()
    let adminList = AdminService.all()
    let data = JSON.stringify({
      userList,
      editorList,
      adminList
    })
    let user = AdminService.get(1)
    res.render('admin/home.twig', { title: "Admin Home", data, user })
  },
};
export default AdminController;
