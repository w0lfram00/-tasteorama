import { model, Schema } from 'mongoose';

const ingredientsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const IngredientsCollection = model('ingredients', ingredientsSchema);
