// deepcode ignore NoHardcodedPasswords/test: <please specify a reason of ignoring this>
import User from "../../../src/model/User.js";
import db from "../../db.js";
import mongoose from "mongoose";

const userData = {
  username: "TekLoon123",
  password: "TekLoon123@#",
};

const userDataWithWrongUsername = {
  username: "Tek",
  password: "TekLoon123@#",
};

const userDataWithWrongPassword = {
  username: "TekLoonXXX",
  password: "password",
};

const userDataWithShortPassword = {
  username: "TekLoonXXX",
  password: "pass  ",
};

const userDataWithLongPassword = {
  username: "TekLoonXXX",
  password: "  passwordasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd",
};

const userDataWithStrangePassword = {
  username: "TekLoonXXX",
  password: "',$or:[{},{'a':'a",
};

describe("User", function () {
  beforeEach(() => {});
  afterEach(() => {});

  beforeAll(async () => {
    await db.setUp();
  });

  afterEach(async () => {
    await db.dropCollections();
  });

  afterAll(async () => {
    await db.dropDatabase();
  });

  test("create & save user successfully", async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).toBeDefined();
  });

  test("create user should be have role==='user'", async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.role).toBe("user");
  });

  it("insert user successfully, but the field not defined in schema should be undefined", async () => {
    const userWithInvalidField = new User({
      ...userData,
      nickname: "Handsome TekLoon",
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  it("create user with wrong username should failed", async () => {
    const userWithoutRequiredField = new User(userDataWithWrongUsername);
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
  });

  it("create user with existent username should failed", async () => {
    const user1 = new User(userData);
    const user2 = new User(userData);
    let err;
    try {
      await user1.save();
      await user2.save();
    } catch (error) {
      err = error;
    }
    expect(err.message).toBe("Username alredy present");
  });

  it("create user with wrong password should failed", async () => {
    const userWithoutRequiredField = new User(userDataWithWrongPassword);
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
    expect(err.properties.message).toBe("Validator failed for password");
  });

  it("create user with short password should failed", async () => {
    const userWithoutRequiredField = new User(userDataWithShortPassword);
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
    expect(err.properties.message).toBe(
      "Password must be length between 8 and 32 charters"
    );
  });

  it("create user with long password should failed", async () => {
    const userWithoutRequiredField = new User(userDataWithLongPassword);
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
    expect(err.properties.message).toBe(
      "Password must be length between 8 and 32 charters"
    );
  });

  it("create user with strange password should failed", async () => {
    const userWithoutRequiredField = new User(userDataWithStrangePassword);
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
    expect(err.properties.message).toBe("Validator failed for password");
  });

  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new User({ name: "TekLoon" });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

  // it("compare password should return false if candidate password is wrong", async () => {
  //   const user = new User(userData);

  //   let err;
  //   try {
  //     let isRightPass = user.comparePassword(userData.password);
  //   } catch (error) {
  //     err = error;
  //   }
  //   expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
  //   expect(err.properties.message).toBe(
  //     "Password must be length between 8 and 32 charters"
  //   );
  // });
});
