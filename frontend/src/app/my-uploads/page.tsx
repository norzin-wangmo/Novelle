"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type UploadedResource = {
  id: number;
  title: string;
  description: string;
  programme: string;
  year: string;
  semester: string;
  module: string;
  moduleCode: string;
  type: string;
  likes: number;
  uploadedDate: string;
  fileName: string;
};

export default function MyUploadsPage() {
  const [search, setSearch] = useState("");
  const [resourceType, setResourceType] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [deleteTarget, setDeleteTarget] =
    useState<UploadedResource | null>(null);

  // =====================================================
  // RESOURCE TYPES
  // =====================================================

  const resourceTypes = [
    "All",
    "Lecture Notes",
    "Past Question Paper",
    "Assignment",
    "Tutorial",
    "Quiz",
    "Lab Material",
    "Study Guide",
    "Other",
  ];

  // =====================================================
  // DEMO STUDENT UPLOADS
  // Later these will come from the logged-in student's
  // uploads in the database.
  // =====================================================

  const [uploads, setUploads] = useState<UploadedResource[]>([
    {
      id: 10,
      title: "Theory of Probability Notes",
      description:
        "Study notes covering probability concepts and distributions.",
      programme: "Software Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Theory of Probability",
      moduleCode: "MAT205",
      type: "Lecture Notes",
      likes: 102,
      uploadedDate: "September 18, 2026",
      fileName: "theory-of-probability-notes.pdf",
    },
    {
      id: 6,
      title: "Software Engineering Quiz",
      description:
        "Quiz questions covering important software engineering concepts.",
      programme: "Software Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Software Engineering",
      moduleCode: "SWE201",
      type: "Quiz",
      likes: 141,
      uploadedDate: "September 12, 2026",
      fileName: "software-engineering-quiz.pdf",
    },
    {
      id: 5,
      title: "Data Structures Tutorial",
      description:
        "Tutorial exercises on arrays, stacks, queues and trees.",
      programme: "Software Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Data Structures",
      moduleCode: "SWE205",
      type: "Tutorial",
      likes: 88,
      uploadedDate: "September 5, 2026",
      fileName: "data-structures-tutorial.pdf",
    },
  ]);

  // =====================================================
  // FILTER + SORT
  // =====================================================

  const displayedUploads = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    let filtered = uploads.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchText) ||
        resource.description.toLowerCase().includes(searchText) ||
        resource.programme.toLowerCase().includes(searchText) ||
        resource.module.toLowerCase().includes(searchText) ||
        resource.moduleCode.toLowerCase().includes(searchText) ||
        resource.type.toLowerCase().includes(searchText);

      const matchesType =
        resourceType === "All" || resource.type === resourceType;

      return matchesSearch && matchesType;
    });

    if (sortBy === "popular") {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes);
    }

    if (sortBy === "az") {
      filtered = [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortBy === "za") {
      filtered = [...filtered].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return filtered;
  }, [uploads, search, resourceType, sortBy]);

  // =====================================================
  // DELETE RESOURCE
  // =====================================================

  function confirmDelete() {
    if (!deleteTarget) {
      return;
    }

    setUploads((currentUploads) =>
      currentUploads.filter(
        (resource) => resource.id !== deleteTarget.id
      )
    );

    setDeleteTarget(null);
  }

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  function clearFilters() {
    setSearch("");
    setResourceType("All");
    setSortBy("recent");
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

          {/* NAVIGATION */}

          <div className="flex items-center gap-3">

            <Link
              href="/upload"
              className="hidden rounded-md bg-[#0f6fc6] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#0b5fae] sm:block"
            >
              + Upload Resource
            </Link>

            <Link
              href="/dashboard"
              className="rounded-md border border-[#d4d8db] bg-white px-4 py-2 text-[13px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
            >
              ← Dashboard
            </Link>

          </div>

        </div>
      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1200px] px-6 py-10">

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0f6fc6]">
              Student Resources
            </p>

            <h2 className="mt-2 text-[30px] font-bold text-[#202529]">
              My Uploads
            </h2>

            <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#697077]">
              View and manage the academic resources you have shared with
              the CST student community.
            </p>
          </div>

          <Link
            href="/upload"
            className="inline-flex items-center justify-center rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
          >
            + Upload New Resource
          </Link>

        </div>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          {/* TOTAL UPLOADS */}

          <div className="rounded-xl border border-[#dfe3e6] bg-white p-5">
            <p className="text-[12px] text-[#747b81]">
              Resources Uploaded
            </p>

            <p className="mt-2 text-[28px] font-bold text-[#252a30]">
              {uploads.length}
            </p>
          </div>

          {/* TOTAL LIKES */}

          <div className="rounded-xl border border-[#dfe3e6] bg-white p-5">
            <p className="text-[12px] text-[#747b81]">
              Total Likes Received
            </p>

            <p className="mt-2 text-[28px] font-bold text-[#252a30]">
              {uploads.reduce(
                (total, resource) => total + resource.likes,
                0
              )}
            </p>
          </div>

          {/* MOST LIKED */}

          <div className="rounded-xl border border-[#d9e7f2] bg-[#f4f9fd] p-5">
            <p className="text-[12px] text-[#5d6f7d]">
              Most Liked Upload
            </p>

            <p className="mt-2 text-[28px] font-bold text-[#0f6fc6]">
              {uploads.length > 0
                ? Math.max(...uploads.map((resource) => resource.likes))
                : 0}
            </p>

            <p className="mt-1 text-[10px] text-[#747b81]">
              likes
            </p>
          </div>

        </div>

        {/* =================================================
            SEARCH + FILTERS
        ================================================= */}

        <section className="mt-6 rounded-xl border border-[#dfe3e6] bg-white p-5">

          <div className="grid gap-4 lg:grid-cols-[1fr_220px_180px]">

            {/* SEARCH */}

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#747b81]">
                Search My Uploads
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9197]">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search title, module, resource type..."
                  className="w-full rounded-md border border-[#cfd4d8] bg-white py-2.5 pl-10 pr-4 text-[13px] outline-none placeholder:text-[#969ca1] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                />
              </div>
            </div>

            {/* RESOURCE TYPE */}

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#747b81]">
                Resource Type
              </label>

              <select
                value={resourceType}
                onChange={(event) =>
                  setResourceType(event.target.value)
                }
                className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
              >
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* SORT */}

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#747b81]">
                Sort By
              </label>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
              >
                <option value="recent">
                  Recently Uploaded
                </option>

                <option value="popular">
                  Most Liked
                </option>

                <option value="az">
                  Title A-Z
                </option>

                <option value="za">
                  Title Z-A
                </option>
              </select>
            </div>

          </div>

          {/* ACTIVE FILTERS */}

          {(search ||
            resourceType !== "All" ||
            sortBy !== "recent") && (

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#edf0f2] pt-4">

              <span className="text-[11px] text-[#747b81]">
                Active:
              </span>

              {search && (
                <span className="rounded-full bg-[#eef3f6] px-3 py-1 text-[11px] text-[#555c62]">
                  Search: {search}
                </span>
              )}

              {resourceType !== "All" && (
                <span className="rounded-full bg-[#eef3f6] px-3 py-1 text-[11px] text-[#555c62]">
                  {resourceType}
                </span>
              )}

              {sortBy !== "recent" && (
                <span className="rounded-full bg-[#eef3f6] px-3 py-1 text-[11px] text-[#555c62]">
                  Custom Sort
                </span>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="ml-1 text-[11px] font-semibold text-[#0f6fc6] hover:underline"
              >
                Clear
              </button>

            </div>

          )}

        </section>

        {/* =================================================
            UPLOAD COUNT
        ================================================= */}

        <div className="mt-8">

          <h3 className="text-[20px] font-bold text-[#202529]">
            Uploaded Resources
          </h3>

          <p className="mt-1 text-[12px] text-[#747b81]">
            {displayedUploads.length}{" "}
            {displayedUploads.length === 1
              ? "resource"
              : "resources"}{" "}
            found
          </p>

        </div>

        {/* =================================================
            UPLOAD CARDS
        ================================================= */}

        {displayedUploads.length > 0 ? (

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {displayedUploads.map((resource) => (

              <article
                key={resource.id}
                className="flex min-h-[360px] flex-col rounded-xl border border-[#dfe3e6] bg-white p-5 transition hover:border-[#b9c0c5] hover:shadow-sm"
              >

                {/* TYPE + LIKES */}

                <div className="flex items-center justify-between gap-3">

                  <span className="rounded-md bg-[#e8f3fb] px-2.5 py-1 text-[10px] font-medium text-[#0f6fc6]">
                    {resource.type}
                  </span>

                  <span className="text-[11px] text-[#747b81]">
                    ♥ {resource.likes}
                  </span>

                </div>

                {/* TITLE */}

                <h4 className="mt-4 text-[15px] font-bold leading-5 text-[#252a30]">
                  {resource.title}
                </h4>

                {/* DESCRIPTION */}

                <p className="mt-2 text-[12px] leading-5 text-[#697077]">
                  {resource.description}
                </p>

                {/* MODULE */}

                <div className="mt-4 rounded-lg bg-[#f6f7f8] px-3 py-3">

                  <p className="text-[11px] font-medium text-[#343a40]">
                    {resource.module}
                  </p>

                  <p className="mt-1 text-[10px] text-[#8b9298]">
                    {resource.moduleCode}
                  </p>

                </div>

                {/* PROGRAMME */}

                <p className="mt-4 text-[11px] text-[#747b81]">
                  {resource.programme}
                </p>

                {/* YEAR + SEMESTER */}

                <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-[#8b9298]">

                  <span>
                    {resource.year}
                  </span>

                  <span>
                    {resource.semester}
                  </span>

                </div>

                {/* UPLOAD INFORMATION */}

                <div className="mt-3 border-t border-[#edf0f2] pt-3">

                  <p className="truncate text-[10px] text-[#8b9298]">
                    File: {resource.fileName}
                  </p>

                  <p className="mt-1 text-[10px] text-[#8b9298]">
                    Uploaded {resource.uploadedDate}
                  </p>

                </div>

                <div className="flex-1" />

                {/* ACTIONS */}

                <div className="mt-5 border-t border-[#e6e8ea] pt-4">

                  <div className="grid grid-cols-2 gap-2">

                    {/* VIEW */}

                    <Link
                      href={`/resources/${resource.id}`}
                      className="rounded-md bg-[#0f6fc6] px-3 py-2.5 text-center text-[12px] font-medium text-white hover:bg-[#0b5fae]"
                    >
                      View
                    </Link>

                    {/* EDIT */}

                    <Link
                      href={`/my-uploads/${resource.id}/edit`}
                      className="rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-center text-[12px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
                    >
                      Edit
                    </Link>

                  </div>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTarget(resource)
                    }
                    className="mt-2 w-full rounded-md border border-[#e3c8c8] bg-white px-3 py-2.5 text-[12px] font-medium text-[#a65757] hover:bg-[#fff7f7]"
                  >
                    Delete Resource
                  </button>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =================================================
              EMPTY STATE
          ================================================= */

          <div className="mt-5 rounded-xl border border-[#dfe3e6] bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef5fa] text-[20px] font-medium text-[#0f6fc6]">
              ↑
            </div>

            <h3 className="mt-4 text-[16px] font-semibold text-[#343a40]">
              {uploads.length === 0
                ? "You haven't uploaded any resources yet"
                : "No matching uploads found"}
            </h3>

            <p className="mx-auto mt-2 max-w-[450px] text-[13px] leading-5 text-[#747b81]">
              {uploads.length === 0
                ? "Share useful academic resources with other CST students by uploading your first resource."
                : "Try changing your search or resource type filter."}
            </p>

            {uploads.length === 0 ? (

              <Link
                href="/upload"
                className="mt-5 inline-block rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[12px] font-medium text-white hover:bg-[#0b5fae]"
              >
                Upload First Resource
              </Link>

            ) : (

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[12px] font-medium text-white hover:bg-[#0b5fae]"
              >
                Clear Filters
              </button>

            )}

          </div>

        )}

        {/* =================================================
            FRONTEND NOTICE
        ================================================= */}

        <div className="mt-7 rounded-lg border border-[#d9e7f2] bg-[#f4f9fd] px-5 py-4">

          <p className="text-[12px] leading-5 text-[#5d6f7d]">
            <span className="font-semibold text-[#0f6fc6]">
              Frontend demo:
            </span>{" "}
            These uploads are currently sample data. When Novelle&apos;s
            backend and authentication are connected, this page will show
            only resources uploaded by the currently logged-in student.
          </p>

        </div>

      </div>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {deleteTarget && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-[430px] rounded-xl border border-[#dfe3e6] bg-white p-6 shadow-lg">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1f1] text-[18px] text-[#a65757]">
              !
            </div>

            <h3 className="mt-4 text-[18px] font-bold text-[#252a30]">
              Delete Resource?
            </h3>

            <p className="mt-2 text-[13px] leading-5 text-[#697077]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#343a40]">
                {deleteTarget.title}
              </span>
              ? This will remove the resource from your uploads.
            </p>

            <p className="mt-3 text-[11px] text-[#8b9298]">
              During the frontend stage this only removes the demo resource
              until the page is refreshed.
            </p>

            <div className="mt-6 flex justify-end gap-2">

              <button
                type="button"
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="rounded-md border border-[#d4d8db] bg-white px-4 py-2.5 text-[12px] font-medium text-[#555c62] hover:bg-[#f6f7f8]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-md bg-[#a65757] px-4 py-2.5 text-[12px] font-medium text-white hover:bg-[#8e4747]"
              >
                Delete Resource
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
