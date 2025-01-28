import { MutationOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import axios from "axios";
import { extractErrorMessage } from "@/lib/errorHandler";
import router, { Router } from "next/router";
import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const setLoadingTrue = () => {
      setIsLoading(true);
    };

    const setLoadingFalse = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", setLoadingTrue);
    Router.events.on("routeChangeError", setLoadingFalse);
    Router.events.on("hashChangeStart", setLoadingTrue);
    Router.events.on("hashChangeComplete", setLoadingFalse);
    Router.events.on("routeChangeComplete", setLoadingFalse);

    return () => {
      Router.events.off("routeChangeStart", setLoadingTrue);
      Router.events.off("routeChangeComplete", setLoadingFalse);
      Router.events.off("hashChangeStart", setLoadingTrue);
      Router.events.off("hashChangeComplete", setLoadingFalse);
      Router.events.off("routeChangeError", setLoadingFalse);
    };
  }, []);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await axios.post("/api/auth/login", credentials);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Welcome back!");
      router.replace("/");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });

  return { mutate, isPending: isLoading || isPending, error };
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
      router.push("/login");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

const logout = async () => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
};

export const useLogoutMutation = (options?: MutationOptions) => {
  return useMutation({
    mutationFn: logout,
    ...options,
  });
};

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
      toast.error(
        error.message || "Failed to send reset link. Please try again."
      );
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
      toast.error(
        error.message || "Failed to reset password. Please try again."
      );
    },
  });
};
