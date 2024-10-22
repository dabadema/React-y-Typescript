import { Recipe } from '../types';
import { StateCreator } from 'zustand';
import { createRecipesSlice, RecipesSliceType } from './recipeSlice';
import { createNotificationSlice, NotificationSliceType } from './notificationSlice';

export type FavoriteSliceType = {
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
    favoriteExists: (id: Recipe['idDrink']) => boolean;
    loadFromStorage: () => void;
};

export const createFavoriteSlice: StateCreator<
    FavoriteSliceType & RecipesSliceType & NotificationSliceType,
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
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se eliminó de favoritos',
                error: false,
            });
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe],
            }));
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agregó a favoritos',
                error: false,
            });
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
