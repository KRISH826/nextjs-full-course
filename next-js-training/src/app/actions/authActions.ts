"use server";

import { prisma } from "@/libs/prisma";
import { registerSchema, RegisterSchema } from "@/libs/schemas/RegisterSchema";
import bcrypt from "bcryptjs";
import { ActionResult } from "../types";
import { User } from "@prisma/client";
import { LoginSchema } from "@/libs/schemas/loginSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function SignInUSer(data: LoginSchema): Promise<ActionResult<User>> {
  try {
    const result = await signIn('credentials',{
      email: data.email,
      password: data.password,
      redirect: false,
    })
    console.log(result);
    return {status: 'success', data: 'Login successful'}
  } catch (error) {
    console.log(error);
    if(error instanceof AuthError) {
      switch(error.type) {
        case "CredentialsSignin":
          return {status: 'error', error: "invalid credentials"}
        default: 
          return {status: 'error', error:'Some error occurred'}
      }
    }
    else {
        return {status: 'error', error: "some error occurred"}
    }
  }
}

export async function RegisterUser(data: RegisterSchema): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return {status: 'error', error: validated.error.errors };
    }

    const { email, name, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return {status: 'error', error: "User already exists" };
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: hashedPassword,
      },
    });

    return {status: 'success', data: user};
  } catch (error) {
    console.log(error)
    return {status: 'error', error: "something went wrong"}
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {email}
  })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {id}
  })
}
