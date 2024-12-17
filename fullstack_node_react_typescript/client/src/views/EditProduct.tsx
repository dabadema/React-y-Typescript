import {
    Link,
    Form,
    useActionData,
    ActionFunctionArgs,
    redirect,
    LoaderFunctionArgs,
    useLoaderData,
} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { addProduct, getProductbyId, updateProduct } from '../services/ProductService';
import { Product } from '../types';

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductbyId(+params.id);
        if (!product) {
            return redirect('/');
        }
        return product;
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    console.log(data);

    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }

    if (error.length) return error;

    if (params.id !== undefined) {
        await updateProduct(data, +params.id);
    }

    return redirect('/');
}

export default function EditProduct() {
    const product = useLoaderData() as Product;
    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 font-bold text-sm text-white shadow-sm hover:bg-indigo-500"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage> {error}</ErrorMessage>}

            <Form className="mt-10" method="post">
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="name">
                        Nombre Producto:
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                        defaultValue={product.name}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="price">
                        Precio:
                    </label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        defaultValue={product.price}
                    />
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    );
}
