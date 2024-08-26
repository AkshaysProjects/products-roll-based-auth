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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/enums/user_role";
import { RegisterFormData, registerSchema } from "@/schemas/register";
import api from "@/utils/api";
import { getInboxUrl } from "@/utils/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const [showPopup, setShowPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      role: UserRole.MEMBER,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    return api
      .post("/api/auth/register", data)
      .then((_res) => {
        setUserEmail(data.email);
        setShowPopup(true);
      })
      .catch((error: unknown) => {
        if (!(error instanceof AxiosError))
          setError("email", {
            message: "Something went wrong, please try again.",
          });
        else if (error.response?.status === 409)
          setError("email", { message: "Email already registered." });
        else
          setError("email", {
            message: "Something went wrong, please try again.",
          });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <RadioGroup
                defaultValue={UserRole.MEMBER}
                onValueChange={(value) => setValue("role", value as UserRole)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={UserRole.MEMBER} id="team-member" />
                  <Label htmlFor="team-member">Team Member</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={UserRole.ADMIN} id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Successful!</DialogTitle>
            <DialogDescription>
              We&apos;ve sent a verification email to your address. Please check
              your inbox and follow the instructions to complete your
              registration.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => window.open(getInboxUrl(userEmail), "_blank")}
            >
              Go to Inbox
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
