"use client";
import { AxiosError } from "axios";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email("Enter valid email address")
    .min(6, "Enter valid email address")
    .max(50, "Enter valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters ")
    .max(50, "Password must be less than 50 characters"),
});

export function LoginAuthForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleGoogleLogin =  () => {
    window.location.href = `/api/users/auth/google`;
  };

  const handleLogin = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const response = await axios.post("/api/users/login", data);

      if (response.status === 200) {
        toast.success("Login successful!");
        router.push("/");
      } else if (response.status === 302) {
        toast.error("User not verified. Please verify your account.");
        router.push("/");
      } else {
        toast.error("Failed to login. Please try again.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please check your credentials.");
      } else {
        toast.error("Failed to login. Please try again.");
      }
    }
  };

  return (
    <div className={cn("grid gap-6")}>
      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(handleLogin)}>
          <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <LabelInputContainer>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="m@xmail.com"
                      type="email"
                      {...field}
                      required
                    />
                    <FormMessage />
                  </LabelInputContainer>
                </FormItem>
              )}
            />
          </div>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <LabelInputContainer className="mb-8">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    {...field}
                  />
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full mb-4">
            Login &rarr;
            <BottomGradient />
          </Button>
          <button
            className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 hover:bg-gray-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            onClick={handleGoogleLogin}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
