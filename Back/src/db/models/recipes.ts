import { model, Schema } from 'mongoose';

const recipes = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    area: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
        required: true,
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const RecipesCollection = model('recipes', recipes);
