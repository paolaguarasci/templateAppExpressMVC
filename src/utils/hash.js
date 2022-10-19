import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashUtils = {
  async genSalt() {
    return await bcrypt.genSalt(saltRounds);
  },
  async getHash(text, salt = null) {
    if (!salt) {
      salt = await this.genSalt();
    }
    return await bcrypt.hash(text, salt);
  },
  async compareTextWithHash(text, hash) {
    return await bcrypt.compare(text, hash);
  },
};
