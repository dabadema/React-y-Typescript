import { useDroppable } from '@dnd-kit/core';
import { styleText } from 'util';

type DropTaskProps = {
    status: string;
};

export default function DropTask({ status }: DropTaskProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: status,
    });

    const style = {
        opacity: isOver ? 0.4 : undefined,
    };

    return (
        <div
            style={style}
            ref={setNodeRef}
            className="text-xs font-semibold border border-dashed border-slate-500 uppercase p-2 mt-5 grid place-content-center text-slate-500"
        >
            Drop the Task here
        </div>
    );
}
