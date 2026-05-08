import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import { FetchNotesParams, FetchNotesResponse } from './clientApi';

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};
const baseURL = getBaseUrl() + '/api';

async function fetchWithCookies(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

  const headers = new Headers(options.headers);
  headers.set('Cookie', allCookies);

  const res = await fetch(`${baseURL}${endpoint}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.perPage) searchParams.set('perPage', params.perPage.toString());
  if (params.search) searchParams.set('search', params.search);
  if (params.tag) searchParams.set('tag', params.tag);

  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return fetchWithCookies(`/notes${queryString}`);
}

export async function fetchNoteById(id: string): Promise<Note> {
  return fetchWithCookies(`/notes/${id}`);
}

export async function checkSession(): Promise<User | null> {
  try {
    return await fetchWithCookies('/auth/session');
  } catch (error) {
    return null;
  }
}

export async function getMe(): Promise<User> {
  return fetchWithCookies('/users/me');
}
