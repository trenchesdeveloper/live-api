"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.findProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_model_1.default.create(input);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createProduct = createProduct;
// find product
const findProduct = (query, queryOptions = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return product_model_1.default.findOne(query, {}, queryOptions);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.findProduct = findProduct;
//find and update product
const updateProduct = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return product_model_1.default.updateOne(query, update, options);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateProduct = updateProduct;
// delete product
const deleteProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return product_model_1.default.deleteOne(query);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deleteProduct = deleteProduct;
