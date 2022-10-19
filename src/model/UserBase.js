import { hashUtils } from "../utils/hash.js";
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

var UserBaseSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { discriminatorKey: "role" }
);

// UserBaseSchema.plugin(passportLocalMongoose);

UserBaseSchema.pre("save", async function (next) {
  let new_doc = this;
  let original = await this.constructor.findOne({ username: this.username });
  if (original) {
    throw new Error("Username alredy present");
  }
  new_doc.password = await hashUtils.getHash(new_doc.password);
  next();
});

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
