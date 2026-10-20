import { ApplicationsClientView } from "@/components/applications/ApplicationsClientView";

export const metadata = {
  title: "Applications | ApplyDock",
  description: "Track your engineering job search pipeline, interview countdowns, and compensation.",
};

export default function ApplicationsPage() {
  return <ApplicationsClientView />;
}
