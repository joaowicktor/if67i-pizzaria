import { Schema, model } from 'mongoose';

const OrderSchema = new Schema(
  {
    pizza: { type: Schema.Types.ObjectId, required: true, ref: 'Pizza' },
    quantity: { type: Number, required: true },
    address: { type: String },
    note: { type: String },
  },
  {
    collection: 'orders',
    timestamps: true,
  }
);

export const Order = model('Order', OrderSchema);
