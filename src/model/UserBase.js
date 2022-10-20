import { hashUtils } from "../utils/hash.js";
import mongoose from "mongoose";
[6, 'Too few eggs']
var UserBaseSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      trim: true,
      minLenght: [8,"Username min length is 8"],
      maxLenght: [15, "Username max length is 15"],
      match: [/^[A-Za-z][A-Za-z0-9_-]{8,15}$/, "Usernamen not match"]
    },
    password: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "role" }
);

UserBaseSchema.pre("save", async function (next) {
  let new_doc = this;
  let original = await this.constructor.findOne({ username: this.username });
  if (original) {
    throw new Error("Username alredy present");
  }
  console.log("Valido la password");
  await this.validatePassword(new_doc);
  console.log("Password valida");
  new_doc.password = await hashUtils.getHash(new_doc.password);
  next();
});

UserBaseSchema.methods.validatePassword = async function (newUser) {
  let candidatePassword = newUser.password
  if (candidatePassword.length < 8 || candidatePassword.length > 32) {
    throw new Error("Password must be lenght betwen 8 and 32 charters");
  }
  console.log("candidatePassword ", candidatePassword);
  candidatePassword = candidatePassword.trim();
  /**
   * (?=.*\d)         should contain at least 1 digit
   * (?=(.*\W){2})    should contain at least 2 special characters
   * (?=.*[a-zA-Z])   should contain at least 1 alphabetic character
   * (?!.*\s)         should not contain any blank space
   * {8,32}           should be length between 8 and 32 chars
   */
  let regExp = /^(?=.*\d)(?=(.*\W){2})(?=.*[a-zA-Z])(?!.*\s).{8,32}$/;
  if (!regExp.test(candidatePassword)) {
    console.log("wrong password")
    throw new Error("Password format is incorrect!");
  }
};

UserBaseSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    let isMatch = await hashUtils.compareTextWithHash(
      candidatePassword,
      this.password
    );
    return isMatch;
  } catch (err) {
    throw Error("Password dont match");
  }
};

const UserBase = mongoose.model("User", UserBaseSchema);
export default UserBase;
