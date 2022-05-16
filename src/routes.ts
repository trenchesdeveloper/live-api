import { createSessionSchema } from "./schema/session.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import { createUserSchema } from "./schema/user.schema";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { deserializeUser } from "./middleware/deserializeUser";
import { requireUser } from "./middleware/requireUser";
import {
  createProductSchema,
  deleteProductSchema,
  findProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validate(findProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validate(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
