import { api } from './moodify';

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function register(email: string, password: string, displayName?: string) {
  const { data } = await api.post('/auth/register', { 
    email, 
    password, 
    display_name: displayName 
  });
  return data;
}
