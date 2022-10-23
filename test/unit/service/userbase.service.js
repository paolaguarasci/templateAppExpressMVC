import UserBase from "../../../src/model/UserBase.js"
import UserBaseService from "../../../src/service/userbase.service.js";

const userUsers = [
  { id: 1, username: "john" },
  { id: 2, username: "ted" },
  { id: 3, username: "mark" },
];

const newUsers = [
  { id: 1, username: "michele" },
  { id: 2, username: "antonio" },
  { id: 3, username: "nicola" },
];

jest.mock("../../../src/model/UserBase.js", () => ({
  findById: jest
    .fn()
    .mockImplementation((id) => userUsers.find((user) => user.id === id)),
  find: jest.fn().mockImplementation(() => userUsers),
  create: jest.fn().mockImplementation((newUser) => newUser),
  updateOne: jest.fn().mockImplementation((updateUser) => updateUser),
  deleteOne: jest.fn().mockImplementation((deletedUser) => deletedUser),
  updateMany: jest.fn().mockImplementation((updateUsers) => updateUsers),
  deleteMany: jest.fn().mockImplementation((deletedUsers) => deletedUsers),
}));

describe("Test UserBase Service", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("Should receive user user with same ID as asked", async () => {
    let getOneUser = await UserBaseService.get(1);
    UserBase
    expect(getOneUser.id).toBe(1);
  });

  test("Should receive all users user", async () => {
    let getAll = await UserBaseService.all();
    expect(getAll.length).toBe(3);
  });


  test("Should receive user user updated", async () => {
    let updatedUser = { id: 2, username: "ciccio" };
    let updatedUserFromDB = await UserBaseService.edit(updatedUser);
    expect(updatedUserFromDB.username).toBe(updatedUser.username);
  });

  test("Should receive user user deleted", async () => {
    let deletedUser = userUsers[0];
    let deletedUserFromDB = await UserBaseService.delete(deletedUser);
    expect(deletedUserFromDB.username).toBe(deletedUser.username);
  });

  test("Should receive all users user updated", async () => {
    let deletedUserFromDB = await UserBaseService.bulkEdit(newUsers);
    expect(deletedUserFromDB.length).toBe(newUsers.length);
  });

  test("Should receive all users user deleted", async () => {
    let deletedUserFromDB = await UserBaseService.bulkDelete(newUsers);
    expect(deletedUserFromDB.length).toBe(newUsers.length);
  });

});
