import NotesClient from "./Notes.client";
import type { Metadata } from "next";
import { fetchNotes,type FetchNotesResp } from "@/lib/api";

export const metadata: Metadata = {
  title: "Notes Page",
};

export default async function NotesPage() {
  const initialPage = 1;
  const initialSearch = "";

  const initialData: FetchNotesResp = await fetchNotes({
    page: initialPage,
    perPage: 12,
    search: initialSearch,
  });


  return (
    <NotesClient
      initialPage={initialPage}
      initialSearch={initialSearch}
      initialData={initialData}
    />
  );
}
