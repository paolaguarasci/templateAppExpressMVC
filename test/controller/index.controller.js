import IndexController from "../../src/controller/IndexController.js";

describe("Test Index Controller", function () {
  test("responds to /", () => {
    const req = {};
    const res = { render: jest.fn() };
    IndexController.home(req, res);
    expect(res.render.mock.calls[0][0]).toBe("index.twig");
  });
});
