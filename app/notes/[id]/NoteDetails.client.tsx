'use client';

import { fetchNoteById} from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import css from './NoteDetails.module.css'

const NoteDetailsClient = () => {
    const { id } = useParams<{ id: string }>()
    
    const { data: note, isLoading, isError } = useQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
      refetchOnMount: false,
    });
    
    if (isLoading) {
        return <p>Loading, please wait...</p>;
    }

    if (!note || isError) {
        return <p>Something went wrong.</p>;
    }

    return (<div className={css.container}>
        <div className={css.item}>
            <div className={css.header}>
                <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
        </div>
    </div>);
}

export default NoteDetailsClient;