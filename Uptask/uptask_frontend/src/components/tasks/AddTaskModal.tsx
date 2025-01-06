import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { TaskFormData } from '@/types/index';

export default function AddTaskModal() {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const modalTask = queryParams.get('newTask');
    const showModal = modalTask ? true : false;

    const initialValues: TaskFormData = {
        name: '',
        description: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormData>({
        defaultValues: initialValues,
    });

    const handleCreateTask = (formData: TaskFormData) => {
        console.log(formData);
    };

    return (
        <>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => navigate(location.pathname, { replace: true })}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle as="h3" className="font-black text-4xl  my-5">
                                        New Task
                                    </DialogTitle>

                                    <p className="text-xl font-bold">
                                        Fill the form and create {''}
                                        <span className="text-fuchsia-600">a task</span>
                                    </p>

                                    <form className="mt-10 space-y-3" noValidate>
                                        <TaskForm register={register} errors={errors} />

                                        <input
                                            type="submit"
                                            value="Save Task"
                                            className="bg-fuchsia-600 hover:bg-fuschia-700 font-bold cursor-pointer uppercase transition-colors text-white w-full p-3"
                                            onClick={handleSubmit(handleCreateTask)}
                                        />
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}