import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';

export default function AppLayout() {
    return (
        <>
            <header className="bg-gray-800 text-white py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Logo />
                    </div>
                </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center text-gray-500">
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>
        </>
    );
}