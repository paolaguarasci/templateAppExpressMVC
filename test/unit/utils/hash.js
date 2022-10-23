import bcrypt from "bcrypt";
import {hashUtils} from "../../../src/utils/hash.js";

const exampleHash = 1;
const exampleSalt = 1;

describe("Hash Utils", function () {
  test("generate salt", async () => {
    let expectedSalt = 1;
    bcrypt.genSalt = jest.fn().mockImplementation(() => exampleSalt);
    let generatedSalt = await hashUtils.genSalt();
    expect(expectedSalt).toBe(generatedSalt);
  });


  test("get hash - no salt", async () => {
    let expectedHash = 1;
    bcrypt.hash = jest.fn().mockImplementation(() => exampleHash)
    let generatedHash = await hashUtils.getHash("test");
    expect(expectedHash).toBe(generatedHash);
  });

  test("get hash - with salt", async () => {
    let expectedHash = 1;
    bcrypt.hash = jest.fn().mockImplementation(() => exampleHash)
    let generatedHash = await hashUtils.getHash("test", "salt");
    expect(expectedHash).toBe(generatedHash);
  });

  test("compare hash", async () => {
    let expectedHash = 1;
    bcrypt.compare = jest.fn().mockImplementation(() => 1)
    let generatedHash = await hashUtils.compareTextWithHash("test", "hash");
    expect(expectedHash).toBe(generatedHash);
  });

});
