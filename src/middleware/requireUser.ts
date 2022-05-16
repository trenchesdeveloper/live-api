import { NextFunction, Request, Response } from "express";

export const requireUser = (req:Request, res: Response, next:NextFunction) => {
    if (!res.locals.user) {
        return res.status(403).send("Unauthorized");
    }
    next();
}