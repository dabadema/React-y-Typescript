import { OrderItem } from '../types';

export type OrderActions =
    | { type: 'add-item'; payload: { item: MenuItem } }
    | { type: 'remove-item'; payload: { id: MenuItem['id'] } }
    | { type: 'place-order' }
    | { type: 'add-tip'; payload: { value: number } };

export type OrderState = {
    order: OrderItem[];
    tip: number;
};

export const initialState = {
    order: [],
    tip: 0,
};

export const orderReducer = (state: OrderState = initialState, action: OrderActions) => {
    if (action.type === 'add-item') {
        const itemExists = state.order.find((orderItem) => orderItem.id === action.payload.item.id);
        let order: OrderItem[] = [];

        if (itemExists) {
            order = state.order.map((orderItem) =>
                (orderItem.id === orderItem.id) === action.payload.item.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            );
        } else {
            const newItem = { ...action.payload.item, quantity: 1 };
            order = [...state.order, newItem];
        }
        return {
            ...state,
            order,
        };
    }
    if (action.type === 'remove-item') {
        return {
            ...state,
        };
    }
    if (action.type === 'place-order') {
        return {
            ...state,
        };
    }
    if (action.type === 'add-tip') {
        return {
            ...state,
        };
    }
};
