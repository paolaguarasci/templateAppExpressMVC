// deepcode ignore NoHardcodedPasswords/test: <please specify a reason of ignoring this>
import AuthService from "../../../src/service/auth.service.js";


jest.mock("../../../src/model/UserBase.js", () => ({
  findOne: jest.fn().mockImplementation((criteria) => {
    return {
      username: criteria.username,
      role: "user",
      comparePassword: jest.fn().mockResolvedValue(true),
    };
  }),
}));

jest.mock("../../../src/model/User.js", () => ({
  create: jest.fn().mockImplementation((request) => {
    return { username: request.username, password: request.password };
  }),
}));

describe("Test Auth Service", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("Should receive user user with same ID as asked", async () => {
    let savedUserOnDB = await AuthService.registration({
      username: "ciccio",
      password: "pasticcio",
    });
    expect(savedUserOnDB.username).toBe("ciccio");
  });

  test("Should receive user user with same ID as asked", async () => {
    let savedUserOnDB = await AuthService.login("ciccio", "pasticcio");
    expect(savedUserOnDB.username).toBe("ciccio");
  });
});
