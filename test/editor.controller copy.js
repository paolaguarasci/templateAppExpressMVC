import EditorController from "../src/controller/EditorController.js";
import UserService from "../src/service/user.service.js";

const userUsers = [{ id: 3, name: "ted" }];

jest.mock("../src/service/user.service.js", () => ({
  all: jest.fn().mockResolvedValue(userUsers),
}));

const req = {};
const res = { render: jest.fn() };

describe("Test Editor Controller", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("responds to /editor with editor homepage", async () => {
    await EditorController.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("editor/home.twig");
  });

  test("title of editor homepage should be 'Editor Home'", async () => {
    await EditorController.home(req, res);
    expect(res.render.mock.calls[0][1].title).toBe("Editor Home");
  });

  test("call UserService in home editor response", async () => {
    await EditorController.home(req, res);
    expect(UserService.all).toHaveBeenCalledTimes(1);
  });

  test("check UserService data", async () => {
    await EditorController.home(req, res);
    let responseDataJson = JSON.parse(await res.render.mock.calls[0][1].data);
    await expect(responseDataJson.userList[0].name).toBe(userUsers[0].name);
  });
});
