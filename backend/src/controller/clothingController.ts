import { Request, Response } from 'express';
import ClothingItem from '../models/clothingitem';

export const uploadClothingController = async (req: Request, res: Response): Promise<Response> => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const { name, type, color } = req.body;

  try {
    const newClothing = new ClothingItem({
      name,
      type,
      color,
      imageUrl: req.file.filename,
    });

    await newClothing.save();

    return res.status(201).json({
      message: 'Clothing uploaded and saved successfully',
      clothing: newClothing,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error saving clothing to the database',
      error: (error as Error).message,
    });
  }
};
