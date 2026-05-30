import { Schema, model, models, Types } from "mongoose";
import { HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";
export enum RoleValues {
  ADMIN = "ADMIN",
  USER = "USER",
}
interface User {
  Name: string;
  username: string;
  profilePic?: string;
  email: string;
  password: string;
  role: RoleValues;
}

const UserSchema = new Schema<User>(
  {
    Name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 15,
    },
    profilePic: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    role: {
      type: String,
      enum: Object.values(RoleValues),
      default: RoleValues.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
UserSchema.pre("save", async function (next) {
  try {
    // @ts-ignore
    if (!this.isModified("password")) return next();

    const saltRounds = 10;

    // @ts-ignore
    this.password = await bcrypt.hash(this.password, saltRounds);
    // @ts-ignore
    next();
  } catch (error) {
    // @ts-ignore
    next(error);
  }
});
UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};
export const User = models.User || model<User>("User", UserSchema);
