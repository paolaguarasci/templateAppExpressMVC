import { expect } from "@jest/globals";
import server from "../../../src/app.js";
import superagent from "superagent";

describe("Admin Router", function () {
  it("Should retrive error 400 if try to login with wrong credentials", async () => {
    const res = await superagent
      .agent(server)
      .post("https://localhost:8443/auth/login")
      .send({ username: "hunter@hunterloftis.com", password: "password" })
      .trustLocalhost()
      .ok((res) => res.status < 500);
    expect(res.statusCode).toEqual(400);
  });

  it("should retrive ok status code 200 if try login with correct credentials", async () => {
    const res = await superagent
      .agent(server)
      .post("https://localhost:8443/auth/login")
      .trustLocalhost()
      .send({ username: "superadmin", password: "Paoletta.85@#" });
    expect(res.statusCode).toEqual(200);
  });
});
