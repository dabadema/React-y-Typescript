import { StateCreator } from 'zustand';
import { getCategories, getRecipeById, getRecipes } from '../services/RecipeService';

import type { Categories, Drink, Drinks, Recipe, SearchFilters } from '../types';
import { FavoriteSliceType } from './favoriteSlice';

export type RecipesSliceType = {
    categories: Categories;
    drinks: Drinks;
    selectedRecipe: Recipe;
    modal: boolean;
    fetchCategories: () => Promise<void>;
    searchRecipes: (searchFilters: SearchFilters) => Promise<void>;
    selectRecipe: (id: Drink['idDrink']) => Promise<void>;
    closeModal: () => void;
};

export const createRecipesSlice: StateCreator<
    RecipesSliceType & FavoriteSliceType,
    [],
    [],
    RecipesSliceType
> = (set) => ({
    categories: {
        drinks: [],
    },
    drinks: {
        drinks: [],
    },
    selectedRecipe: {} as Recipe,
    modal: false,
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
        set({
            selectedRecipe,
            modal: true,
        });
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe,
        });
    },
});
