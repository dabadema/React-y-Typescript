import { Task } from '@/types/index';
import AddNoteForm from './AddNoteForm';

type NotesPanelProps = {
    notes: Task['notes'];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
    return (
        <>
            <AddNoteForm />
        </>
    );
}
