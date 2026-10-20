"use client";

import * as React from "react";
import { Download, Shield, User, Key, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  exportAllUserData,
  UserProfile,
} from "@/lib/actions/user-actions";
import { getApplications } from "@/lib/actions/application-actions";
import { exportApplicationsToCsv } from "@/lib/utils";

export default function SettingsPage() {
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [name, setName] = React.useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false);
  const [profileSuccess, setProfileSuccess] = React.useState(false);
  const [profileError, setProfileError] = React.useState("");

  // Password state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);
  const [passwordSuccess, setPasswordSuccess] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState("");

  // Export state
  const [isExportingJson, setIsExportingJson] = React.useState(false);
  const [isExportingCsv, setIsExportingCsv] = React.useState(false);

  React.useEffect(() => {
    getUserProfile()
      .then((data) => {
        if (data) {
          setProfile(data);
          setName(data.name || "");
        }
      })
      .catch((err) => console.error("Failed to load profile:", err));
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileSuccess(false);
    setProfileError("");

    try {
      const res = await updateUserProfile({ name });
      if (res.success) {
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
      } else {
        setProfileError(res.error || "Failed to update profile.");
      }
    } catch {
      setProfileError("An unexpected error occurred.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    setIsChangingPassword(true);
    setPasswordSuccess(false);
    setPasswordError("");

    try {
      const res = await changeUserPassword({ currentPassword, newPassword });
      if (res.success) {
        setPasswordSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(res.error || "Failed to change password.");
      }
    } catch {
      setPasswordError("An unexpected error occurred.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleExportCsv = async () => {
    setIsExportingCsv(true);
    try {
      const apps = await getApplications();
      exportApplicationsToCsv(apps);
    } catch (err) {
      console.error("Failed to export CSV:", err);
    } finally {
      setIsExportingCsv(false);
    }
  };

  const handleExportJson = async () => {
    setIsExportingJson(true);
    try {
      const res = await exportAllUserData();
      if (res.success && res.data) {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(res.data, null, 2)
        )}`;
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", jsonString);
        downloadAnchor.setAttribute(
          "download",
          `applydock-workspace-backup-${new Date().toISOString().split("T")[0]}.json`
        );
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      }
    } catch (err) {
      console.error("Failed to export JSON backup:", err);
    } finally {
      setIsExportingJson(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Workspace Settings
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Manage your account profile, credentials, and complete data portability
        </p>
      </div>

      {/* Profile Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-slate-500" />
            <CardTitle className="text-base">Profile Details</CardTitle>
          </div>
          <CardDescription>Your public display information inside your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
            {profileSuccess && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Profile updated successfully!</span>
              </div>
            )}
            {profileError && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-semibold text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{profileError}</span>
              </div>
            )}

            <Input
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Shahriar Shihab"
              required
            />
            <Input
              label="Email Address"
              value={profile?.email || "demo@proofly.local"}
              disabled
              className="bg-slate-50 dark:bg-slate-900 text-slate-500 cursor-not-allowed"
            />
            <Button size="sm" type="submit" isLoading={isUpdatingProfile}>
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Security & Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-slate-500" />
            <CardTitle className="text-base">Security &amp; Credentials</CardTitle>
          </div>
          <CardDescription>Update your workspace password (12-round bcrypt salted).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            {passwordSuccess && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Password changed successfully!</span>
              </div>
            )}
            {passwordError && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs font-semibold text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{passwordError}</span>
              </div>
            )}

            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              label="New Password (min. 8 characters)"
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button size="sm" type="submit" isLoading={isChangingPassword}>
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Data Portability & Archive */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-slate-500" />
            <CardTitle className="text-base">Data Portability &amp; Backups</CardTitle>
          </div>
          <CardDescription>
            You have full ownership of your data. Export your workspace anytime without lock-in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Download your applications, compensation benchmarks, interview notes, and skill proficiencies in industry-standard formats.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCsv}
              isLoading={isExportingCsv}
              className="gap-2 text-xs"
            >
              <Download className="h-4 w-4" />
              <span>Export Applications (RFC 4180 CSV)</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              isLoading={isExportingJson}
              className="gap-2 text-xs"
            >
              <Download className="h-4 w-4" />
              <span>Download Full Workspace Backup (JSON)</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
