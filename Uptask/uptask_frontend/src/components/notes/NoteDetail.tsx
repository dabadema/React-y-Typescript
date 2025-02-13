import { useAuth } from '@/hooks/useAuth';
import { Note } from '@/types/index';
import { formatDate } from '@/utils/utils';
import { useMemo } from 'react';

type NoteDetailProps = {
    note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
    const { data, isLoading } = useAuth();

    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

    if (isLoading) return 'Cargando...';
    if (data)
        return (
            <>
                <div className="p-3 flex justify-between items-center ">
                    <div>
                        <p>
                            {note.content} por:{' '}
                            <span className="font-bold"> {note.createdBy.name} </span>
                        </p>
                        <p className="text-xs text-slate-500 mt-2">{formatDate(note.createdAt)}</p>
                    </div>
                    {canDelete && <button className=" hover:text-red-500">Delete</button>}
                </div>
            </>
        );
}
