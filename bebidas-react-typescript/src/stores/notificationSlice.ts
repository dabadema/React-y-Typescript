import { StateCreator } from 'zustand';

type Notificacion = {
    text: string;
    error: boolean;
    show: boolean;
};

export type NotificationSliceType = {
    notification: Notificacion;
};

export const createNotificationSlice: StateCreator<NotificationSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false,
    },
});
