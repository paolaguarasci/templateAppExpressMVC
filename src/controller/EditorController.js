import EditorService from "../service/editor.service.js";

let EditorController = {
  home: (req, res) => {
    let editorList = EditorService.all();
    let data = JSON.stringify({
      editorList,
    });
    let user = EditorService.get(1);
    res.render("editor/home.twig", { title: "Editor Home", data, user });
  },
};
export default EditorController;
