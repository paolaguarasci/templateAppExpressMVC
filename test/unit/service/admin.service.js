import AdminService from "../../../src/service/admin.service.js";

const adminUsers = [
  { id: 1, username: "john" },
  { id: 2, username: "ted" },
  { id: 3, username: "mark" },
];

const newAdmins = [
  { id: 1, username: "michele" },
  { id: 2, username: "antonio" },
  { id: 3, username: "nicola" },
];

jest.mock("../../../src/model/Admin.js", () => ({
  findById: jest
    .fn()
    .mockImplementation((id) => adminUsers.find((admin) => admin.id === id)),
  find: jest.fn().mockImplementation(() => adminUsers),
  create: jest.fn().mockImplementation((newAdmin) => newAdmin),
  updateOne: jest.fn().mockImplementation((updateAdmin) => updateAdmin),
  deleteOne: jest.fn().mockImplementation((deletedAdmin) => deletedAdmin),
  updateMany: jest.fn().mockImplementation((updateAdmins) => updateAdmins),
  deleteMany: jest.fn().mockImplementation((deletedAdmins) => deletedAdmins),
}));

describe("Test Admin Service", function () {
  beforeEach(() => {});
  afterEach(() => {});

  test("Should receive user admin with same ID as asked", async () => {
    let getOneAdmin = await AdminService.get(1);
    expect(getOneAdmin.id).toBe(1);
  });

  test("Should receive all users admin", async () => {
    let getAll = await AdminService.all();
    expect(getAll.length).toBe(3);
  });

  test("Should receive user admin created", async () => {
    let newAdmin = { id: 3, username: "rob" };
    let newAdminFromDB = await AdminService.add(newAdmin);
    expect(newAdminFromDB.username).toBe(newAdmin.username);
  });

  test("Should receive user admin updated", async () => {
    let updatedAdmin = { id: 2, username: "ciccio" };
    let updatedAdminFromDB = await AdminService.edit(updatedAdmin);
    expect(updatedAdminFromDB.username).toBe(updatedAdmin.username);
  });

  test("Should receive user admin deleted", async () => {
    let deletedAdmin = adminUsers[0];
    let deletedAdminFromDB = await AdminService.delete(deletedAdmin);
    expect(deletedAdminFromDB.username).toBe(deletedAdmin.username);
  });

  test("Should receive all users admin updated", async () => {
    let deletedAdminFromDB = await AdminService.bulkEdit(newAdmins);
    expect(deletedAdminFromDB.length).toBe(newAdmins.length);
  });

  test("Should receive all users admin deleted", async () => {
    let deletedAdminFromDB = await AdminService.bulkDelete(newAdmins);
    expect(deletedAdminFromDB.length).toBe(newAdmins.length);
  });

});
