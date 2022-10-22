import AdminController from "../../src/controller/AdminController.js";
import AdminService from "../../src/service/admin.service.js";
import EditorService from "../../src/service/editor.service.js";
import UserService from "../../src/service/user.service.js";

const adminUsers = [{ id: 1, name: "john" }];
const editorUsers = [{ id: 2, name: "mike" }];
const userUsers = [{ id: 3, name: "ted" }];

jest.mock("../../src/service/admin.service.js", () => ({
  all: jest.fn().mockResolvedValue(adminUsers),
}));
jest.mock("../../src/service/editor.service.js", () => ({
  all: jest.fn().mockResolvedValue(editorUsers),
}));
jest.mock("../../src/service/user.service.js", () => ({
  all: jest.fn().mockResolvedValue(userUsers),
}));

const req = {};
const res = { render: jest.fn() };

describe("Test Admin Controller", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("responds to /admin with admin homepage", async () => {
    await AdminController.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("admin/home.twig");
  });

  test("title of admin homepage should be 'Admin Home'", async () => {
    await AdminController.home(req, res);
    expect(res.render.mock.calls[0][1].title).toBe("Admin Home");
  });

  test("call AdminService in home admin response", async () => {
    await AdminController.home(req, res);
    expect(AdminService.all).toHaveBeenCalledTimes(1);
  });
  test("call EditorService in home admin response", async () => {
    await AdminController.home(req, res);
    expect(EditorService.all).toHaveBeenCalledTimes(1);
  });

  test("call UserService in home admin response", async () => {
    await AdminController.home(req, res);
    expect(UserService.all).toHaveBeenCalledTimes(1);
  });

  test("check AdminService data", async () => {
    await AdminController.home(req, res);
    let responseDataJson = JSON.parse(await res.render.mock.calls[0][1].data);
    await expect(responseDataJson.adminList[0].name).toBe(adminUsers[0].name);
  });

  test("check EditorService data", async () => {
    await AdminController.home(req, res);
    let responseDataJson = JSON.parse(await res.render.mock.calls[0][1].data);
    await expect(responseDataJson.editorList[0].name).toBe(editorUsers[0].name);
  });

  test("check UserService data", async () => {
    await AdminController.home(req, res);
    let responseDataJson = JSON.parse(await res.render.mock.calls[0][1].data);
    await expect(responseDataJson.userList[0].name).toBe(userUsers[0].name);
  });
});
