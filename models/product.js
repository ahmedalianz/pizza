import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    prices: { type: [Number], required: true },
    extraOptions: {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);
export default models.Product || model("Product", ProductSchema);
