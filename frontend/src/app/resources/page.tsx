"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Resource = {
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

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [programme, setProgramme] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // =====================================================
  // PROGRAMMES
  // =====================================================

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

  // =====================================================
  // RESOURCE TYPES
  // =====================================================

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

  // =====================================================
  // YEAR LOGIC
  // Architecture = 5 years
  // Other programmes = 4 years
  // =====================================================

  const years =
    programme === "Architecture"
      ? ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]
      : ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  // =====================================================
  // DEMO RESOURCES
  // These will come from the database later.
  // =====================================================

  const resources: Resource[] = [
    {
      id: 1,
      title: "Introduction to Programming",
      description:
        "Lecture notes covering programming fundamentals, variables, loops and functions.",
      programme: "Software Engineering",
      year: "1st Year",
      semester: "Semester 1",
      module: "Introduction to Programming",
      moduleCode: "SWE101",
      type: "Lecture Notes",
      likes: 126,
    },
    {
      id: 2,
      title: "Database Management Systems",
      description:
        "Revision notes covering relational databases, SQL, keys and normalization.",
      programme: "Software Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Database Management Systems",
      moduleCode: "SWE203",
      type: "Lecture Notes",
      likes: 94,
    },
    {
      id: 3,
      title: "Engineering Mathematics Past Paper",
      description:
        "Past question paper for Engineering Mathematics with important exam topics.",
      programme: "Civil Engineering",
      year: "1st Year",
      semester: "Semester 2",
      module: "Engineering Mathematics",
      moduleCode: "MAT101",
      type: "Past Question Paper",
      likes: 173,
    },
    {
      id: 4,
      title: "Computer Networks Assignment",
      description:
        "Assignment material covering network models, protocols and addressing.",
      programme: "Information Technology (IT)",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Computer Networks",
      moduleCode: "IT202",
      type: "Assignment",
      likes: 58,
    },
    {
      id: 5,
      title: "Data Structures Tutorial",
      description:
        "Tutorial questions on arrays, linked lists, stacks, queues and trees.",
      programme: "Software Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Data Structures",
      moduleCode: "SWE205",
      type: "Tutorial",
      likes: 88,
    },
    {
      id: 6,
      title: "Software Engineering Quiz",
      description:
        "Practice quiz covering software development models and requirements.",
      programme: "Software Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Software Engineering",
      moduleCode: "SWE201",
      type: "Quiz",
      likes: 141,
    },
    {
      id: 7,
      title: "Electronics Laboratory Material",
      description:
        "Laboratory material containing circuit experiments and measurement procedures.",
      programme: "Electronics & Communication Engineering (ECE)",
      year: "2nd Year",
      semester: "Semester 2",
      module: "Electronic Circuits",
      moduleCode: "ECE204",
      type: "Lab Material",
      likes: 72,
    },
    {
      id: 8,
      title: "Exam Preparation Study Guide",
      description:
        "Study guide containing important topics and revision suggestions for examinations.",
      programme: "Electrical Engineering",
      year: "1st Year",
      semester: "Semester 2",
      module: "Electrical Fundamentals",
      moduleCode: "EEE102",
      type: "Study Guide",
      likes: 110,
    },
    {
      id: 9,
      title: "Architecture Reference Material",
      description:
        "Reference material for architectural design principles and studio work.",
      programme: "Architecture",
      year: "5th Year",
      semester: "Semester 1",
      module: "Architectural Design",
      moduleCode: "ARC501",
      type: "Other",
      likes: 46,
    },
    {
      id: 10,
      title: "Theory of Probability Notes",
      description:
        "Notes covering probability concepts, random variables and probability distributions.",
      programme: "Software Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Theory of Probability",
      moduleCode: "MAT205",
      type: "Lecture Notes",
      likes: 102,
    },
    {
      id: 11,
      title: "Fluid Mechanics Tutorial",
      description:
        "Tutorial exercises covering fluid properties, pressure and flow concepts.",
      programme: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 1",
      module: "Fluid Mechanics",
      moduleCode: "CIV203",
      type: "Tutorial",
      likes: 65,
    },
    {
      id: 12,
      title: "Mechanical Engineering Lab Guide",
      description:
        "Laboratory guide for mechanical engineering practical sessions.",
      programme: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 2",
      module: "Mechanical Laboratory",
      moduleCode: "MEC204",
      type: "Lab Material",
      likes: 79,
    },
  ];

  // =====================================================
  // FILTER + SORT
  // =====================================================

  const filteredResources = useMemo(() => {
    let result = resources.filter((resource) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        resource.title.toLowerCase().includes(searchText) ||
        resource.description.toLowerCase().includes(searchText) ||
        resource.module.toLowerCase().includes(searchText) ||
        resource.moduleCode.toLowerCase().includes(searchText) ||
        resource.programme.toLowerCase().includes(searchText) ||
        resource.type.toLowerCase().includes(searchText);

      const matchesProgramme =
        !programme || resource.programme === programme;

      const matchesYear =
        !year || resource.year === year;

      const matchesSemester =
        !semester || resource.semester === semester;

      const matchesType =
        !resourceType || resource.type === resourceType;

      return (
        matchesSearch &&
        matchesProgramme &&
        matchesYear &&
        matchesSemester &&
        matchesType
      );
    });

    if (sortBy === "popular") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    }

    if (sortBy === "az") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortBy === "za") {
      result = [...result].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return result;
  }, [
    search,
    programme,
    year,
    semester,
    resourceType,
    sortBy,
  ]);

  // =====================================================
  // PROGRAMME CHANGE
  // =====================================================

  function handleProgrammeChange(value: string) {
    setProgramme(value);

    if (value !== "Architecture" && year === "5th Year") {
      setYear("");
    }
  }

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  function clearFilters() {
    setSearch("");
    setProgramme("");
    setYear("");
    setSemester("");
    setResourceType("");
    setSortBy("popular");
  }

  const filtersActive =
    search ||
    programme ||
    year ||
    semester ||
    resourceType;

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#202529]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-30 border-b border-[#dfe3e6] bg-white">

        <div className="flex h-[72px] items-center justify-between px-5 md:px-8">

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
            <img
              src="/logo.jpeg"
              alt="Novelle"
              className="h-11 w-11 rounded-full object-cover"
            />

            <div>
              <p className="text-[18px] font-bold text-[#0f6fc6]">
                Novelle
              </p>

              <p className="text-[10px] text-[#7b8288]">
                CST Student Platform
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">

            <Link
              href="/upload"
              className="hidden rounded-md bg-[#0f6fc6] px-4 py-2 text-[13px] font-medium text-white hover:bg-[#0b5fae] sm:block"
            >
              + Upload Resource
            </Link>

            <Link
              href="/dashboard"
              className="rounded-md border border-[#d4d9dd] bg-white px-4 py-2 text-[13px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
            >
              ← Dashboard
            </Link>

          </div>

        </div>

      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-[1450px] px-5 py-9 md:px-8">

        {/* HEADING */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <h1 className="text-[30px] font-bold text-[#202529]">
              Resource Library
            </h1>

            <p className="mt-2 text-[14px] text-[#697077]">
              Browse academic resources shared by the CST student
              community.
            </p>
          </div>

          <p className="text-[13px] text-[#777e84]">
            {filteredResources.length}{" "}
            {filteredResources.length === 1
              ? "resource"
              : "resources"}{" "}
            found
          </p>

        </div>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <div className="mt-7">

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b9298]">
              ⌕
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by title, module, module code, programme or resource type..."
              className="w-full rounded-lg border border-[#cfd4d8] bg-white py-3.5 pl-11 pr-4 text-[14px] outline-none placeholder:text-[#969ca1] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
            />

          </div>

        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="mt-5 rounded-lg border border-[#dfe3e6] bg-white p-5">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-[15px] font-bold text-[#30363b]">
                Filter Resources
              </h2>

              <p className="mt-1 text-[11px] text-[#81888e]">
                Narrow the library by academic details.
              </p>
            </div>

            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[12px] font-medium text-[#0f6fc6] hover:underline"
              >
                Clear Filters
              </button>
            )}

          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* PROGRAMME */}

            <div>

              <label className="mb-1.5 block text-[11px] font-semibold text-[#555c62]">
                Programme
              </label>

              <select
                value={programme}
                onChange={(event) =>
                  handleProgrammeChange(event.target.value)
                }
                className="w-full rounded-md border border-[#d4d9dd] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6]"
              >
                <option value="">
                  All Programmes
                </option>

                {programmes.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* YEAR */}

            <div>

              <label className="mb-1.5 block text-[11px] font-semibold text-[#555c62]">
                Year
              </label>

              <select
                value={year}
                onChange={(event) =>
                  setYear(event.target.value)
                }
                className="w-full rounded-md border border-[#d4d9dd] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6]"
              >
                <option value="">
                  All Years
                </option>

                {years.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            {/* SEMESTER */}

            <div>

              <label className="mb-1.5 block text-[11px] font-semibold text-[#555c62]">
                Semester
              </label>

              <select
                value={semester}
                onChange={(event) =>
                  setSemester(event.target.value)
                }
                className="w-full rounded-md border border-[#d4d9dd] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6]"
              >
                <option value="">
                  All Semesters
                </option>

                <option value="Semester 1">
                  Semester 1
                </option>

                <option value="Semester 2">
                  Semester 2
                </option>

              </select>

            </div>

            {/* RESOURCE TYPE */}

            <div>

              <label className="mb-1.5 block text-[11px] font-semibold text-[#555c62]">
                Resource Type
              </label>

              <select
                value={resourceType}
                onChange={(event) =>
                  setResourceType(event.target.value)
                }
                className="w-full rounded-md border border-[#d4d9dd] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6]"
              >
                <option value="">
                  All Types
                </option>

                {resourceTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}

              </select>

            </div>

            {/* SORT */}

            <div>

              <label className="mb-1.5 block text-[11px] font-semibold text-[#555c62]">
                Sort By
              </label>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="w-full rounded-md border border-[#d4d9dd] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6]"
              >
                <option value="popular">
                  Most Liked
                </option>

                <option value="az">
                  Title A–Z
                </option>

                <option value="za">
                  Title Z–A
                </option>

              </select>

            </div>

          </div>

          {programme === "Architecture" && (
            <p className="mt-3 text-[11px] text-[#777e84]">
              Architecture resources include 1st through 5th Year.
            </p>
          )}

        </div>

        {/* =====================================================
            ACTIVE FILTERS
        ===================================================== */}

        {filtersActive && (
          <div className="mt-5 flex flex-wrap items-center gap-2">

            <span className="mr-1 text-[11px] font-semibold text-[#777e84]">
              Active:
            </span>

            {programme && (
              <span className="rounded-full bg-[#e8f3fb] px-3 py-1 text-[11px] font-medium text-[#0f6fc6]">
                {programme}
              </span>
            )}

            {year && (
              <span className="rounded-full bg-[#e8f3fb] px-3 py-1 text-[11px] font-medium text-[#0f6fc6]">
                {year}
              </span>
            )}

            {semester && (
              <span className="rounded-full bg-[#e8f3fb] px-3 py-1 text-[11px] font-medium text-[#0f6fc6]">
                {semester}
              </span>
            )}

            {resourceType && (
              <span className="rounded-full bg-[#e8f3fb] px-3 py-1 text-[11px] font-medium text-[#0f6fc6]">
                {resourceType}
              </span>
            )}

          </div>
        )}

        {/* =====================================================
            RESOURCE GRID
        ===================================================== */}

        {filteredResources.length > 0 ? (

          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {filteredResources.map((resource) => (

              <article
                key={resource.id}
                className="flex min-h-[315px] flex-col rounded-lg border border-[#dfe3e6] bg-white"
              >

                {/* CARD BODY */}

                <div className="flex-1 p-5">

                  {/* TYPE + LIKES */}

                  <div className="flex items-center justify-between gap-3">

                    <span className="rounded bg-[#e8f3fb] px-2.5 py-1 text-[10px] font-semibold text-[#0f6fc6]">
                      {resource.type}
                    </span>

                    <span className="text-[11px] text-[#747b81]">
                      ♥ {resource.likes}
                    </span>

                  </div>

                  {/* TITLE */}

                  <h2 className="mt-4 text-[16px] font-bold leading-6 text-[#252a30]">
                    {resource.title}
                  </h2>

                  {/* DESCRIPTION */}

                  <p className="mt-2 line-clamp-3 text-[12px] leading-5 text-[#697077]">
                    {resource.description}
                  </p>

                  {/* MODULE */}

                  <div className="mt-5">

                    <p className="text-[11px] font-semibold text-[#343a40]">
                      {resource.module}
                    </p>

                    <p className="mt-1 text-[10px] text-[#8a9197]">
                      {resource.moduleCode}
                    </p>

                  </div>

                  {/* PROGRAMME */}

                  <p className="mt-4 text-[11px] leading-5 text-[#656c72]">
                    {resource.programme}
                  </p>

                  {/* YEAR + SEMESTER */}

                  <div className="mt-2 flex flex-wrap gap-2">

                    <span className="rounded bg-[#f2f3f4] px-2 py-1 text-[10px] text-[#60676d]">
                      {resource.year}
                    </span>

                    <span className="rounded bg-[#f2f3f4] px-2 py-1 text-[10px] text-[#60676d]">
                      {resource.semester}
                    </span>

                  </div>

                </div>

                {/* =====================================================
                    CARD ACTIONS
                ===================================================== */}

                <div className="border-t border-[#e6e9eb] p-4">

                  <div className="flex items-center gap-2">

                    {/* VIEW RESOURCE */}

                    <Link
                      href={`/resources/${resource.id}`}
                      className="flex-1 rounded-md bg-[#0f6fc6] px-3 py-2 text-center text-[12px] font-medium text-white hover:bg-[#0b5fae]"
                    >
                      View
                    </Link>

                    {/* DOWNLOAD */}

                    <button
                      type="button"
                      className="flex-1 rounded-md border border-[#cfd4d8] bg-white px-3 py-2 text-[12px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
                    >
                      Download
                    </button>

                    {/* SAVE */}

                    <button
                      type="button"
                      title="Save resource"
                      className="flex h-[34px] w-[36px] items-center justify-center rounded-md border border-[#cfd4d8] bg-white text-[15px] text-[#6d747a] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
                    >
                      ♡
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =====================================================
              EMPTY STATE
          ===================================================== */

          <div className="mt-7 rounded-lg border border-[#dfe3e6] bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef5fa] text-[20px] text-[#0f6fc6]">
              ⌕
            </div>

            <h2 className="mt-4 text-[17px] font-bold text-[#30363b]">
              No resources found
            </h2>

            <p className="mx-auto mt-2 max-w-[430px] text-[13px] leading-5 text-[#777e84]">
              We couldn't find resources matching your current search
              and filters. Try changing or clearing the filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
            >
              Clear Filters
            </button>

          </div>

        )}

        {/* =====================================================
            BOTTOM UPLOAD
        ===================================================== */}

        <div className="mt-10 rounded-lg border border-[#d7e5ef] bg-[#f5faff] px-6 py-6">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <h2 className="text-[15px] font-bold text-[#30363b]">
                Have something useful to share?
              </h2>

              <p className="mt-1 text-[12px] text-[#747b81]">
                Help other CST students by contributing your academic
                resources to Novelle.
              </p>

            </div>

            <Link
              href="/upload"
              className="shrink-0 rounded-md bg-[#0f6fc6] px-5 py-2.5 text-center text-[13px] font-medium text-white hover:bg-[#0b5fae]"
            >
              + Upload Resource
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
