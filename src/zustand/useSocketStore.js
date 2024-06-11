import { create } from "zustand";
import io from "socket.io-client";
const SOCKET_API_URL = import.meta.env.VITE_SOCKET_API_URL;

const useSocketStore = create((set) => ({
    socket: null,
    onlineUsers: [],
    setSocket: (newSocket) => set({ socket: newSocket }),
    setOnlineUsers: (users) => set({ onlineUsers: users }),
    initializeSocket: (userId) => {
        const newSocket = io(`${SOCKET_API_URL}/socket.io`, {
            query: { userId },
        });

        newSocket.on("getOnlineUsers", (users) => {
        set({ onlineUsers: users });
        });

        set({ socket: newSocket });
    },
    closeSocket: () =>
        set((state) => {
            state.socket?.close();
            return { socket: null };
        }),
}));

export default useSocketStore;
