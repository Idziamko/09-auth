import { api } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface CreateNoteBody {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
}

export interface SessionResponse {
  success: boolean;
}

export interface UpdateUserBody {
  username: string;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export async function createNote(body: CreateNoteBody): Promise<Note> {
  const { data } = await api.post<Note>('/notes', body);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function register(body: AuthCredentials): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/register', body);
  return data;
}

export async function login(body: AuthCredentials): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', body);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<SessionResponse | null> {
  try {
    const { data } = await api.get<SessionResponse>('/auth/session');
    return data;
  } catch (error) {
    return null;
  }
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function updateMe(body: UpdateUserBody): Promise<User> {
  const { data } = await api.patch<User>('/users/me', body);
  return data;
}
