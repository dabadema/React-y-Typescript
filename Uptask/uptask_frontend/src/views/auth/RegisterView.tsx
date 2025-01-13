import { useForm } from 'react-hook-form';
import { UserRegistrationForm } from '@/types/index';
import ErrorMessage from '@/components/ErrorMessage';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createAccount } from '@/api/AuthAPI';

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    });

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => {
        console.log('Form data:', formData);
        mutate(formData);
    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">Create account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill the form to {''}
                <span className=" text-fuchsia-500 font-bold">sign up</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5 ">
                    <label className="font-normal text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register('email', {
                            required: 'Emails is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'E-mail not valid',
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Name</label>
                    <input
                        type="name"
                        placeholder="Name"
                        className="w-full p-3  border-gray-300 border"
                        {...register('name', {
                            required: 'User name is required',
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="flex flex-col gap-5">
                    <label className="font-normal text-2xl">Repeat Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repeat your Password "
                        className="w-full p-3  border-gray-300 border"
                        {...register('password_confirmation', {
                            required: 'Repeat password is required',
                            validate: (value) => value === password || 'Passwords are not matching',
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Sign up"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-8 flex flex-col space-y-4">
                <Link to={'/auth/login'} className="text-center text-gray-300 font-normal">
                    {' '}
                    Already have an account? Sign in!{' '}
                </Link>
            </nav>
        </>
    );
}
