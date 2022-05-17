import mongoose from "mongoose";
import supertest from "supertest";
import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import createServer from "../utils/server";
import { createUserSessionHandler } from "../controller/session.controller";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "user@user.com",
  name: "John Doe",
};

const userInput = {
  email: "user@user.com",
  name: "John Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "Postman",
  createdAt: new Date("2022-09-09"),
  updatedAt: new Date("2022-09-09"),
  __v: 0,
};

describe("user", () => {
  // user registration

  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the password do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send({ ...userInput, passwordConfirmation: "pdsoddkd" });

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the users service throws", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockRejectedValue("oh no :(");

        const { statusCode } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe("create new user session", () => {
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken and refreshToken", () => {
        jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {return "a user agent"},
          body: {
            email: "user@user.com",
            password: "Password123",
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };

        //@ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });

});
