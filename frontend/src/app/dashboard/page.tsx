"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("Home");
  const [savedResources, setSavedResources] = useState<number[]>([]);

  // ================= PROGRAMMES =================

  const programmes = [
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication Engineering (ECE)",
    "Information Technology (IT)",
    "Architecture",
    "Engineering Geology",
    "Instrumentation & Control Engineering",
    "Water Resources Engineering",
    "Mechanical Engineering",
    "Software Engineering",
  ];

  // ================= RESOURCE TYPES =================

  const resourceTypes = [
    "Lecture Notes",
    "Past Question Paper",
    "Assignment",
    "Tutorial",
    "Quiz",
    "Lab Material",
    "Study Guide",
    "Other",
  ];

  // ================= DEMO RESOURCES =================
  // Frontend demo only.
  // Later these resources will come from the database.

  const resources = [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Programming fundamentals and basic concepts.",
      programme: "Software Engineering",
      year: "Year 1",
      semester: "Semester 1",
      type: "Lecture Notes",
    },
    {
      id: 2,
      title: "Database Management Systems",
      description: "SQL, relational databases and database concepts.",
      programme: "Software Engineering",
      year: "Year 2",
      semester: "Semester 1",
      type: "Lecture Notes",
    },
    {
      id: 3,
      title: "Engineering Mathematics Past Paper",
      description: "Past examination questions for engineering mathematics.",
      programme: "Common Module",
      year: "Year 1",
      semester: "Semester 2",
      type: "Past Question Paper",
    },
    {
      id: 4,
      title: "Computer Networks Assignment",
      description: "Practice assignment covering networking fundamentals.",
      programme: "Information Technology (IT)",
      year: "Year 2",
      semester: "Semester 1",
      type: "Assignment",
    },
    {
      id: 5,
      title: "Data Structures Tutorial",
      description: "Tutorial exercises on arrays, stacks, queues and trees.",
      programme: "Software Engineering",
      year: "Year 2",
      semester: "Semester 1",
      type: "Tutorial",
    },
    {
      id: 6,
      title: "Software Engineering Quiz",
      description: "Quiz questions covering software engineering concepts.",
      programme: "Software Engineering",
      year: "Year 2",
      semester: "Semester 1",
      type: "Quiz",
    },
    {
      id: 7,
      title: "Electronics Laboratory Material",
      description: "Laboratory material and practical exercises.",
      programme: "Electronics & Communication Engineering (ECE)",
      year: "Year 2",
      semester: "Semester 2",
      type: "Lab Material",
    },
    {
      id: 8,
      title: "Exam Preparation Study Guide",
      description: "Revision material and important topics for examinations.",
      programme: "Civil Engineering",
      year: "Year 1",
      semester: "Semester 2",
      type: "Study Guide",
    },
    {
      id: 9,
      title: "Architecture Reference Material",
      description: "Additional academic reference material for students.",
      programme: "Architecture",
      year: "Year 3",
      semester: "Semester 1",
      type: "Other",
    },
  ];

  // ================= FILTERING =================

  const filteredResources = resources.filter((resource) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.description.toLowerCase().includes(searchText) ||
      resource.programme.toLowerCase().includes(searchText) ||
      resource.type.toLowerCase().includes(searchText) ||
      resource.year.toLowerCase().includes(searchText) ||
      resource.semester.toLowerCase().includes(searchText);

    let matchesMenu = true;

    if (resourceTypes.includes(activeMenu)) {
      matchesMenu = resource.type === activeMenu;
    } else if (programmes.includes(activeMenu)) {
      matchesMenu = resource.programme === activeMenu;
    }

    return matchesSearch && matchesMenu;
  });

  // ================= SAVE RESOURCE =================

  function toggleSaved(id: number) {
    setSavedResources((current) =>
      current.includes(id)
        ? current.filter((resourceId) => resourceId !== id)
        : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#202529]">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 z-40 flex h-screen w-[245px] flex-col border-r border-[#dfe3e6] bg-white">

        {/* LOGO */}

        <div className="border-b border-[#e5e8ea] px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Novelle"
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <h1 className="text-[19px] font-bold text-[#0f6fc6]">
                Novelle
              </h1>

              <p className="mt-0.5 text-[11px] text-[#7b8288]">
                CST Student Platform
              </p>
            </div>
          </Link>
        </div>

        {/* SCROLLABLE SIDEBAR */}

        <div className="flex-1 overflow-y-auto px-3 py-5">

          {/* HOME */}

          <button
            onClick={() => setActiveMenu("Home")}
            className={`w-full rounded-md px-3 py-2.5 text-left text-[14px] ${
              activeMenu === "Home"
                ? "bg-[#dcecff] font-medium text-[#0f6fc6]"
                : "text-[#4c5359] hover:bg-[#f3f5f6]"
            }`}
          >
            Home
          </button>

          {/* ================= RESOURCES ================= */}

          <p className="mb-2 mt-7 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#969da3]">
            Resources
          </p>

          <div className="space-y-1">
            {resourceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveMenu(type)}
                className={`w-full rounded-md px-3 py-2 text-left text-[13px] ${
                  activeMenu === type
                    ? "bg-[#dcecff] font-medium text-[#0f6fc6]"
                    : "text-[#4c5359] hover:bg-[#f3f5f6]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* UPLOAD */}

          <div className="mt-3 border-t border-[#edf0f2] pt-3">
            <Link
              href="/upload"
              className="block rounded-md px-3 py-2 text-[13px] font-medium text-[#0f6fc6] hover:bg-[#f1f7fb]"
            >
              + Upload Resource
            </Link>
          </div>

          {/* ================= PROGRAMMES ================= */}

          <p className="mb-2 mt-7 px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#969da3]">
            Programmes
          </p>

          <div className="space-y-1">
            {programmes.map((programme) => (
              <button
                key={programme}
                onClick={() => setActiveMenu(programme)}
                className={`w-full rounded-md px-3 py-2 text-left text-[13px] leading-5 ${
                  activeMenu === programme
                    ? "bg-[#dcecff] font-medium text-[#0f6fc6]"
                    : "text-[#4c5359] hover:bg-[#f3f5f6]"
                }`}
              >
                {programme}
              </button>
            ))}
          </div>
        </div>

        {/* ================= SIDEBAR BOTTOM ================= */}

        <div className="border-t border-[#e3e6e8] bg-white p-3">
          <button
            onClick={() => setActiveMenu("Settings")}
            className={`w-full rounded-md px-3 py-2 text-left text-[14px] ${
              activeMenu === "Settings"
                ? "bg-[#dcecff] text-[#0f6fc6]"
                : "text-[#555c62] hover:bg-[#f3f5f6]"
            }`}
          >
            Settings
          </button>

          <button
            onClick={() => setActiveMenu("Profile")}
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 hover:bg-[#f3f5f6]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#30363b] text-[12px] font-semibold text-white">
              N
            </div>

            <div className="text-left">
              <p className="text-[13px] font-medium text-[#30363b]">
                Profile
              </p>

              <p className="text-[10px] text-[#8b9298]">
                CST Student
              </p>
            </div>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <div className="ml-[245px] min-h-screen">

        {/* ================= TOP BAR ================= */}

        <header className="flex h-[64px] items-center justify-end border-b border-[#dfe3e6] bg-white px-8">
          <div className="flex items-center gap-5">
            <button
              className="text-[14px] text-[#60676d] hover:text-[#0f6fc6]"
              title="Notifications"
            >
              Notifications
            </button>

            <div className="h-6 w-px bg-[#dfe3e6]" />

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f6fc6] text-[12px] font-semibold text-white">
                N
              </div>

              <span className="text-[13px] font-medium text-[#343a40]">
                Student
              </span>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}

        <div className="px-8 py-10 lg:px-10">

          {/* WELCOME */}

          <div className="text-center">
            <h2 className="text-[34px] font-bold tracking-[-0.5px] text-[#202529]">
              Welcome to{" "}
              <span className="text-[#0f6fc6]">
                Novelle
              </span>
            </h2>

            <p className="mt-2 text-[14px] text-[#697077]">
              Find notes and learning resources from CST students.
            </p>
          </div>

          {/* ================= SEARCH ================= */}

          <div className="mx-auto mt-8 max-w-[650px]">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a9197]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search notes, modules, programmes, resource types..."
                className="w-full rounded-lg border border-[#aeb5ba] bg-white py-3 pl-11 pr-4 text-[14px] outline-none placeholder:text-[#969ca1] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
              />
            </div>
          </div>

          {/* ================= RESOURCE TYPE QUICK ACCESS ================= */}

          <div className="mx-auto mt-8 max-w-[1200px]">
            <p className="mb-3 text-[13px] font-medium text-[#60676d]">
              Browse by resource type
            </p>

            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveMenu(type)}
                  className={`rounded-md border px-3 py-2 text-[12px] transition ${
                    activeMenu === type
                      ? "border-[#0f6fc6] bg-[#0f6fc6] text-white"
                      : "border-[#d6dade] bg-white text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* ================= RESOURCES ================= */}

          <section className="mx-auto mt-10 max-w-[1200px]">

            <div className="mb-5 flex items-end justify-between">
              <div>
                <h3 className="text-[20px] font-bold text-[#202529]">
                  {activeMenu === "Home"
                    ? "Available Resources"
                    : activeMenu}
                </h3>

                <p className="mt-1 text-[13px] text-[#70777d]">
                  {activeMenu === "Home"
                    ? "Browse recently available study materials."
                    : resourceTypes.includes(activeMenu)
                    ? `Browse available ${activeMenu.toLowerCase()}.`
                    : programmes.includes(activeMenu)
                    ? `Browse resources shared for ${activeMenu}.`
                    : `Manage your ${activeMenu.toLowerCase()}.`}
                </p>
              </div>

              {(activeMenu === "Home" ||
                resourceTypes.includes(activeMenu) ||
                programmes.includes(activeMenu)) && (
                <button className="text-[13px] font-medium text-[#0f6fc6] hover:underline">
                  View all →
                </button>
              )}
            </div>

            {/* ================= RESOURCE CARDS ================= */}

            {activeMenu !== "Settings" && activeMenu !== "Profile" ? (
              filteredResources.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {filteredResources.map((resource) => (
                    <article
                      key={resource.id}
                      className="flex min-h-[240px] flex-col rounded-xl border border-[#dfe3e6] bg-white p-4 transition hover:border-[#b9c0c5] hover:shadow-sm"
                    >

                      {/* RESOURCE TYPE */}

                      <div className="mb-3">
                        <span className="rounded-md bg-[#e8f3fb] px-2.5 py-1 text-[10px] font-medium text-[#0f6fc6]">
                          {resource.type}
                        </span>
                      </div>

                      {/* TITLE */}

                      <h4 className="text-[14px] font-bold leading-5 text-[#252a30]">
                        {resource.title}
                      </h4>

                      {/* DESCRIPTION */}

                      <p className="mt-2 min-h-[42px] text-[12px] leading-5 text-[#697077]">
                        {resource.description}
                      </p>

                      {/* PROGRAMME */}

                      <p className="mt-3 truncate text-[11px] text-[#747b81]">
                        {resource.programme}
                      </p>

                      {/* YEAR + SEMESTER */}

                      <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-[#8b9298]">
                        <span>{resource.year}</span>
                        <span>{resource.semester}</span>
                      </div>

                      <div className="flex-1" />

                      {/* BUTTONS */}

                      <div className="mt-4 border-t border-[#e6e8ea] pt-3">
                        <div className="grid grid-cols-[1fr_1fr_38px] gap-2">

                          <button className="rounded-md bg-[#0f6fc6] px-3 py-2 text-[12px] font-medium text-white hover:bg-[#0b5fae]">
                            View
                          </button>

                          <button className="rounded-md border border-[#d4d8db] bg-white px-3 py-2 text-[12px] text-[#555c62] hover:bg-[#f6f7f8]">
                            Download
                          </button>

                          <button
                            onClick={() => toggleSaved(resource.id)}
                            title="Save resource"
                            className={`rounded-md border px-2 py-2 text-[14px] ${
                              savedResources.includes(resource.id)
                                ? "border-[#9bc6e6] bg-[#e9f5fd] text-[#0f6fc6]"
                                : "border-[#d4d8db] bg-white text-[#777e84] hover:bg-[#f6f7f8]"
                            }`}
                          >
                            {savedResources.includes(resource.id)
                              ? "♥"
                              : "♡"}
                          </button>

                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-[#dfe3e6] bg-white px-6 py-14 text-center">
                  <p className="text-[16px] font-semibold text-[#343a40]">
                    No resources found
                  </p>

                  <p className="mt-2 text-[13px] text-[#747b81]">
                    There are no matching resources in this category yet.
                  </p>

                  <button
                    onClick={() => {
                      setActiveMenu("Home");
                      setSearch("");
                    }}
                    className="mt-5 rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
                  >
                    View All Resources
                  </button>
                </div>
              )
            ) : (

              /* SETTINGS / PROFILE PLACEHOLDER */

              <div className="rounded-xl border border-[#dfe3e6] bg-white px-6 py-14 text-center">
                <p className="text-[18px] font-semibold text-[#343a40]">
                  {activeMenu}
                </p>

                <p className="mt-2 text-[13px] text-[#747b81]">
                  We will design this section after completing the main student dashboard.
                </p>
              </div>

            )}
          </section>
        </div>
      </div>
    </main>
  );
}
