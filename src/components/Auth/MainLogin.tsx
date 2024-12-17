"use client";

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
import { Mail, Facebook, Twitter, Lock, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";


const MainLogin = () => {
  console.log("asdasdsad")
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
          {/* <Image
            src="/login-bg.jpg"
            alt="Login"
            width={1000}
            height={1000}
            className="absolute inset-0 w-full h-full object-cover scale-110 hover:scale-105 transition-transform duration-1000"
          /> */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full p-12 text-white">
            <div className="group">
              <div className="h-28 w-28 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center mb-8 rotate-6 group-hover:rotate-0 transform transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300" />
                <span className="font-bold text-6xl bg-gradient-to-br from-white to-white/60 text-transparent bg-clip-text relative z-10">H</span>
              </div>
            </div>
            <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-br from-white to-white/60 text-transparent bg-clip-text">Welcome Back!</h2>
            <p className="text-center text-lg text-white/60 max-w-sm">
              Sign in to continue your journey with Humanize AI and explore the future of communication
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
                    <span className="font-bold text-4xl text-white group-hover:scale-110 transition-transform duration-300">H</span>
                  </div>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">Sign in to your account</CardTitle>
                <CardDescription className="text-base text-white/50">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                      <Input 
                        id="email" 
                        placeholder="Email address" 
                        type="email"
                        className="h-14 px-12 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 transition-all duration-300 pl-12 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors duration-300" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Password"
                        className="h-14 px-12 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 transition-all duration-300 pl-12 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" className="border-white/10 data-[state=checked]:bg-white data-[state=checked]:border-white" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none text-white/60"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link 
                    href="/forgot-password"
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6">
                <div className="relative group w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/10 rounded-xl blur group-hover:blur-md transition-all duration-300" />
                  <Button 
                    className="relative w-full h-14 bg-white hover:bg-white/90 text-black text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0A0A0A] px-2 text-white/40">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  {[
                    { icon: Facebook },
                    { icon: Twitter },
                    { icon: Mail }
                  ].map((item, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <Button
                        variant="outline"
                        size="icon"
                        className="relative h-14 w-14 rounded-xl border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <item.icon className="h-5 w-5 text-white/60 group-hover:text-white transition-colors duration-300" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-center text-white/60">
                  Don&apos;t have an account?{" "}
                  <Link 
                    href="/register"
                    className="font-medium text-white hover:text-white/80 transition-colors"
                  >
                    Create Account
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLogin;