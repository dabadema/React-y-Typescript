import { Recipe } from '../types';
import { StateCreator } from 'zustand';
import { createRecipesSlice, RecipesSliceType } from './recipeSlice';

export type FavoriteSliceType = {
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
    favoriteExists: (id: Recipe['idDrink']) => boolean;
    loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
    FavoriteSliceType & RecipesSliceType,
    [],
    [],
    FavoriteSliceType
> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(
                    (favorite) => favorite.idDrink !== recipe.idDrink
                ),
            }));
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe],
            }));
        }
        createRecipesSlice(set, get, api).closeModal();
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    favoriteExists: (id) => {
        return get().favorites.some((favorite) => favorite.idDrink === id);
    },
    loadFromStorage: () => {
        const storeFavorites = localStorage.getItem('favorites');
        if (storeFavorites) {
            set({ favorites: JSON.parse(storeFavorites) });
        }
    },
});
