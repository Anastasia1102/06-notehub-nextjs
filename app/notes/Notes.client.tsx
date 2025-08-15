'use client';

import { useState } from "react";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResp } from "../../lib/api";
import { useDebounce } from "use-debounce";

import css from "./NotesPage.module.css";

import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";


interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
  initialData: FetchNotesResp;
}

export default function NotesClient({initialPage,initialSearch,initialData}:NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const queryClient = useQueryClient();

  const { data } = useQuery<FetchNotesResp>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: keepPreviousData,
    initialData:page===initialPage && debouncedSearch===initialSearch ? initialData : undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

 const handleNoteCreate = () => {
    setPage(1);
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={handleNoteCreate} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}