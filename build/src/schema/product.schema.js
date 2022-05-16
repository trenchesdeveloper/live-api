"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: "title is required",
        }),
        description: (0, zod_1.string)({
            required_error: "description is required",
        }).min(120, "description must be at least 120 characters"),
        price: (0, zod_1.number)({
            required_error: "price is required",
        }),
        image: (0, zod_1.string)({
            required_error: "image is required",
        }),
    })
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: "productId is required",
        }),
    })
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.findProductSchema = (0, zod_1.object)(Object.assign({}, params));
