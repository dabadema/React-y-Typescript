import { create } from 'zustand';
import { createRecipeSlice } from './recipeSlice';

export const useAppStore = create((...a) => ({
    ...createRecipeSlice(...a),
}));
