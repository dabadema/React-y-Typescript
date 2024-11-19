import { Link } from 'react-router-dom';

export default function Product() {
    return (
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500">Productos</h2>
            <Link
                to="/productos/nuevo"
                className="rounded-md bg-indigo-600 p-3 font-bold text-sm text-white shadow-sm hover:bg-indigo-500"
            >
                Agregar Producto
            </Link>
        </div>
    );
}
