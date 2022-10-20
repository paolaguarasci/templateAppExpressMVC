// deepcode ignore NoHardcodedPasswords/test: <please specify a reason of ignoring this>
import AuthService from "../src/service/auth.service.js";
import User from "../src/model/User.js";
import UserBase from "../src/model/UserBase.js";

/**
  registration: async (registrationRequest) => {
    try {
      return await User.create({
        username: registrationRequest.username,
        password: registrationRequest.password,
      });
    } catch (e) {
      throw Error(e);
    }
  },
  login: async (username, candidatePassword) => {
    let user = await UserBase.findOne({ username: username });
    let checkPassword = await user.comparePassword(candidatePassword);
    return checkPassword ? user : {};
  },
  logout: () => {},
 */

const userUsers = [
  { id: 1, username: "john" },
  { id: 2, username: "ted" },
  { id: 3, username: "mark" },
];

jest.mock(UserBase, 'comparePassword').mockImplementation((candidatePassword) => true)

jest.mock("../src/model/User.js", () => ({
  create: jest
    .fn()
    .mockImplementation((request) => { return { username: request.username, password: request.password} }),
}));

jest.mock("../src/model/UserBase.js", () => ({
  findOne: jest
    .fn()
    .mockImplementation((criteria) => { return { username: criteria.username } }),
}));

describe("Test Auth Service", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("Should receive user user with same ID as asked", async () => {
    let savedUserOnDB = await AuthService.registration({ username: "ciccio", password: "pasticcio"});
    expect(savedUserOnDB.username).toBe("ciccio");
  });

  test("Should receive user user with same ID as asked", async () => {
    let savedUserOnDB = await AuthService.login("ciccio", "pasticcio");
    expect(savedUserOnDB.username).toBe("ciccio");
  });

});
