import {create} from "zustand"
import { axiosInstance } from "../lib/axios.ts"
import toast from "react-hot-toast";

export interface ChatStoreState {
  allContacts: any;
  chats: any;
  messages: any;
  activeTab: string;
  selectedUser: any | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  isSoundEnabled: boolean;
  
  toggleSound: () => void;
  setActiveTab: (tab: string) => void;
  setSelectedUser: (user: any | null) => void;

  getAllContacts: () => Promise<void>;
  getMyChatPartners: () => Promise<void>;
  getMessagesByUserId: (userId: string) => Promise<void>;


}


export const useChatStore = create<ChatStoreState>((set, get)=>({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") || "true") === true,

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue ? "true" : "false");
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
   
  getAllContacts: async() => {
    set({ isUsersLoading: true });
    try {
        const res = await axiosInstance.get("/message/contacts");
        console.log("xyz",res.data)
        set({allContacts: res.data})
    } catch (error: any) {
        console.error("error in getAllContacts: ", error);
        toast.error(error.response.data.message);
    } finally {
        set({isUsersLoading: false})
    }
  },

  getMyChatPartners: async() => {
    set({ isUsersLoading: true });
    try {
        const res = await axiosInstance.get("/message/chats");
        set({chats: res.data})
    } catch (error: any) {
        console.error("error in getMyChatPartners: ", error);
        toast.error(error.response.data.message);
    } finally {
        set({isUsersLoading: false})
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },


}));