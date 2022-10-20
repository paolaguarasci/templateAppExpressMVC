import AuthController from "../src/controller/AuthController.js";

describe("Test Auth Controller", function () {
  test("responds to /auth/login", () => {
    const req = {};
    const res = { render: jest.fn() };
    AuthController.loginGet(req, res);
    expect(res.render.mock.calls[0][0]).toBe("auth/login.twig");
  });

  test("responds to /auth/registration", () => {
    const req = {};
    const res = { render: jest.fn() };
    AuthController.registrationGet(req, res);
    expect(res.render.mock.calls[0][0]).toBe("auth/registration.twig");
  });

  test("call logout function in /auth/logout", () => {
    const req = { logout: jest.fn() };
    const res = { redirect: jest.fn() };
    AuthController.logout(req, res);
    expect(req.logout.mock.calls.length).toEqual(1)
  });

  test("redirect to login /auth/logout", () => {
    const req = { logout: jest.fn() };
    const res = { redirect: jest.fn() };
    AuthController.logout(req, res);
    expect(res.redirect.mock.calls.length).toEqual(1)
    expect(res.redirect.mock.calls[0][0]).toBe("/auth/login");
  });

});
