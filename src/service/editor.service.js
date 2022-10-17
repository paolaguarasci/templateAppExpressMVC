const TEMPLATEEDITORS = [
  { id: 1, name: 'paola', role: 'editor' },
  { id: 2, name: 'antonio', role: 'editor' },
  { id: 3, name: 'giorgio', role: 'editor' }
];

let EditorService = {
  get: (editorId) => {
    return TEMPLATEEDITORS.find((u) => u.id ===  editorId)
  },
  all: () => {
    return TEMPLATEEDITORS;
  },
  add: (editor) => {
    TEMPLATEEDITORS.push(editor);
  },
  edit: (editor) => {
    let editorFromSource = TEMPLATEEDITORS.find((u) => u.id === editor.id);
    editorFromSource = editor;
    return TEMPLATEEDITORS;
  },
  delete: (editor) => {
    return TEMPLATEEDITORS.filter((u) => u.id != editor.id);
  }
};
export default EditorService;
