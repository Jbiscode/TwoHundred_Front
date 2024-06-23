import { create } from 'zustand';

const conversationStore = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  postDetails:{},
  setPostDetails: (postDetails) => set({ postDetails }),
  unreadCount: {},
  setUnreadCount: (chatId, unreadCount) => set((state) => {
    const newUnreadCount = { ...state.unreadCount, [chatId]: unreadCount };
    const totalUnread = Object.values(newUnreadCount).reduce((sum, value) => sum + value, 0);
    return { unreadCount: newUnreadCount, totalUnread };
  }),
  lastMessage: {},
  setLastMessage: (chatId, lastMessage) => set((state) => ({ lastMessage: { ...state.lastMessage, [chatId]: lastMessage } })),
  newMessage: 0,
  setNewMessage: () => set((state) => ({ newMessage: state.newMessage + 1 })),
  modifiedDate: {},
  setModifiedDate: (chatId, modifiedDate) => set((state) => ({ modifiedDate: { ...state.modifiedDate, [chatId]: modifiedDate } })),
  totalUnread:0,
  updateTotalUnread: () => set((state) => ({
    totalUnread: Object.values(state.unreadCount).reduce((sum, value) => sum + value, 0)
  })),
}));

export default conversationStore;

