import { api } from '@/app/api/api';
import { cookies } from 'next/headers';
import type { AxiosResponse } from 'axios';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { FetchNotesParams, FetchNotesResponse } from './clientApi';

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
  return { Cookie: allCookies };
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<FetchNotesResponse>('/notes', { params, headers });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, { headers });
  return data;
}

export async function checkSession(): Promise<AxiosResponse | null> {
  try {
    const headers = await getAuthHeaders();
    const response = await api.get('/auth/session', { headers });
    return response;
  } catch (error) {
    return null;
  }
}

export async function getMe(): Promise<User> {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User>('/users/me', { headers });
  return data;
}
