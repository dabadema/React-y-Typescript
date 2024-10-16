import { StateCreator } from 'zustand';
import { getCategories } from '../services/RecipeService';

import type { Categories, SearchFilters } from '../types';

export type RecipesSliceType = {
    categories: Categories;
    fetchCategories: () => Promise<void>;
    searchRecipes: (searchFilters: SearchFilters) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: [],
    },
    fetchCategories: async () => {
        const categories = await getCategories();
        set({
            categories,
        });
    },
    searchRecipes: async (filters) => {
        console.log(filters);
    },
});
