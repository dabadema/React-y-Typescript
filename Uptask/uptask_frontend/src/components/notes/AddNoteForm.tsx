import React from 'react';

export default function AddNoteForm() {
    return (
        <>
            <form onSubmit={() => {}} className="space-y-3" noValidate>
                <div className="flex flex-col gap-2">
                    <label className="font-bold" htmlFor="content">
                        {' '}
                        Create Note
                    </label>
                    <input
                        id="content"
                        type="text"
                        placeholder="Note content"
                        className="w-full p-3 border border-gray-300"
                    />
                </div>
                <input
                    type="submit"
                    value="Create Note"
                    className="bg-fuchsia-600 hover:bg-fuschia-700 w-full p-2 text-white font-black"
                />
            </form>
        </>
    );
}
