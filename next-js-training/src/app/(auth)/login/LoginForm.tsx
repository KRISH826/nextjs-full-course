/* eslint-disable react/no-unescaped-entities */
"use client";
import { SignInUSer } from "@/app/actions/authActions";
import { LoginSchema, loginSchema } from "@/libs/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data: LoginSchema) => {
    const result = await SignInUSer(data);

    if (result.status === "success") {
      toast.success("User Logged in successfully");
      router.push("/members");
      router.refresh();
    } else {
      toast.error(result.error as string);
    }
  };
  return (
    <Card className="w-2/5 p-4 mx-auto">
      <CardHeader className="pb-0 px-4 justify-between flex flex-col">
        <h1 className="font-bold text-2xl text-center">Login</h1>
        <p className="text-center">Welcome to Next Match App</p>
      </CardHeader>
      <CardBody className="mt-3 pb-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Email"
              defaultValue=""
              type="email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />  
            <Input
              label="Password"
              defaultValue=""
              type="password"
              variant="bordered"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              type="submit"
              fullWidth
              variant="solid"
              color="secondary"
            >
              Login
            </Button>
          </div>
        </form>
        <p className="mt-1">
          Don't have an Account?{" "}
          <Link className="text-purple-600" href="/register">
            Sign Up
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
