"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [resourceNotifications, setResourceNotifications] = useState(true);
  const [likeNotifications, setLikeNotifications] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // ================= SAVE NOTIFICATIONS =================

  function saveNotificationSettings() {
    setNotificationMessage("Notification preferences saved.");

    setTimeout(() => {
      setNotificationMessage("");
    }, 3000);
  }

  // ================= CHANGE PASSWORD =================

  function handlePasswordChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPasswordMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage(
        "Your new password must contain at least 8 characters."
      );
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setPasswordMessage(
        "Your new password must contain at least one uppercase letter."
      );
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      setPasswordMessage(
        "Your new password must contain at least one lowercase letter."
      );
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setPasswordMessage(
        "Your new password must contain at least one number."
      );
      return;
    }

    if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setPasswordMessage(
        "Your new password must contain at least one special character."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }

    setPasswordMessage(
      "Password details accepted. Actual password changes will be connected when authentication is added."
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#202529]">
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#dfe3e6] bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-6">
          {/* LOGO */}

          <Link href="/dashboard" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Novelle"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <h1 className="text-[18px] font-bold text-[#0f6fc6]">
                Novelle
              </h1>

              <p className="text-[10px] text-[#7b8288]">
                CST Student Platform
              </p>
            </div>
          </Link>

          {/* BACK TO DASHBOARD */}

          <Link
            href="/dashboard"
            className="rounded-md border border-[#d4d8db] bg-white px-4 py-2 text-[13px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1050px] px-6 py-10">
        {/* PAGE HEADING */}

        <div className="mb-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0f6fc6]">
            Student Account
          </p>

          <h2 className="mt-2 text-[30px] font-bold text-[#202529]">
            Settings
          </h2>

          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#697077]">
            Manage your Novelle account preferences, notifications and
            security settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          {/* =====================================================
              LEFT SETTINGS MENU
          ===================================================== */}

          <aside className="h-fit rounded-xl border border-[#dfe3e6] bg-white p-3">
            <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#969da3]">
              Settings
            </p>

            <a
              href="#account"
              className="block rounded-md bg-[#dcecff] px-3 py-2.5 text-[13px] font-medium text-[#0f6fc6]"
            >
              Account
            </a>

            <a
              href="#notifications"
              className="mt-1 block rounded-md px-3 py-2.5 text-[13px] text-[#555c62] hover:bg-[#f3f5f6]"
            >
              Notifications
            </a>

            <a
              href="#security"
              className="mt-1 block rounded-md px-3 py-2.5 text-[13px] text-[#555c62] hover:bg-[#f3f5f6]"
            >
              Security
            </a>

            <a
              href="#privacy"
              className="mt-1 block rounded-md px-3 py-2.5 text-[13px] text-[#555c62] hover:bg-[#f3f5f6]"
            >
              Privacy
            </a>
          </aside>

          {/* =====================================================
              RIGHT CONTENT
          ===================================================== */}

          <div className="space-y-6">
            {/* =================================================
                ACCOUNT SETTINGS
            ================================================= */}

            <section
              id="account"
              className="scroll-mt-24 rounded-xl border border-[#dfe3e6] bg-white"
            >
              <div className="border-b border-[#e5e8ea] px-6 py-5">
                <h3 className="text-[18px] font-bold text-[#252a30]">
                  Account Information
                </h3>

                <p className="mt-1 text-[13px] text-[#747b81]">
                  Your CST student account information.
                </p>
              </div>

              <div className="space-y-5 p-6">
                {/* STUDENT ID */}

                <div>
                  <label className="mb-2 block text-[12px] font-medium text-[#555c62]">
                    Student ID
                  </label>

                  <input
                    type="text"
                    value="02250359"
                    disabled
                    className="w-full rounded-md border border-[#d6dade] bg-[#f5f6f7] px-4 py-3 text-[13px] text-[#747b81]"
                  />

                  <p className="mt-1.5 text-[11px] text-[#969da3]">
                    Your Student ID cannot be changed.
                  </p>
                </div>

                {/* COLLEGE EMAIL */}

                <div>
                  <label className="mb-2 block text-[12px] font-medium text-[#555c62]">
                    CST College Email
                  </label>

                  <input
                    type="email"
                    value="02250359.cst@rub.edu.bt"
                    disabled
                    className="w-full rounded-md border border-[#d6dade] bg-[#f5f6f7] px-4 py-3 text-[13px] text-[#747b81]"
                  />

                  <p className="mt-1.5 text-[11px] text-[#969da3]">
                    Your college email is linked to your Student ID.
                  </p>
                </div>

                {/* PROFILE LINK */}

                <div className="rounded-lg border border-[#d9e7f2] bg-[#f4f9fd] p-4">
                  <p className="text-[13px] font-medium text-[#343a40]">
                    Need to update your academic information?
                  </p>

                  <p className="mt-1 text-[12px] leading-5 text-[#697077]">
                    Your name, programme, year and semester can be managed
                    from your student profile.
                  </p>

                  <Link
                    href="/profile"
                    className="mt-3 inline-block text-[12px] font-semibold text-[#0f6fc6] hover:underline"
                  >
                    Go to My Profile →
                  </Link>
                </div>
              </div>
            </section>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <section
              id="notifications"
              className="scroll-mt-24 rounded-xl border border-[#dfe3e6] bg-white"
            >
              <div className="border-b border-[#e5e8ea] px-6 py-5">
                <h3 className="text-[18px] font-bold text-[#252a30]">
                  Notifications
                </h3>

                <p className="mt-1 text-[13px] text-[#747b81]">
                  Choose which Novelle notifications you would like to
                  receive.
                </p>
              </div>

              <div className="p-6">
                <div className="divide-y divide-[#edf0f2]">
                  {/* EMAIL NOTIFICATIONS */}

                  <SettingToggle
                    title="Email Notifications"
                    description="Receive important Novelle account notifications through your CST college email."
                    enabled={emailNotifications}
                    onChange={() =>
                      setEmailNotifications(!emailNotifications)
                    }
                  />

                  {/* RESOURCE NOTIFICATIONS */}

                  <SettingToggle
                    title="New Resource Notifications"
                    description="Receive notifications when new academic resources are shared."
                    enabled={resourceNotifications}
                    onChange={() =>
                      setResourceNotifications(!resourceNotifications)
                    }
                  />

                  {/* LIKE NOTIFICATIONS */}

                  <SettingToggle
                    title="Resource Like Notifications"
                    description="Receive notifications when another student likes one of your uploaded resources."
                    enabled={likeNotifications}
                    onChange={() =>
                      setLikeNotifications(!likeNotifications)
                    }
                  />
                </div>

                {notificationMessage && (
                  <div className="mt-5 rounded-md border border-[#b9dec5] bg-[#f0faf3] px-4 py-3 text-[12px] text-[#327347]">
                    {notificationMessage}
                  </div>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={saveNotificationSettings}
                    className="rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </section>

            {/* =================================================
                SECURITY
            ================================================= */}

            <section
              id="security"
              className="scroll-mt-24 rounded-xl border border-[#dfe3e6] bg-white"
            >
              <div className="border-b border-[#e5e8ea] px-6 py-5">
                <h3 className="text-[18px] font-bold text-[#252a30]">
                  Security
                </h3>

                <p className="mt-1 text-[13px] text-[#747b81]">
                  Manage the password used to access your Novelle account.
                </p>
              </div>

              <form onSubmit={handlePasswordChange} className="p-6">
                <div className="space-y-5">
                  {/* CURRENT PASSWORD */}

                  <div>
                    <label className="mb-2 block text-[12px] font-medium text-[#555c62]">
                      Current Password
                    </label>

                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(event) =>
                          setCurrentPassword(event.target.value)
                        }
                        placeholder="Enter current password"
                        className="w-full rounded-md border border-[#cfd4d8] bg-white px-4 py-3 pr-16 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#0f6fc6]"
                      >
                        {showCurrentPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* NEW PASSWORD */}

                  <div>
                    <label className="mb-2 block text-[12px] font-medium text-[#555c62]">
                      New Password
                    </label>

                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(event) =>
                          setNewPassword(event.target.value)
                        }
                        placeholder="Enter new password"
                        className="w-full rounded-md border border-[#cfd4d8] bg-white px-4 py-3 pr-16 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowNewPassword(!showNewPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#0f6fc6]"
                      >
                        {showNewPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-[#8b9298]">
                      Use at least 8 characters with uppercase, lowercase,
                      number and special character.
                    </p>
                  </div>

                  {/* CONFIRM PASSWORD */}

                  <div>
                    <label className="mb-2 block text-[12px] font-medium text-[#555c62]">
                      Confirm New Password
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        placeholder="Re-enter new password"
                        className="w-full rounded-md border border-[#cfd4d8] bg-white px-4 py-3 pr-16 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-[#0f6fc6]"
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                {passwordMessage && (
                  <div className="mt-5 rounded-md border border-[#d9e7f2] bg-[#f4f9fd] px-4 py-3 text-[12px] leading-5 text-[#4f6678]">
                    {passwordMessage}
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </section>

            {/* =================================================
                PRIVACY
            ================================================= */}

            <section
              id="privacy"
              className="scroll-mt-24 rounded-xl border border-[#dfe3e6] bg-white"
            >
              <div className="border-b border-[#e5e8ea] px-6 py-5">
                <h3 className="text-[18px] font-bold text-[#252a30]">
                  Privacy & Account
                </h3>

                <p className="mt-1 text-[13px] text-[#747b81]">
                  Information about your student account and shared
                  resources.
                </p>
              </div>

              <div className="space-y-4 p-6">
                <div className="rounded-lg border border-[#dfe3e6] p-4">
                  <h4 className="text-[13px] font-semibold text-[#343a40]">
                    Student Information
                  </h4>

                  <p className="mt-1 text-[12px] leading-5 text-[#747b81]">
                    Your Student ID and CST college email are used to identify
                    your Novelle student account. These details are not
                    editable from your profile.
                  </p>
                </div>

                <div className="rounded-lg border border-[#dfe3e6] p-4">
                  <h4 className="text-[13px] font-semibold text-[#343a40]">
                    Shared Resources
                  </h4>

                  <p className="mt-1 text-[12px] leading-5 text-[#747b81]">
                    Resources uploaded to Novelle are intended to be shared
                    with the CST student community for academic purposes.
                  </p>
                </div>

                <div className="rounded-lg border border-[#f0d6d6] bg-[#fffafa] p-4">
                  <h4 className="text-[13px] font-semibold text-[#a34242]">
                    Account Management
                  </h4>

                  <p className="mt-1 text-[12px] leading-5 text-[#747b81]">
                    Account deletion and permanent account changes will be
                    available after the Novelle authentication and database
                    system is connected.
                  </p>

                  <button
                    type="button"
                    disabled
                    className="mt-3 cursor-not-allowed rounded-md border border-[#e3bcbc] bg-white px-4 py-2 text-[12px] font-medium text-[#b86b6b] opacity-60"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </section>

            {/* FRONTEND NOTICE */}

            <div className="rounded-lg border border-[#d9e7f2] bg-[#f4f9fd] px-5 py-4">
              <p className="text-[12px] leading-5 text-[#5d6f7d]">
                <span className="font-semibold text-[#0f6fc6]">
                  Frontend demo:
                </span>{" "}
                These settings currently demonstrate the Novelle interface.
                Permanent notification preferences, password changes and
                account management will be connected when the backend and
                authentication system are implemented.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// =====================================================
// SETTING TOGGLE COMPONENT
// =====================================================

function SettingToggle({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-5 first:pt-0 last:pb-0">
      <div>
        <p className="text-[13px] font-semibold text-[#343a40]">
          {title}
        </p>

        <p className="mt-1 max-w-[500px] text-[12px] leading-5 text-[#747b81]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#0f6fc6]" : "bg-[#c9ced2]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
