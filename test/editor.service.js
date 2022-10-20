import Editor from "../src/model/Editor.js";
import EditorService from "../src/service/editor.service.js";

const editorUsers = [
  { id: 1, username: "john" },
  { id: 2, username: "ted" },
  { id: 3, username: "mark" },
];

const newEditors = [
  { id: 1, username: "michele" },
  { id: 2, username: "antonio" },
  { id: 3, username: "nicola" },
];

jest.mock("../src/model/Editor.js", () => ({
  findById: jest
    .fn()
    .mockImplementation((id) => editorUsers.find((editor) => editor.id === id)),
  find: jest.fn().mockImplementation(() => editorUsers),
  create: jest.fn().mockImplementation((newEditor) => newEditor),
  updateOne: jest.fn().mockImplementation((updateEditor) => updateEditor),
  deleteOne: jest.fn().mockImplementation((deletedEditor) => deletedEditor),
  updateMany: jest.fn().mockImplementation((updateEditors) => updateEditors),
  deleteMany: jest.fn().mockImplementation((deletedEditors) => deletedEditors),
}));

describe("Test Editor Service", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("Should receive user editor with same ID as asked", async () => {
    let getOneEditor = await EditorService.get(1);
    expect(getOneEditor.id).toBe(1);
  });

  test("Should receive all users editor", async () => {
    let getAll = await EditorService.all();
    expect(getAll.length).toBe(3);
  });

  test("Should receive user editor created", async () => {
    let newEditor = { id: 3, username: "rob" };
    let newEditorFromDB = await EditorService.add(newEditor);
    expect(newEditorFromDB.username).toBe(newEditor.username);
  });

  test("Should receive user editor updated", async () => {
    let updatedEditor = { id: 2, username: "ciccio" };
    let updatedEditorFromDB = await EditorService.edit(updatedEditor);
    expect(updatedEditorFromDB.username).toBe(updatedEditor.username);
  });

  test("Should receive user editor deleted", async () => {
    let deletedEditor = editorUsers[0];
    let deletedEditorFromDB = await EditorService.delete(deletedEditor);
    expect(deletedEditorFromDB.username).toBe(deletedEditor.username);
  });

  test("Should receive all users editor updated", async () => {
    let deletedEditorFromDB = await EditorService.bulkEdit(newEditors);
    expect(deletedEditorFromDB.length).toBe(newEditors.length);
  });

  test("Should receive all users editor deleted", async () => {
    let deletedEditorFromDB = await EditorService.bulkDelete(newEditors);
    expect(deletedEditorFromDB.length).toBe(newEditors.length);
  });

});
