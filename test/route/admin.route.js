import { expect, jest, test } from "@jest/globals";

import app from "../../src/app.js";
import superagent from "superagent";

describe("Test Admin Router", function () {
  test("", async () => {
    const res = await superagent
      .agent(app)
      .post("https://localhost:8443/auth/login")
      .send({ username: "hunter@hunterloftis.com", password: "password" })
      .trustLocalhost()
      .ok((res) => res.status < 500);
    await expect(res.statusCode).toEqual(400);
  });

  test("", async () => {
    const res = await superagent
      .agent(app)
      .post("https://localhost:8443/auth/login")
      .trustLocalhost()
      .send({ username: "superadmin", password: "Paoletta.85@#" });
    await expect(res.statusCode).toEqual(200); // redirect to home page
  });
});
