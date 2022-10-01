import { Schema, model } from 'mongoose';

const PermissionSchema = new Schema(
  {
    name: { type: String, required: true },
    key: { type: String, required: true },
  },
  { collection: 'permissions' }
);

export const Permission = model('Permission', PermissionSchema);
