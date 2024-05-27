import { create } from 'zustand';
import {login, refreshToken} from '@api/apis.js';

const useAuthStore = create((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  removeToken: () => set({ token: null }),
}));

export const loginEffect = (username, password) => async (set) => {
  try {
    const token = await login(username, password);
    set({ token });
  } catch (error) {
    console.error(error);
  }
}

export const refreshTokenEffect = () => async (set) => {
  try {
    const token = await refreshToken();
    set({ token });
  } catch (error) {
    console.error(error);
  }
}

export default useAuthStore;

