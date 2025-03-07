"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRegisterMutation } from "@/hooks/mutations/use-auth-mutations";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const MainRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = useRegisterMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await register.mutateAsync(values);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-900/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-900/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="flex w-full max-w-5xl bg-black/40 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5 relative">
        {/* Left Side - Image */}
        <div className="relative hidden lg:block lg:w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center h-full p-12 text-white">
            <div className="group">
              <div className="h-28 w-28 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center mb-8 rotate-6 group-hover:rotate-0 transform transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold text-6xl bg-gradient-to-br from-white to-white/60 text-transparent bg-clip-text relative z-10">
                  H
                </span>
              </div>
            </div>
            <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-br from-white to-white/60 text-transparent bg-clip-text">
              Join Us Today!
            </h2>
            <p className="text-center text-lg text-white/60 max-w-sm">
              Create your account and start your journey with Humanize AI
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="space-y-2 text-center pb-8">
                <div className="lg:hidden flex items-center gap-2 justify-center mb-6">
                  <div className="group h-20 w-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center rotate-6 hover:rotate-0 transform transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-bold text-4xl text-white group-hover:scale-110 transition-transform duration-300">
                      H
                    </span>
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                  Create an account
                </CardTitle>
                <CardDescription className="text-base text-white/50">
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                              <div className="relative">
                                <User className="absolute left-4 top-3.5 h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                                <FormControl>
                                  <Input
                                    placeholder="Full name"
                                    className="h-14 px-12 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 transition-all duration-300 pl-12 text-white placeholder:text-white/30"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage className="text-sm text-red-500 mt-1" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                              <div className="relative">
                                <User className="absolute left-4 top-3.5 h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                                <FormControl>
                                  <Input
                                    placeholder="Username"
                                    className="h-14 px-12 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 transition-all duration-300 pl-12 text-white placeholder:text-white/30"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage className="text-sm text-red-500 mt-1" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                              <div className="relative">
                                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                                <FormControl>
                                  <Input
                                    placeholder="Email address"
                                    type="email"
                                    className="h-14 px-12 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 transition-all duration-300 pl-12 text-white placeholder:text-white/30"
                                    {...field}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage className="text-sm text-red-500 mt-1" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                              <div className="relative">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                                <FormControl>
                                  <div className="flex items-center">
                                    <Input
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Password"
                                      className="h-14 px-12 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 transition-all duration-300 pl-12 text-white placeholder:text-white/30"
                                      {...field}
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setShowPassword(!showPassword)
                                      }
                                      className="absolute right-4 top-4 text-white/30 hover:text-white/60 transition-colors duration-300"
                                    >
                                      {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                      ) : (
                                        <Eye className="h-5 w-5" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>
                              </div>
                              <FormMessage className="text-sm text-red-500 mt-1" />
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative group">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                              <div className="relative">
                                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                                <FormControl>
                                  <div className="flex items-center">
                                    <Input
                                      type={
                                        showConfirmPassword
                                          ? "text"
                                          : "password"
                                      }
                                      placeholder="Confirm password"
                                      className="h-14 px-12 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 transition-all duration-300 pl-12 text-white placeholder:text-white/30"
                                      {...field}
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setShowConfirmPassword(
                                          !showConfirmPassword
                                        )
                                      }
                                      className="absolute right-4 top-4 text-white/30 hover:text-white/60 transition-colors duration-300"
                                    >
                                      {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                      ) : (
                                        <Eye className="h-5 w-5" />
                                      )}
                                    </button>
                                  </div>
                                </FormControl>
                              </div>
                              <FormMessage className="text-sm text-red-500 mt-1" />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-6">
                    <div className="relative group w-full">
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-xl blur group-hover:blur-md transition-all duration-300" />
                      <Button
                        type="submit"
                        className="relative w-full h-14 bg-white hover:bg-white/90 text-black text-lg font-semibold rounded-xl transition-all duration-300"
                        disabled={register.isPending}
                      >
                        {register.isPending
                          ? "Creating account..."
                          : "Create Account"}
                      </Button>
                    </div>
                    <p className="text-sm text-center text-white/60">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-medium text-white hover:text-white/80 transition-colors"
                      >
                        Sign In
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainRegister;
