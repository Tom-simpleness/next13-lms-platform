"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Corrected form schema to include proper email validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, "Email is required"),
  role: z.enum(["admin", "student", "teacher"]),
});

const AdminPage = () => {
  const router = useRouter();
  const [emails, setEmails] = useState<string[]>([]); // Corrected to use a string array for emails

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "student",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Corrected to include form values in the POST request
      const response = await axios.post("/api/users", values);

      toast.success("User created");
      // Corrected to append the new email to the existing emails array
      setEmails((currentEmails) => [...currentEmails, values.email]);
      form.reset(); // Reset form after submission
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Create a New User</h1>
        <p className="text-sm text-slate-600">
          Enter the user&apos;s email address to create a new user.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. user@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Role : </FormLabel>
                  <FormControl>
                    <select {...field} disabled={isSubmitting}>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/" passHref>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Create User
              </Button>
            </div>
          </form>
        </Form>
        {emails.length > 0 && (
          <div>
            <h2 className="text-xl mt-8">Created Emails</h2>
            <ul>
              {emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
