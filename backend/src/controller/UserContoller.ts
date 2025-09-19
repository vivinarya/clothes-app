// backend/controllers/UserController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.ts';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, bodyShape, faceStructure }: Partial<IUser> = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password!, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      bodyShape,
      faceStructure,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token, userId: user._id, username: user.username });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const updates: Partial<IUser> = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
