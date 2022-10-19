import EditorService from "../service/editor.service.js";

let EditorController = {
  home: (req, res) => {
    let editorList = EditorService.all();
    let data = JSON.stringify({
      editorList,
    });
    res.render("editor/home.twig", { title: "Editor Home", data });
  },
};
export default EditorController;
