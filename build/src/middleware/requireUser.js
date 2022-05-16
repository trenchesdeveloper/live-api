"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
const requireUser = (req, res, next) => {
    if (!res.locals.user) {
        return res.status(403).send("Unauthorized");
    }
    next();
};
exports.requireUser = requireUser;
