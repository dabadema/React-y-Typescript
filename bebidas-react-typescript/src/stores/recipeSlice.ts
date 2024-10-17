import { StateCreator } from 'zustand';
import { getCategories, getRecipeById, getRecipes } from '../services/RecipeService';

import type { Categories, Drink, Drinks, SearchFilters } from '../types';

export type RecipesSliceType = {
    categories: Categories;
    drinks: Drinks;
    fetchCategories: () => Promise<void>;
    searchRecipes: (searchFilters: SearchFilters) => Promise<void>;
    selectRecipe: (id: Drink['idDrink']) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: [],
    },
    drinks: {
        drinks: [],
    },
    fetchCategories: async () => {
        const categories = await getCategories();
        set({
            categories,
        });
    },
    searchRecipes: async (id) => {
        const drinks = await getRecipes(id);
        set({
            drinks,
        });
    },

    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id);
        console.log(selectedRecipe);
    },
});
