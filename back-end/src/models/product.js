import { string } from "joi";
import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Product", productSchema);

// export const Product = mongoose.model("Product", productSchema);
