import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
export default User;
