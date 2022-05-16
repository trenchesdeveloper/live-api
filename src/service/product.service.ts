import {
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProductModel, { ProductDocument, ProductInput } from "../models/product.model";

export const createProduct = async (
  input: ProductInput
) => {
  try {
    return await ProductModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

// find product
export const findProduct = async (
  query: FilterQuery<ProductDocument>,
  queryOptions: QueryOptions = { lean: true }
) => {
  try {
    return ProductModel.findOne(query, {}, queryOptions);
  } catch (error: any) {
    throw new Error(error);
  }
};

//find and update product
export const updateProduct = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) => {
  try {
    return ProductModel.updateOne(query, update, options);
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete product
export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  try {
    return ProductModel.deleteOne(query);
  } catch (error: any) {
    throw new Error(error);
  }
};
