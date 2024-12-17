import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils';

type ProductDetailsProps = {
    product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
    const isAvailable = product.availability;

    const navigate = useNavigate();

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">{product.name}</td>
            <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
            <td className="p-3 text-lg text-gray-800">
                {isAvailable ? 'Dispoinible' : 'No Disponible'}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() =>
                            navigate(`productos/${product.id}/editar`, {
                                state: {
                                    product,
                                },
                            })
                        }
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-xs text-center font-bold"
                    >
                        Editar
                    </button>
                </div>
            </td>
        </tr>
    );
}
