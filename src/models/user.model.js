import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { Role } from '../models/role.model.js';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: Schema.Types.ObjectId, ref: Role, required: true },
  },
  { collection: 'users', timestamps: true }
);

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre('updateOne', async function (next) {
  const user = this.getUpdate();
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export const User = model('User', UserSchema);
