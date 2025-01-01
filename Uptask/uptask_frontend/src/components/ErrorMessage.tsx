import React from 'react';

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-red-600 text-center uppercase bg-red-100 font-bold text-sm p-3">
            {children}
        </div>
    );
}
