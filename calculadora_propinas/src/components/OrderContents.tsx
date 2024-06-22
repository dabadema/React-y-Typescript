import { OrderItem } from '../types';

type orderContentsProps = {
    order: OrderItem[];
};

export default function OrderContents({ order }: orderContentsProps) {
    return (
        <div>
            <h2 className="font-black text-4xl">Consumo</h2>

            <div className="space-y-3 mt-5">
                {order.length === 0 ? (
                    <p className="text-center"> La orden está vacía </p>
                ) : (
                    order.map((item) => (
                        <div key={item.id}>
                            <p> {item.name} </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
