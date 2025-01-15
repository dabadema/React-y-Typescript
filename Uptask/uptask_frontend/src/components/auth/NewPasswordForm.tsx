import type { NewPasswordForm } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';

export default function NewPasswordForm() {
    const navigate = useNavigate();
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    };
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const handleNewPassword = (formData: NewPasswordForm) => {};

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >
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
                                message: 'Password must be 8 characters at least',
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
                        placeholder="Repeat password"
                        className="w-full p-3  border-gray-300 border"
                        {...register('password_confirmation', {
                            required: 'Repeat password is required',
                            validate: (value) =>
                                value === password || 'Los Passwords are not matching',
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value="Set Password"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    );
}
