import UserService from "../service/user.service.js"

let EditorController = {
  home: async (req, res) => {
    let userList = await UserService.all();
    let data = JSON.stringify({
      userList,
    });
    res.render("editor/home.twig", { title: "Editor Home", data });
  },
};
export default EditorController;
