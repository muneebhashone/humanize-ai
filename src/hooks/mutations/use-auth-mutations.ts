import { MutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import axios from "axios";


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

// interface SocialAccount {
//   provider: string;
//   id: string;
// }

// interface User {
//   _id: string;
//   email: string;
//   username: string;
//   name: string;
//   role: string;
//   socialAccount: SocialAccount[];
//   createdAt: string;
//   updatedAt: string;
//   sub: string;
// }

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  userId: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({  
    mutationFn: async (credentials: LoginCredentials) => {
      
      const response = await axios.post("/api/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      router.replace("/");
      toast.success(data.message || "Welcome back!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to login. Please try again.");
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (registerData: RegisterData) => {
      const response = await api.post("/auth/register/email", registerData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Account created successfully!");
     router.push('/login')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  });
};

const logout = async () => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
}

export const useLogoutMutation = (options?: MutationOptions) => {
  return useMutation({
    mutationFn: logout,
    ...options,
  });
}

export const useForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await api.post("/auth/forget-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Reset link sent to your email!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send reset link. Please try again.");
    },
  });
};

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await api.post("/auth/reset-password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully!");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password. Please try again.");
    },
  });
};

