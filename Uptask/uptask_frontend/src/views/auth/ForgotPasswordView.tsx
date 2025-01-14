import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ForgotPasswordForm } from '../../types';
import ErrorMessage from '@/components/ErrorMessage';

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: '',
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const handleForgotPassword = (formData: ForgotPasswordForm) => {};

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reset Password </h1>
            <p className="text-2xl font-light text-white mt-5">
                Did you forget your password? Introduce your email {''}
                <span className=" text-fuchsia-500 font-bold">and reset your password</span>
            </p>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10 mt-10 bg-white rounded-lg"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'E-mail not valid',
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    value="Send instructions"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link to="/auth/login" className="text-center text-gray-300 font-normal">
                    Already have an account? Sign in!{' '}
                </Link>

                <Link to="/auth/register" className="text-center text-gray-300 font-normal">
                    Still does not have an account? Create one!
                </Link>
            </nav>
        </>
    );
}
