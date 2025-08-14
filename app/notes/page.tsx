import NotesClient from "./Notes.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes Page",
};

export default function NotesPage() {
  
  return <NotesClient />;
}
