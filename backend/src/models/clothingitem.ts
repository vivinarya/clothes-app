import {model , Document, Schema} from 'mongoose';

export interface IClothingItem extends Document {
  name: String;
  type : String;
  color: String;
  imageUrl: String;
}

const clothingSchema = new Schema<IClothingItem>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, {
  timestamps: true
});

const ClothingItem = model<IClothingItem>('ClothingItem', clothingSchema);
export default ClothingItem;
