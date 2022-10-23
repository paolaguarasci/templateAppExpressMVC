import { hashUtils } from "../utils/hash.js";
import mongoose from "mongoose";
const UserBaseSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      trim: true,
      minLenght: [8, "Username min length is 8"],
      maxLenght: [15, "Username max length is 15"],
      match: [/^[A-Za-z][A-Za-z0-9_-]{8,15}$/, "Usernamessss not match"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { discriminatorKey: "role" }
);

UserBaseSchema.pre("save", async function (next) {
  const newDoc = this;
  const original = await this.constructor.findOne({ username: this.username });
  if (original) {
    throw new Error("Username alredy present");
  }
  await this.validatePassword(newDoc);
  newDoc.password = await hashUtils.getHash(newDoc.password);
  next();
});

UserBaseSchema.methods.validatePassword = async function (newUser) {
  let candidatePassword = newUser.password;
  if (candidatePassword.length < 8 || candidatePassword.length > 32) {
    throw new Error("Password must be length between 8 and 32 charters");
  }
  candidatePassword = candidatePassword.trim();
  /**
   * (?=.*\d)         should contain at least 1 digit
   * (?=(.*\W){2})    should contain at least 2 special characters
   * (?=.*[a-zA-Z])   should contain at least 1 alphabetic character
   * (?!.*\s)         should not contain any blank space
   * {8,32}           should be length between 8 and 32 chars
   */
  const regExp = /^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s).{8,32}$/;
  if (!regExp.test(candidatePassword)) {
    throw new Error("Password format is incorrect!");
  }
};

UserBaseSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const user = await UserBase.findOne({ username: this.username }).select(
      "+password"
    );
    const isMatch = await hashUtils.compareTextWithHash(
      candidatePassword,
      user.password
    );
    return isMatch;
  } catch (err) {
    throw Error("Password dont match");
  }
};

const UserBase = mongoose.model("User", UserBaseSchema);
export default UserBase;
