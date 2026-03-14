import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    role: { type: String, required: true, default: 'CLIENT', enum: ['CLIENT', 'FREELANCER', 'ADMIN'] },
    
    // Freelancer specific fields
    title: { type: String, required: false },
    hourlyRate: { type: Number, required: false },
    skills: { type: String, required: false },
    bio: { type: String, required: false, default: '' },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
