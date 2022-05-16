import { UserDocument } from "./user.model";
import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export interface ProductInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}


export interface ProductDocument extends ProductInput, mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId:{
        type: String,
        unique: true,
        required: true,
        default: () => `product-${nanoid()}`
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,

    },
    title: {
      type: String,
      required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
