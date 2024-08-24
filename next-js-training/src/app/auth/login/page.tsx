import LoginForm from "@/app/auth/login/LoginForm";
import React from "react";

export default function LoginPage() {
  return (
    <div className="login_page w-full h-[calc(100vh-7rem)] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
