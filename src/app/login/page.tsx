import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to join events, create your own, and keep your record.",
};

export default function LoginPage() {
  return <LoginForm />;
}
