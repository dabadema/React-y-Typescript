import { StateCreator } from 'zustand';
import { FavoriteSliceType } from './favoriteSlice';

type Notificacion = {
    text: string;
    error: boolean;
    show: boolean;
};

export type NotificationSliceType = {
    notification: Notificacion;
    showNotification: (payload: Pick<Notificacion, 'text' | 'error'>) => void;
};

export const createNotificationSlice: StateCreator<
    NotificationSliceType & FavoriteSliceType,
    [],
    [],
    NotificationSliceType
> = (set) => ({
    notification: {
        text: '',
        error: false,
        show: false,
    },
    showNotification: (payload) => {
        set({
            notification: { text: payload.text, error: payload.error, show: true },
        });
    },
});
