import { create } from 'zustand';

const conversationStore = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  unreadCount: {},
  setUnreadCount: (chatId, unreadCount) => set((state) => ({ unreadCount: { ...state.unreadCount, [chatId]: unreadCount } })),
  lastMessage: {},
  setLastMessage: (chatId, lastMessage) => set((state) => ({ lastMessage: { ...state.lastMessage, [chatId]: lastMessage } })),
  newMessage: 0,
  setNewMessage: () => set((state) => ({ newMessage: state.newMessage + 1 })),
  modifiedDate: {},
  setModifiedDate: (chatId, modifiedDate) => set((state) => ({ modifiedDate: { ...state.modifiedDate, [chatId]: modifiedDate } })),
}));

export default conversationStore;

