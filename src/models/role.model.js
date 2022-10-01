import { Schema, model } from 'mongoose';
import { Permission } from './permission.model.js';

const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: Permission }],
  },
  { collection: 'roles', timestamps: true }
);

export const Role = model('Role', RoleSchema);
