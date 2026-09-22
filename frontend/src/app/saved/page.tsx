"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type SavedResource = {
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
};

export default function SavedResourcesPage() {
  const [search, setSearch] = useState("");
  const [resourceType, setResourceType] = useState("All");
  const [sortBy, setSortBy] = useState("recent");

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
  // DEMO SAVED RESOURCES
  // Later these will come from the logged-in student's
  // saved resources in the database.
  // =====================================================

  const [savedResources, setSavedResources] = useState<SavedResource[]>([
    {
      id: 3,
      title: "Engineering Mathematics Past Paper",
      description:
        "Past examination questions for engineering mathematics.",
      programme: "Civil Engineering",
      year: "1st Year",
      semester: "Semester 2",
      module: "Engineering Mathematics",
      moduleCode: "MAT101",
      type: "Past Question Paper",
      likes: 173,
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
    },
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
    },
  ]);

  // =====================================================
  // FILTER + SORT
  // =====================================================

  const displayedResources = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    let filtered = savedResources.filter((resource) => {
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
  }, [search, resourceType, sortBy, savedResources]);

  // =====================================================
  // REMOVE SAVED RESOURCE
  // =====================================================

  function removeSavedResource(id: number) {
    setSavedResources((currentResources) =>
      currentResources.filter((resource) => resource.id !== id)
    );
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
              href="/resources"
              className="hidden text-[13px] font-medium text-[#60676d] hover:text-[#0f6fc6] sm:block"
            >
              Browse Resources
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

        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0f6fc6]">
            Student Library
          </p>

          <h2 className="mt-2 text-[30px] font-bold text-[#202529]">
            Saved Resources
          </h2>

          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#697077]">
            Keep your useful academic resources in one place so you can
            quickly find them again later.
          </p>
        </div>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <div className="mt-8 rounded-xl border border-[#dfe3e6] bg-white px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-[12px] text-[#747b81]">
                Saved Resources
              </p>

              <p className="mt-1 text-[25px] font-bold text-[#252a30]">
                {savedResources.length}
              </p>
            </div>

            <Link
              href="/resources"
              className="text-[13px] font-semibold text-[#0f6fc6] hover:underline"
            >
              Find More Resources →
            </Link>

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
                Search Saved Resources
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9197]">
                  ⌕
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title, module, programme..."
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
                onChange={(event) => setResourceType(event.target.value)}
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
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
              >
                <option value="recent">Recently Saved</option>
                <option value="popular">Most Liked</option>
                <option value="az">Title A-Z</option>
                <option value="za">Title Z-A</option>
              </select>
            </div>

          </div>

          {/* ACTIVE FILTER INFORMATION */}

          {(search || resourceType !== "All" || sortBy !== "recent") && (
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
            RESOURCE COUNT
        ================================================= */}

        <div className="mt-8 flex items-end justify-between gap-4">

          <div>
            <h3 className="text-[20px] font-bold text-[#202529]">
              Your Saved Resources
            </h3>

            <p className="mt-1 text-[12px] text-[#747b81]">
              {displayedResources.length}{" "}
              {displayedResources.length === 1 ? "resource" : "resources"}{" "}
              found
            </p>
          </div>

        </div>

        {/* =================================================
            SAVED RESOURCE CARDS
        ================================================= */}

        {displayedResources.length > 0 ? (

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {displayedResources.map((resource) => (

              <article
                key={resource.id}
                className="flex min-h-[315px] flex-col rounded-xl border border-[#dfe3e6] bg-white p-5 transition hover:border-[#b9c0c5] hover:shadow-sm"
              >

                {/* RESOURCE TYPE + LIKES */}

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

                <div className="mt-2 flex items-center justify-between text-[10px] text-[#8b9298]">

                  <span>{resource.year}</span>

                  <span>{resource.semester}</span>

                </div>

                <div className="flex-1" />

                {/* ACTIONS */}

                <div className="mt-5 border-t border-[#e6e8ea] pt-4">

                  <div className="grid grid-cols-2 gap-2">

                    <Link
                      href={`/resources/${resource.id}`}
                      className="rounded-md bg-[#0f6fc6] px-3 py-2.5 text-center text-[12px] font-medium text-white hover:bg-[#0b5fae]"
                    >
                      View Resource
                    </Link>

                    <button
                      type="button"
                      className="rounded-md border border-[#d4d8db] bg-white px-3 py-2.5 text-[12px] text-[#555c62] hover:bg-[#f6f7f8]"
                    >
                      Download
                    </button>

                  </div>

                  <button
                    type="button"
                    onClick={() => removeSavedResource(resource.id)}
                    className="mt-2 w-full rounded-md border border-[#e3c8c8] bg-white px-3 py-2.5 text-[12px] font-medium text-[#a65757] hover:bg-[#fff7f7]"
                  >
                    Remove from Saved
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

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef5fa] text-[21px] text-[#0f6fc6]">
              ♡
            </div>

            <h3 className="mt-4 text-[16px] font-semibold text-[#343a40]">
              {savedResources.length === 0
                ? "No saved resources yet"
                : "No matching saved resources"}
            </h3>

            <p className="mx-auto mt-2 max-w-[430px] text-[13px] leading-5 text-[#747b81]">
              {savedResources.length === 0
                ? "When you save useful academic resources, they will appear here for quick access."
                : "Try changing your search or resource type filter to find your saved resources."}
            </p>

            {savedResources.length === 0 ? (

              <Link
                href="/resources"
                className="mt-5 inline-block rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[12px] font-medium text-white hover:bg-[#0b5fae]"
              >
                Browse Resources
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
            Saved resources are currently sample data. When Novelle&apos;s
            backend and student accounts are connected, resources saved using
            the heart button will automatically appear here and remain saved
            after the student logs out or refreshes the page.
          </p>

        </div>

      </div>

    </main>
  );
}
