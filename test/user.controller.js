import UserController from "../src/controller/UserController.js";

const req = {};
const res = { render: jest.fn() };

describe("Test User Controller", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("responds to /user with user homepage", async () => {
    await UserController.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("user/home.twig");
  });

  test("title of user homepage should be 'User Home'", async () => {
    await UserController.home(req, res);
    expect(res.render.mock.calls[0][1].title).toBe("User Home");
  });

  test("check data", async () => {
    await UserController.home(req, res);
    let responseDataJson = await res.render.mock.calls[0][1].data;
    await expect(responseDataJson).toBe(JSON.stringify({}));
  });
});
