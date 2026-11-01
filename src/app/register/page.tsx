import type { Metadata } from "next";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Join Shomaj Shathi and find a cleanup, plantation or clothes drive near you.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
