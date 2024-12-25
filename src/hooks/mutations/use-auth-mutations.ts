import { useMutation} from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SocialAccount {
  provider: string;
  id: string;
}

interface User {
  _id: string;
  email: string;
  username: string;
  name: string;
  role: string;
  socialAccount: SocialAccount[];
  createdAt: string;
  updatedAt: string;
  sub: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    message: string;
    token: string;
    user: User;
  };
}

export const useLoginMutation = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await axios.post<AuthResponse>("/auth/login/email", credentials);
      return data.data;
    },
    onSuccess: (data) => {
      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      // Store user data
     
      // Redirect to dashboard
      router.push("/");
      router.refresh();
      toast.success(data.message || "Welcome back!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to login. Please try again.");
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (registerData: RegisterData) => {
      const { data } = await axios.post<AuthResponse>("/auth/register/email", registerData);
      return data.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account. Please try again.");
    },
  });
}; 