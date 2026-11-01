import type { Metadata } from "next";
import { ManageList } from "./manage-list";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { demoUser, events } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Your events",
  description: "Edit, check or remove the events you have created.",
};

export default function ManageEventsPage() {
  const mine = events.filter((event) => event.organizer.email === demoUser.email);

  return (
    <DashboardShell user={demoUser}>
      <ManageList events={mine} />
    </DashboardShell>
  );
}
