

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  bodyShape?: string;
  faceStructure?: string;
  preferences?: {
    colors?: string[];
    styles?: string[];
    brands?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  
  bodyShape: {
    type: String,
    enum: ['rectangle', 'triangle', 'inverted-triangle', 'hourglass', 'oval'],
    default: null
  },
  
  faceStructure: {
    type: String,
    enum: ['oval', 'round', 'square', 'heart', 'diamond', 'long'],
    default: null
  },
  
  preferences: {
    colors: [{
      type: String,
      lowercase: true
    }],
    styles: [{
      type: String,
      lowercase: true
    }],
    brands: [{
      type: String
    }]
  }
  
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;



