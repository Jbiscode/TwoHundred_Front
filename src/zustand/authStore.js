import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { login, refreshToken, logout } from '@api/apis.js';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isLoggedin: false,
      user: null,
      id: 0,
      alarmCount: 0,
      getToken: () => get().token,
      getUser: () => get().user,
      getId: () => get().id,
      setToken: (token) => set({ token, isLoggedin: true }),
      setUser: (user) => set({ user }),
      setId: (id) => set({ id }),
      setAlarmCount: (alarmCount) => set({ alarmCount }),
      setAlarmCountPlus: () => set((state) => ({ alarmCount: state.alarmCount + 1 })),
      removeToken: () => set({ token: null, isLoggedin: false, user: null, id: 0 }),
      login: async (username, password) => {
        try {
          const token = await login(username, password);
          set({ token, isLoggedin: true });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      refreshToken: async () => {
        try {
          const token = await refreshToken();
          console.log(token + " 토큰 재발급");
          set({ token });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      logout: async () => {
        try {
          const response = await logout();
          if(response.resultCode == 200 || response.resultCode == 403){
            set({ token: null, isLoggedin: false, user: null, id: 0, alarmCount: 0 });
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
    {
      name: 'Authorization',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;