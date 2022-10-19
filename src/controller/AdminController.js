import AdminService from "../service/admin.service.js";
import EditorService from "../service/editor.service.js";
import UserService from "../service/user.service.js";

let AdminController = {
  home: async (req, res) => {
    let userList = await UserService.all();
    let editorList = await EditorService.all();
    let adminList = await AdminService.all();
    let data = JSON.stringify({
      userList,
      editorList,
      adminList,
    });
    res.render("admin/home.twig", { title: "Admin Home", data });
  },
};
export default AdminController;
