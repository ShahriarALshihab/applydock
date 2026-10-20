import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Workspace Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account profile, preferences, and data portability.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>Your public display information inside your workspace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Display Name" defaultValue="Job Seeker" />
          <Input label="Email Address" defaultValue="user@example.com" disabled />
          <Button size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Portability & Export</CardTitle>
          <CardDescription>Download a complete copy of your job applications and tracking data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Export all your tracked applications, company details, salaries, and follow-ups to a standard CSV file with formula-safe formatting.
          </p>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Export Applications to CSV</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
