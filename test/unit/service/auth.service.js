// deepcode ignore NoHardcodedPasswords/test: <please specify a reason of ignoring this>
import AuthService from "../../../src/service/auth.service.js";

jest.mock("../../../src/model/UserBase.js", () => ({
  findOne: jest.fn().mockImplementation((criteria) => {
    if (criteria.username !== "ciccio") {
      throw Error("User not found");
    }
    return {
      username: criteria.username,
      role: "user",
      comparePassword: jest.fn().mockImplementation((pass) => {
        return pass === "pasticcio";
      }),
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

  test("Should receive user user with same username as asked", async () => {
    let savedUserOnDB = await AuthService.login("ciccio", "pasticcio");
    expect(savedUserOnDB.username).toBe("ciccio");
  });

  test("Should trowh an empty {} if try to login with wrong password", async () => {
    const l = await AuthService.login("ciccio", "ciccio");
    expect(JSON.stringify(l)).toBe("{}");
  });

  test("Should trowh an erro if try to login with wrong username", async () => {
    let error;
    try {
      await AuthService.login("ciao", "ciccio");
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.message).toBe("Error: User not found");
  });
});
