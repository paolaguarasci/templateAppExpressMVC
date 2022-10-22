import AuthController from "../../src/controller/AuthController.js";
import AuthService from "../../src/service/auth.service.js";
import passport from "passport";

const adminUsers = [{ id: 1, username: "john", role: "admin" }];

jest.mock("../../src/service/auth.service.js", () => ({
  registration: jest.fn().mockResolvedValue(adminUsers),
}));

jest.mock("../../src/service/userbase.service.js", () => ({
  get: jest.fn().mockResolvedValue(adminUsers[0]),
}));

jest.mock("passport", () => ({
  autenticate: jest.fn().mockImplementation(() => { return true;}),
}));

describe("Test Auth Controller", function () {
  test("responds to /auth/login", async () => {
    const req = {};
    const res = { render: jest.fn() };
    await AuthController.loginGet(req, res);
    expect(res.render.mock.calls[0][0]).toBe("auth/login.twig");
  });

  test("responds to /auth/registration", async () => {
    const req = {};
    const res = { render: jest.fn() };
    await AuthController.registrationGet(req, res);
    expect(res.render.mock.calls[0][0]).toBe("auth/registration.twig");
  });

  test("call logout function in /auth/logout", async () => {
    const req = { logout: jest.fn() };
    const res = { redirect: jest.fn() };
    await AuthController.logout(req, res);
    expect(req.logout.mock.calls.length).toEqual(1);
  });

  test("logoutPost should call logout passport", async () => {
    const req = { logout: jest.fn()};
    const res = { };
    await AuthController.logout(req, res);
    expect(req.logout.mock.calls.length).toEqual(1);
  });


  test("logoutPost should redirect to /auth/login", async () => {
    const req = { logout: jest.fn().mockImplementation((cb) => { return cb() }) };
    const res = { redirect: jest.fn() };
    await AuthController.logout(req, res);
    expect(res.redirect.mock.calls[0][0]).toBe("/auth/login");
  });


  test("redirect to user home after login", async () => {
    const req = { session: { passport: { user: 1 } } };
    const res = { redirect: jest.fn() };
    await AuthController.loginPost(req, res);
    expect(res.redirect.mock.calls[0][0]).toBe("/admin");
  });

  test("registrstion post should call AuthService.registration", async () => {
    const req = {};
    const res = { render: jest.fn() };
    await AuthController.registrationPost(req, res);
    expect(AuthService.registration).toHaveBeenCalledTimes(1);
  });

  test("registration post should redirect to '/user'", async () => {
    const req = {};
    const res = { redirect: jest.fn() };

    // MOCK SUCCES REDIRECT
    /* eslint-disable no-unused-vars */
    passport.authenticate = jest.fn((authType, options, callback) => (req, res, next) => { res.redirect('/user') });

    await AuthController.registrationPost(req, res);
    expect(res.redirect.mock.calls[0][0]).toBe("/user");
  });

  test("registration post should render same page if auth service throw excpetion", async () => {
    const req = {};
    const res = { render: jest.fn() };

    (AuthService.registration = jest.fn().mockImplementation(() => {
      throw new Error("Errore generico dal service");
    })),
      await AuthController.registrationPost(req, res);
    expect(res.render.mock.calls[0][0]).toBe("auth/registration.twig");
  });
});
