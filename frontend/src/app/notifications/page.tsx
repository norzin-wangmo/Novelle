"use client";

import { useState } from "react";
import Link from "next/link";

type Notification = {
  id: number;
  type: "like" | "resource" | "upload" | "account";
  title: string;
  message: string;
  time: string;
  read: boolean;
  resourceId?: number;
};

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  // =====================================================
  // DEMO NOTIFICATIONS
  // Later these will come from the backend/database.
  // =====================================================

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "like",
      title: "Your resource received a like",
      message:
        'A CST student liked your uploaded resource "Theory of Probability Notes".',
      time: "10 minutes ago",
      read: false,
      resourceId: 10,
    },
    {
      id: 2,
      type: "resource",
      title: "New resource available",
      message:
        'A new Software Engineering resource, "Database Management Systems", has been shared.',
      time: "1 hour ago",
      read: false,
      resourceId: 2,
    },
    {
      id: 3,
      type: "upload",
      title: "Resource uploaded successfully",
      message:
        'Your resource "Introduction to Programming" was successfully added to Novelle.',
      time: "Yesterday",
      read: false,
      resourceId: 1,
    },
    {
      id: 4,
      type: "resource",
      title: "New study material shared",
      message:
        'A new resource, "Software Engineering Quiz", is available for students.',
      time: "Yesterday",
      read: true,
      resourceId: 6,
    },
    {
      id: 5,
      type: "like",
      title: "Students are finding your resource helpful",
      message:
        'Your uploaded academic resource has received new likes from the CST student community.',
      time: "2 days ago",
      read: true,
    },
    {
      id: 6,
      type: "account",
      title: "Welcome to Novelle",
      message:
        "Your Novelle student account is ready. You can now browse, save and share academic resources.",
      time: "3 days ago",
      read: true,
    },
  ]);

  // =====================================================
  // NOTIFICATION COUNTS
  // =====================================================

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // =====================================================
  // FILTER NOTIFICATIONS
  // =====================================================

  const displayedNotifications =
    activeFilter === "unread"
      ? notifications.filter((notification) => !notification.read)
      : notifications;

  // =====================================================
  // MARK ONE AS READ
  // =====================================================

  function markAsRead(id: number) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  }

  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  function getNotificationIcon(type: Notification["type"]) {
    if (type === "like") {
      return "♥";
    }

    if (type === "resource") {
      return "▤";
    }

    if (type === "upload") {
      return "↑";
    }

    return "i";
  }

  // =====================================================
  // NOTIFICATION LABEL
  // =====================================================

  function getNotificationLabel(type: Notification["type"]) {
    if (type === "like") {
      return "Like";
    }

    if (type === "resource") {
      return "New Resource";
    }

    if (type === "upload") {
      return "Upload";
    }

    return "Account";
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#202529]">
      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#dfe3e6] bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between px-6">

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

          {/* BACK */}

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

      <div className="mx-auto max-w-[900px] px-6 py-10">

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0f6fc6]">
              Student Account
            </p>

            <h2 className="mt-2 text-[30px] font-bold text-[#202529]">
              Notifications
            </h2>

            <p className="mt-2 text-[14px] leading-6 text-[#697077]">
              Keep track of resources, uploads and activity on your Novelle
              account.
            </p>
          </div>

          {/* MARK ALL READ */}

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="text-left text-[13px] font-medium text-[#0f6fc6] hover:underline sm:text-right"
            >
              Mark all as read
            </button>
          )}

        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">

          <div className="rounded-xl border border-[#dfe3e6] bg-white p-5">
            <p className="text-[12px] text-[#747b81]">
              All Notifications
            </p>

            <p className="mt-2 text-[28px] font-bold text-[#252a30]">
              {notifications.length}
            </p>
          </div>

          <div className="rounded-xl border border-[#d9e7f2] bg-[#f4f9fd] p-5">
            <p className="text-[12px] text-[#5d6f7d]">
              Unread Notifications
            </p>

            <p className="mt-2 text-[28px] font-bold text-[#0f6fc6]">
              {unreadCount}
            </p>
          </div>

        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mt-8 flex items-center justify-between border-b border-[#dfe3e6]">

          <div className="flex gap-6">

            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`border-b-2 pb-3 text-[13px] font-medium ${
                activeFilter === "all"
                  ? "border-[#0f6fc6] text-[#0f6fc6]"
                  : "border-transparent text-[#697077] hover:text-[#0f6fc6]"
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("unread")}
              className={`border-b-2 pb-3 text-[13px] font-medium ${
                activeFilter === "unread"
                  ? "border-[#0f6fc6] text-[#0f6fc6]"
                  : "border-transparent text-[#697077] hover:text-[#0f6fc6]"
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2 rounded-full bg-[#0f6fc6] px-2 py-0.5 text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* =================================================
            NOTIFICATION LIST
        ================================================= */}

        <section className="mt-5">

          {displayedNotifications.length > 0 ? (

            <div className="overflow-hidden rounded-xl border border-[#dfe3e6] bg-white">

              {displayedNotifications.map((notification, index) => (

                <div
                  key={notification.id}
                  className={`relative flex gap-4 px-5 py-5 ${
                    index !== displayedNotifications.length - 1
                      ? "border-b border-[#e7eaec]"
                      : ""
                  } ${
                    !notification.read
                      ? "bg-[#f7fbff]"
                      : "bg-white"
                  }`}
                >

                  {/* UNREAD INDICATOR */}

                  {!notification.read && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#0f6fc6]" />
                  )}

                  {/* ICON */}

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold ${
                      notification.type === "like"
                        ? "bg-[#fff0f3] text-[#b85067]"
                        : notification.type === "resource"
                        ? "bg-[#e8f3fb] text-[#0f6fc6]"
                        : notification.type === "upload"
                        ? "bg-[#eef8f0] text-[#438052]"
                        : "bg-[#f0f1f2] text-[#626970]"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div>
                        {/* TYPE */}

                        <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8b9298]">
                          {getNotificationLabel(notification.type)}
                        </p>

                        {/* TITLE */}

                        <h3
                          className={`mt-1 text-[14px] text-[#30363b] ${
                            !notification.read
                              ? "font-bold"
                              : "font-semibold"
                          }`}
                        >
                          {notification.title}
                        </h3>
                      </div>

                      {/* TIME */}

                      <span className="shrink-0 text-[11px] text-[#969da3]">
                        {notification.time}
                      </span>

                    </div>

                    {/* MESSAGE */}

                    <p className="mt-2 max-w-[650px] text-[12px] leading-5 text-[#697077]">
                      {notification.message}
                    </p>

                    {/* ACTIONS */}

                    <div className="mt-3 flex flex-wrap items-center gap-4">

                      {notification.resourceId && (
                        <Link
                          href={`/resources/${notification.resourceId}`}
                          onClick={() => markAsRead(notification.id)}
                          className="text-[12px] font-semibold text-[#0f6fc6] hover:underline"
                        >
                          View Resource
                        </Link>
                      )}

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="text-[12px] font-medium text-[#697077] hover:text-[#0f6fc6]"
                        >
                          Mark as read
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* =================================================
                EMPTY STATE
            ================================================= */

            <div className="rounded-xl border border-[#dfe3e6] bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef5fa] text-[18px] text-[#0f6fc6]">
                ✓
              </div>

              <h3 className="mt-4 text-[16px] font-semibold text-[#343a40]">
                You&apos;re all caught up
              </h3>

              <p className="mx-auto mt-2 max-w-[400px] text-[13px] leading-5 text-[#747b81]">
                You don&apos;t have any unread notifications right now.
              </p>

              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="mt-5 rounded-md border border-[#d4d8db] bg-white px-5 py-2.5 text-[12px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
              >
                View All Notifications
              </button>

            </div>

          )}

        </section>

        {/* =================================================
            NOTIFICATION SETTINGS
        ================================================= */}

        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-[#dfe3e6] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-[13px] font-semibold text-[#343a40]">
              Notification Preferences
            </p>

            <p className="mt-1 text-[11px] text-[#747b81]">
              Choose which notifications you would like to receive.
            </p>
          </div>

          <Link
            href="/settings#notifications"
            className="text-[12px] font-semibold text-[#0f6fc6] hover:underline"
          >
            Manage Notifications →
          </Link>

        </div>

        {/* =================================================
            FRONTEND NOTICE
        ================================================= */}

        <div className="mt-6 rounded-lg border border-[#d9e7f2] bg-[#f4f9fd] px-5 py-4">

          <p className="text-[12px] leading-5 text-[#5d6f7d]">
            <span className="font-semibold text-[#0f6fc6]">
              Frontend demo:
            </span>{" "}
            These notifications are currently sample data. When Novelle&apos;s
            backend and database are connected, notifications will be created
            automatically from real student activity.
          </p>

        </div>

      </div>
    </main>
  );
}
