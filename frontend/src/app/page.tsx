"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // ================= PROGRAMMES =================

  const programmes = [
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication Engineering",
    "Information Technology",
    "Architecture",
    "Engineering Geology",
    "Instrumentation & Control Engineering",
    "Water Resources Engineering",
    "Mechanical Engineering",
    "Software Engineering",
  ];

  // ================= YEARS =================

  const normalYears = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
  ];

  const architectureYears = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "5th Year",
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

  const years =
    selectedProgramme === "Architecture"
      ? architectureYears
      : normalYears;

  function handleProgrammeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setSelectedProgramme(event.target.value);
    setSelectedYear("");
  }

  function scrollToResources() {
    document
      .getElementById("resources")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-white text-[#202529]">

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="sticky top-0 z-50 border-b border-[#dfe3e6] bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-8">

          {/* LEFT */}

          <div className="flex items-center">

            <Link
              href="/"
              className="mr-9 flex items-center gap-3"
            >
              <img
                src="/logo.jpeg"
                alt="Novelle"
                className="h-11 w-11 rounded-full object-cover"
              />

              <span className="text-[18px] font-semibold text-[#202529]">
                Novelle
              </span>
            </Link>

            <nav className="hidden items-center gap-7 md:flex">

              <a
                href="#home"
                className="text-[15px] text-[#30363b] hover:text-[#0f6fc6]"
              >
                Home
              </a>

              <a
                href="#resources"
                className="text-[15px] text-[#30363b] hover:text-[#0f6fc6]"
              >
                Resources
              </a>

              <a
                href="#about"
                className="text-[15px] text-[#30363b] hover:text-[#0f6fc6]"
              >
                About
              </a>

            </nav>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <Link
              href="/signup"
              className="rounded-md px-4 py-2 text-[14px] font-medium text-[#0f6fc6] hover:bg-[#f1f7fb]"
            >
              Sign Up
            </Link>

            <Link
              href="/login"
              className="rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#0b5fae]"
            >
              Login
            </Link>

          </div>

        </div>
      </header>

      {/* ==================================================
          HERO
      ================================================== */}

      <section
        id="home"
        className="border-b border-[#e3e6e8] bg-white"
      >

        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-16 md:px-8 lg:grid-cols-2 lg:py-20">

          {/* LEFT */}

          <div>

            <p className="mb-4 text-[15px] font-medium text-[#0f6fc6]">
              CST Academic Resource Sharing Platform
            </p>

            <h1 className="text-[42px] font-bold leading-[1.15] tracking-[-0.7px] text-[#202529] md:text-[52px]">
              Your academic resources,
              <span className="text-[#0f6fc6]">
                {" "}all in one place.
              </span>
            </h1>

            <p className="mt-6 max-w-[620px] text-[17px] leading-7 text-[#5f666c]">
              Find, share, preview and download academic resources
              created for students of the College of Science and
              Technology.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <button
                onClick={scrollToResources}
                className="rounded-md bg-[#0f6fc6] px-6 py-3 text-[15px] font-medium text-white hover:bg-[#0b5fae]"
              >
                Explore Resources
              </button>

              <Link
                href="/upload"
                className="rounded-md border border-[#bfc5c9] bg-white px-6 py-3 text-[15px] font-medium text-[#30363b] hover:bg-[#f7f8f9]"
              >
                Upload Resource
              </Link>

            </div>

          </div>

          {/* RIGHT — NOVELLE LOGO */}

          <div className="flex justify-center lg:justify-end">

            <div className="w-full max-w-[400px] rounded-xl border border-[#dfe3e6] bg-white p-5">

              <img
                src="/logo.jpeg"
                alt="Novelle"
                className="w-full rounded-lg object-cover"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================
          RESOURCES
      ================================================== */}

      <section
        id="resources"
        className="bg-white px-6 py-16 md:px-8"
      >

        <div className="mx-auto max-w-[1200px]">

          {/* RESOURCE HEADING */}

          <div className="mb-10 text-center">

            <p className="text-[14px] font-medium text-[#0f6fc6]">
              Academic Library
            </p>

            <h2 className="mt-2 text-[32px] font-bold text-[#202529]">
              Find your resources
            </h2>

            <p className="mx-auto mt-3 max-w-[650px] text-[15px] leading-6 text-[#626970]">
              Select your programme, year, semester and resource
              type to find academic materials relevant to you.
            </p>

          </div>

          {/* ==================================================
              FILTER BOX
          ================================================== */}

          <div className="rounded-xl border border-[#dfe3e6] bg-white p-6 md:p-8">

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {/* PROGRAMME */}

              <div>

                <label className="mb-2 block text-[14px] font-semibold text-[#343a40]">
                  Programme
                </label>

                <select
                  value={selectedProgramme}
                  onChange={handleProgrammeChange}
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[14px] text-[#343a40] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                >

                  <option value="">
                    Select programme
                  </option>

                  {programmes.map((programme) => (
                    <option
                      key={programme}
                      value={programme}
                    >
                      {programme}
                    </option>
                  ))}

                </select>

              </div>

              {/* YEAR */}

              <div>

                <label className="mb-2 block text-[14px] font-semibold text-[#343a40]">
                  Year
                </label>

                <select
                  value={selectedYear}
                  disabled={!selectedProgramme}
                  onChange={(event) =>
                    setSelectedYear(event.target.value)
                  }
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[14px] text-[#343a40] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6] disabled:cursor-not-allowed disabled:bg-[#f3f4f5] disabled:text-[#92989d]"
                >

                  <option value="">
                    {selectedProgramme
                      ? "Select year"
                      : "Select programme first"}
                  </option>

                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}

                </select>

                {selectedProgramme === "Architecture" && (
                  <p className="mt-2 text-[12px] text-[#0f6fc6]">
                    Architecture includes 5th Year.
                  </p>
                )}

              </div>

              {/* SEMESTER */}

              <div>

                <label className="mb-2 block text-[14px] font-semibold text-[#343a40]">
                  Semester
                </label>

                <select
                  value={selectedSemester}
                  onChange={(event) =>
                    setSelectedSemester(event.target.value)
                  }
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[14px] text-[#343a40] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                >

                  <option value="">
                    Select semester
                  </option>

                  <option value="1">
                    Semester 1
                  </option>

                  <option value="2">
                    Semester 2
                  </option>

                </select>

              </div>

              {/* RESOURCE TYPE */}

              <div>

                <label className="mb-2 block text-[14px] font-semibold text-[#343a40]">
                  Resource Type
                </label>

                <select
                  value={selectedType}
                  onChange={(event) =>
                    setSelectedType(event.target.value)
                  }
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[14px] text-[#343a40] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                >

                  <option value="">
                    All resource types
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

            </div>

            {/* SEARCH */}

            <div className="mt-6 flex justify-center">

              <button className="rounded-md bg-[#0f6fc6] px-8 py-3 text-[14px] font-medium text-white hover:bg-[#0b5fae]">
                Search Resources
              </button>

            </div>

            {/* CURRENT SELECTION */}

            {selectedProgramme && (

              <div className="mt-7 border-t border-[#e1e4e6] pt-5">

                <p className="mb-3 text-[13px] font-semibold text-[#454b50]">
                  Your selection
                </p>

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-md bg-[#e8f3fb] px-3 py-1.5 text-[13px] text-[#0f6fc6]">
                    {selectedProgramme}
                  </span>

                  {selectedYear && (
                    <span className="rounded-md bg-[#e8f3fb] px-3 py-1.5 text-[13px] text-[#0f6fc6]">
                      {selectedYear}
                    </span>
                  )}

                  {selectedSemester && (
                    <span className="rounded-md bg-[#e8f3fb] px-3 py-1.5 text-[13px] text-[#0f6fc6]">
                      Semester {selectedSemester}
                    </span>
                  )}

                  {selectedType && (
                    <span className="rounded-md bg-[#e8f3fb] px-3 py-1.5 text-[13px] text-[#0f6fc6]">
                      {selectedType}
                    </span>
                  )}

                </div>

              </div>

            )}

          </div>

          {/* ==================================================
              BROWSE RESOURCE TYPES
          ================================================== */}

          <div className="mt-14">

            <div className="mb-7 text-center">

              <h3 className="text-[26px] font-bold text-[#202529]">
                Browse by resource type
              </h3>

              <p className="mt-2 text-[14px] text-[#697077]">
                Quickly browse the type of academic material you need.
              </p>

            </div>

            {/* 4 × 2 GRID */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {resourceTypes.map((type) => (

                <button
                  key={type}
                  onClick={() =>
                    setSelectedType(type)
                  }
                  className={`min-h-[150px] rounded-xl border bg-white p-5 text-left transition hover:border-[#8ebfe2] hover:shadow-sm ${
                    selectedType === type
                      ? "border-[#0f6fc6] bg-[#f6fbff]"
                      : "border-[#dfe3e6]"
                  }`}
                >

                  {/* ICON */}

                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#e4f2fc] text-[18px] font-semibold text-[#0f6fc6]">
                    +
                  </div>

                  {/* TITLE */}

                  <h4 className="text-[15px] font-semibold text-[#252a30]">
                    {type}
                  </h4>

                  {/* DESCRIPTION */}

                  <p className="mt-2 text-[13px] leading-5 text-[#6c7379]">
                    Browse {type.toLowerCase()} shared by CST students.
                  </p>

                </button>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================
          ABOUT NOVELLE
      ================================================== */}

      <section
        id="about"
        className="mt-12 border-t border-[#dfe3e6] bg-[#f8f9fa] px-6 py-16 md:px-8"
      >

        <div className="mx-auto max-w-[850px] text-center">

          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#0f6fc6]">
            About Novelle
          </p>

          <h2 className="mt-3 text-[30px] font-bold text-[#202529]">
            Share notes. Share knowledge.
          </h2>

          <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#60676d]">
            Novelle is an academic resource sharing platform
            designed for students of the College of Science and
            Technology to discover, upload and share useful learning
            materials in one organized place.
          </p>

        </div>

      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="border-t border-[#dfe3e6] bg-white">

        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-5 px-6 py-7 md:flex-row">

          <div className="flex items-center gap-3">

            <img
              src="/logo.jpeg"
              alt="Novelle"
              className="h-9 w-9 rounded-full object-cover"
            />

            <div>

              <p className="text-[14px] font-semibold text-[#202529]">
                Novelle
              </p>

              <p className="text-[11px] text-[#747b81]">
                SHARE NOTES. SHARE KNOWLEDGE.
              </p>

            </div>

          </div>

          <p className="text-[12px] text-[#747b81]">
            CST Academic Resource Sharing Platform
          </p>

        </div>

      </footer>

    </main>
  );
}
