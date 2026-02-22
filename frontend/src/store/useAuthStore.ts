import { create } from "zustand";
import { axiosInstance } from "../lib/axios.ts";
import toast from "react-hot-toast";

interface SignupInput {
  fullName: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthState {
  authUser: any;

  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: SignupInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,

  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("error in authCheck: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  }

}));