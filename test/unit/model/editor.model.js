// deepcode ignore NoHardcodedPasswords/test: <please specify a reason of ignoring this>
import Editor from "../../../src/model/Editor.js";
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

describe("Editor", function () {
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
    const validUser = new Editor(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).toBeDefined();
  });

  test("create user should be have role==='editor'", async () => {
    const validUser = new Editor(userData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.role).toBe("editor");
  });

  it("insert user successfully, but the field not defined in schema should be undefined", async () => {
    const userWithInvalidField = new Editor({
      ...userData,
      nickname: "Handsome TekLoon",
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  it("create user with wrong username should failed", async () => {
    const userWithoutRequiredField = new Editor(userDataWithWrongUsername);
    let err;
    try {
      const savedUserWithoutRequiredField =
        await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
  });

  it("create user with existent username should failed", async () => {
    const user1 = new Editor(userData);
    const user2 = new Editor(userData);
    let err;
    try {
      const savedUser1 = await user1.save();
      const savedUser2 = await user2.save();
    } catch (error) {
      err = error;
    }
    expect(err.message).toBe("Username alredy present");
  });

  it("create user with wrong password should failed", async () => {
    const userWithoutRequiredField = new Editor(userDataWithWrongPassword);
    let err;
    try {
      const savedUserWithoutRequiredField =
        await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
    expect(err.properties.message).toBe("Validator failed for password");
  });

  it("create user with short password should failed", async () => {
    const userWithoutRequiredField = new Editor(userDataWithShortPassword);
    let err;
    try {
      const savedUserWithoutRequiredField =
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
    const userWithoutRequiredField = new Editor(userDataWithLongPassword);
    let err;
    try {
      const savedUserWithoutRequiredField =
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
    const userWithoutRequiredField = new Editor(userDataWithStrangePassword);
    let err;
    try {
      const savedUserWithoutRequiredField =
        await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
      console.log("err ", err);
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
    expect(err.properties.message).toBe("Validator failed for password");
  });

  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new Editor({ name: "TekLoon" });
    let err;
    try {
      const savedUserWithoutRequiredField =
        await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

  // it("compare password should return false if candidate password is wrong", async () => {
  //   const user = new Editor(userData);

  //   let err;
  //   try {
  //     let isRightPass = user.comparePassword(userData.password);
  //   } catch (error) {
  //     err = error;
  //     console.log("errorreeeee \n\n\n", err);
  //   }
  //   expect(err).toBeInstanceOf(mongoose.Error.ValidatorError);
  //   expect(err.properties.message).toBe(
  //     "Password must be length between 8 and 32 charters"
  //   );
  // });
});
