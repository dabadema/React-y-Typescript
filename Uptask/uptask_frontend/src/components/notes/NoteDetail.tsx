import { Note } from '@/types/index';
import { formatDate } from '@/utils/utils';

type NoteDetailProps = {
    note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
    return (
        <div className="p-3 flex-col justify-between items-center ">
            <p>
                {note.content} por: <span className="font-bold"> {note.createdBy.name} </span>
            </p>
            <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
        </div>
    );
}
