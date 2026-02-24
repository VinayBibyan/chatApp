import {create} from "zustand"
import { axiosInstance } from "../lib/axios.ts"
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.ts";

interface MessageData {
  text: string,
  image: string | null
}

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
  sendMessage: (messageData: MessageData) => Promise<void>;

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
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong in getMessagesByUserId");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get()
    const {authUser} = useAuthStore.getState()

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser?._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: messages.concat(res.data) });
    } catch (error: any) {
      set({ messages: messages });
      toast.error(error.response?.data?.message || "Something went wrong in sendMessage");
    }
    
  }

}));