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
exports.deleteSessionHandler = exports.getUserSessionHandler = exports.createUserSessionHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const config_1 = __importDefault(require("config"));
const user_service_1 = require("./../service/user.service");
const session_service_1 = require("./../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const lodash_1 = require("lodash");
const createUserSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // validate the user's password
        const user = yield (0, user_service_1.validatePassword)(req.body);
        console.log("user", user);
        if (!user) {
            return res.status(401).send("Invalid credentials");
        }
        // create a new session for the user
        const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
        console.log("session", session);
        // create an access token
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "accessTokenPrivateKey", {
            expiresIn: config_1.default.get("accessTokenTTL"),
        });
        console.log("accessToken", accessToken);
        // create a refresh token
        const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), "refreshTokenPrivateKey", {
            expiresIn: config_1.default.get("refreshTokenTTL"),
        });
        // return access token and refresh token
        return res.send({
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        logger_1.default.error(error);
    }
});
exports.createUserSessionHandler = createUserSessionHandler;
const getUserSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the user's id from res.locals
    const userId = (0, lodash_1.get)(res.locals, "user._id");
    console.log(userId);
    const sessions = yield (0, session_service_1.findSesions)({ user: userId, valid: true });
    return res.send(sessions);
});
exports.getUserSessionHandler = getUserSessionHandler;
const deleteSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = res.locals.user.session;
    yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null,
    });
});
exports.deleteSessionHandler = deleteSessionHandler;
