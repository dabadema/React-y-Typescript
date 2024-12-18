import { Product } from '../types';
import { ActionFunctionArgs, Form, useNavigate, redirect } from 'react-router-dom';
import { formatCurrency } from '../utils';
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
    product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id);

        return redirect('/');
    }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const isAvailable = product.availability;

    const navigate = useNavigate();

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">{product.name}</td>
            <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
            <td className="p-3 text-lg text-gray-800">
                <form method="POST">
                    <button
                        type="button"
                        name="availability"
                        value={product.availability.toString()}
                        className={`${
                            isAvailable ? 'text-black' : 'text-red-600'
                        } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase text-xs text-center font-bold"
                    >
                        Editar
                    </button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm('¿Estás seguro de que quieres eliminarlo?')) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase text-xs text-center font-bold"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
