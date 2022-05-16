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
exports.deleteProductHandler = exports.updateProductHandler = exports.getProductHandler = exports.createProductHandler = void 0;
const product_service_1 = require("./../service/product.service");
const logger_1 = __importDefault(require("../utils/logger"));
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user._id;
        const product = yield (0, product_service_1.createProduct)(Object.assign(Object.assign({}, req.body), { user: userId }));
        return res.status(201).send(product);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send(error);
    }
});
exports.createProductHandler = createProductHandler;
const getProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = yield (0, product_service_1.findProduct)({ productId });
        if (!product) {
            res.sendStatus(404);
        }
        return res.status(200).send(product);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send(error);
    }
});
exports.getProductHandler = getProductHandler;
const updateProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = yield (0, product_service_1.findProduct)({ productId });
        if (!product) {
            res.sendStatus(404);
        }
        if (String(product === null || product === void 0 ? void 0 : product.user) !== userId) {
            res.sendStatus(403);
        }
        const updatedProduct = yield (0, product_service_1.updateProduct)({ _id: product === null || product === void 0 ? void 0 : product._id }, req.body, {
            new: true,
        });
        return res.status(200).send(updatedProduct);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send(error);
    }
});
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = yield (0, product_service_1.findProduct)({ productId });
        if (!product) {
            res.sendStatus(404);
        }
        if (String(product === null || product === void 0 ? void 0 : product.user) !== userId) {
            res.sendStatus(403);
        }
        yield (0, product_service_1.deleteProduct)({ productId });
        return res.sendStatus(200);
    }
    catch (error) {
        logger_1.default.error(error);
        return res.status(500).send(error);
    }
});
exports.deleteProductHandler = deleteProductHandler;
