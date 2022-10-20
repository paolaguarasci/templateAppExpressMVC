import AuthController from "../src/controller/AuthController.js";
import AuthService from "../src/service/auth.service.js";

const adminUsers = [{ id: 1, name: "john" }];

jest.mock("../src/service/auth.service.js", () => ({
  registration: jest.fn().mockResolvedValue(adminUsers),
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

  test("redirect to login /auth/logout", async () => {
    const req = { logout: jest.fn() };
    const res = { redirect: jest.fn() };
    await AuthController.logout(req, res);
    expect(res.redirect.mock.calls.length).toEqual(1);
    expect(res.redirect.mock.calls[0][0]).toBe("/auth/login");
  });

  test("redirect to original url if different from /auth/login", async () => {
    const req = { originalUrl: "/admin" };
    const res = { redirect: jest.fn() };
    await AuthController.loginPost(req, res);
    expect(res.redirect.mock.calls[0][0]).toBe("/admin");
  });

  test("redirect to '/' if original url is /auth/login", async () => {
    const req = { originalUrl: "/auth/login" };
    const res = { redirect: jest.fn() };
    await AuthController.loginPost(req, res);
    expect(res.redirect.mock.calls[0][0]).toBe("/");
  });

  test("registrstion post should call AuthService.registration", async () => {
    const req = {};
    const res = { render: jest.fn() };
    await AuthController.registrationPost(req, res);
    expect(AuthService.registration).toHaveBeenCalledTimes(1);
  });

  test("registrstion post should redirect to '/'", async () => {
    const req = {};
    const res = { redirect: jest.fn() };
    await AuthController.registrationPost(req, res);
    expect(res.redirect.mock.calls[0][0]).toBe("/");
  });

  test("registrstion post should render error page if auth service throw excpetion", async () => {
    const req = {};
    const res = { render: jest.fn() };

    (AuthService.registration = jest.fn().mockImplementation(() => {
      throw new Error("Errore generico dal service");
    })),
      await AuthController.registrationPost(req, res);
    expect(res.render.mock.calls[0][0]).toBe("error.twig");
  });
});
