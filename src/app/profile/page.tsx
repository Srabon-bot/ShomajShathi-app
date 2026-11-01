import type { Metadata } from "next";
import { ProfileDetails } from "./profile-details";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { demoUser } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your name and photo, as they appear to organisers.",
};

export default function ProfilePage() {
  return (
    <DashboardShell user={demoUser}>
      <ProfileDetails />
    </DashboardShell>
  );
}
