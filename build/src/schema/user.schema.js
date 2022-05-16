"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "name is required",
        }),
        email: (0, zod_1.string)({
            required_error: "email is required",
        }).email("not a valid email"),
        password: (0, zod_1.string)({
            required_error: "password is required",
        }).min(6, "password must be at least 6 characters"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "passwordConfirmation is required",
        }).min(6, "password must be at least 6 characters"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "passwordConfirmation must match password",
        path: ["passwordConfirmation"],
    }),
});
