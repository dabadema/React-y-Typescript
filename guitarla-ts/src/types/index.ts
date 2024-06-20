export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
};

export type CartItem = Omit<Guitar, 'id' | 'name' | 'price'> & {
    quantity: number;
};
