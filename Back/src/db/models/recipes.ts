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
    img: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: 'ingredients',
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const RecipesCollection = model('recipes', recipes);
