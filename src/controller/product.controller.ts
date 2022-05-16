import {
  findProduct,
  updateProduct,
  deleteProduct,
  createProduct,
} from "./../service/product.service";
import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import logger from "../utils/logger";

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
): Promise<Response> => {
  try {
    const userId = res.locals.user._id;

    const product = await createProduct({ ...req.body, user: userId });
    return res.status(201).send(product);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
};

export const getProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
): Promise<Response> => {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
    }

    return res.status(200).send(product);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
};

export const updateProductHandler = async (
  req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
  res: Response
): Promise<Response> => {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
    }

    if (String(product?.user) !== userId) {
      res.sendStatus(403);
    }

    const updatedProduct = await updateProduct(
      { _id: product?._id },
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).send(updatedProduct);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
};

export const deleteProductHandler = async (
  req: Request<UpdateProductInput["params"], {}, {}>,
  res: Response
): Promise<Response> => {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const product = await findProduct({ productId });

    if (!product) {
      res.sendStatus(404);
    }

    if (String(product?.user) !== userId) {
      res.sendStatus(403);
    }

    await deleteProduct({ productId });
    return res.sendStatus(200);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
};
