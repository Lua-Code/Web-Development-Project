import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  label: String,
  fullName: String,
  phone: String,
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  isDefault: Boolean
});

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ["buyer"] }, // buyer, seller
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    phone: String,
    bio: String
  },
  addresses: [AddressSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  email: { type: String, unique: true, required: true }
});

export default mongoose.model("User", UserSchema);
