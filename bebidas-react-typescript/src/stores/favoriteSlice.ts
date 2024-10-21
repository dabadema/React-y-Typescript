import { Recipe } from '../types';
import { StateCreator } from 'zustand';

export type FavoriteSliceType = {
    favorites: Recipe[];
};

export const createFavoriteSlice: StateCreator<FavoriteSliceType> = () => ({
    favorites: [],
});
