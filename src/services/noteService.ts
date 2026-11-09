import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NewNote } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  perPage,
  search = "",
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> =
    await api.get("/notes", {
      params: {
        page,
        perPage,
        ...(search.trim() ? { search: search.trim() } : {}),
      },
    });

  return response.data;
}

export async function createNote(
  newNote: NewNote
): Promise<Note> {
  const response: AxiosResponse<Note> =
    await api.post("/notes", newNote);

  return response.data;
}

export async function deleteNote(
  id: string
): Promise<Note> {
  const response: AxiosResponse<Note> =
    await api.delete(`/notes/${id}`);

  return response.data;
}