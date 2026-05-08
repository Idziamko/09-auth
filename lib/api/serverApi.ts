import axios from 'axios';
import { cookies } from 'next/headers';
import type { AxiosResponse } from 'axios';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { FetchNotesParams, FetchNotesResponse } from './clientApi';

const serverApi = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
  return { Cookie: allCookies };
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const headers = await getAuthHeaders();
  const { data } = await serverApi.get<FetchNotesResponse>('/notes', { params, headers });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getAuthHeaders();
  const { data } = await serverApi.get<Note>(`/notes/${id}`, { headers });
  return data;
}

export async function checkSession(): Promise<AxiosResponse | null> {
  try {
    const headers = await getAuthHeaders();
    const response = await serverApi.get('/auth/session', { headers });
    return response;
  } catch (error) {
    return null;
  }
}

export async function getMe(): Promise<User> {
  const headers = await getAuthHeaders();
  const { data } = await serverApi.get<User>('/users/me', { headers });
  return data;
}
