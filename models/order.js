import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    adress: { type: String, required: true },
    phone: { type: String },
    total: { type: Number, required: true },
    status: { type: Number, required: true, default: 0 },
    paymentMethode: { type: Number, required: true },
  },
  { timestamps: true }
);
export default models.Order || model("Order", OrderSchema);
