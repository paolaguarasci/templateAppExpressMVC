import Editor from '../model/Editor.js';

const EditorService = {
  get: async (editorId) => {
    return await Editor.findById(editorId);
  },
  all: async () => {
    return await Editor.find({});
  },
  add: async (editor) => {
    return await Editor.create(editor);
  },
  edit: async (editor) => {
    return await Editor.updateOne(editor);
  },
  delete: async (editor) => {
    return await Editor.deleteOne(editor);
  },

  bulkEdit: async (editors) => {
    return await Editor.updateMany(editors);
  },
  bulkDelete: async (editors) => {
    return await Editor.deleteMany(editors);
  },
};
export default EditorService;
