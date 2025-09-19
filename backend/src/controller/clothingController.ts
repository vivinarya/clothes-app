import { Request, Response } from 'express';
import ClothingItem from '../models/clothingitem.ts';

interface UploadClothingRequest extends Request {
  file?: Express.Multer.File;
}

export async function uploadClothing(req: UploadClothingRequest, res: Response){
  try {
    const { name, type, color } = req.body;
    if(!req.file){
      res.status(400).json({messgae:'image file is required'})
        return;
    }
    const imageUrl = req.file.path;
    const newClothing = new ClothingItem({ name, type, color, imageUrl });
    await newClothing.save();
    res.status(201).json(newClothing);
  } catch (error) {
    console.error('Error uploading clothing:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

