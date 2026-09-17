"use client";

import { useState } from "react";

export default function Home() {
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // All current CST bachelor's programmes
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

  // All programmes except Architecture are 4 years
  const normalYears = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
  ];

  // Architecture is 5 years
  const architectureYears = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "5th Year",
  ];

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

    // Reset year whenever programme changes
    setSelectedYear("");
  }

  function scrollToResources() {
    document
      .getElementById("resources")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#fffaf8] text-[#4b2938]">

      {/* =========================
          NAVBAR
      ========================== */}

      <header className="border-b border-[#ead8da] bg-[#fffaf8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Novelle logo"
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div>
              <h1 className="font-serif text-3xl font-semibold tracking-wide text-[#512d3d]">
                Novelle
              </h1>

              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c17d87]">
                Share Notes. Share Knowledge.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="text-sm font-medium text-[#4b3941] transition hover:text-[#bd7782]"
            >
              Home
            </a>

            <a
              href="#resources"
              className="text-sm font-medium text-[#4b3941] transition hover:text-[#bd7782]"
            >
              Resources
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-[#4b3941] transition hover:text-[#bd7782]"
            >
              About
            </a>

            <button className="rounded-lg border border-[#7a5262] px-6 py-2.5 text-sm font-medium text-[#6b4353] transition hover:bg-[#f8eaec]">
              Sign Up
            </button>

            <button className="rounded-lg bg-[#512d3d] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#693a4e]">
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* =========================
          HERO SECTION
      ========================== */}

      <section
        id="home"
        className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-2 lg:py-28"
      >

        {/* LEFT SIDE */}
        <div>
          <div className="mb-7 inline-block rounded-full border border-[#efcdd2] bg-[#fff1f2] px-5 py-2 text-sm font-semibold text-[#b76f7a]">
            CST Academic Resource Sharing Platform
          </div>

          <h2 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.05] text-[#4b2938] md:text-6xl lg:text-7xl">
            Your academic{" "}
            <span className="text-[#c77f89]">
              resources
            </span>
            , all in one place.
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#755f68]">
            Find, share, preview and download academic resources
            created for students of the College of Science and
            Technology.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">

            <button
              onClick={scrollToResources}
              className="rounded-xl bg-[#5a3042] px-7 py-4 font-semibold text-white shadow-sm transition hover:bg-[#704056]"
            >
              Explore Resources
            </button>

            <button className="rounded-xl border border-[#9d7482] bg-white px-7 py-4 font-semibold text-[#684153] transition hover:bg-[#fff1f2]">
              Upload Resource
            </button>

          </div>
        </div>

        {/* RIGHT SIDE LOGO */}
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-[2rem] border border-[#eedcdf] bg-white p-6 shadow-[0_20px_60px_rgba(91,48,66,0.10)]">

            <img
              src="/logo.jpeg"
              alt="Novelle logo"
              className="w-full rounded-[1.5rem] object-cover"
            />

          </div>
        </div>

      </section>

      {/* =========================
          RESOURCE SECTION
      ========================== */}

      <section
        id="resources"
        className="border-t border-[#f0dfe1] bg-white px-6 py-20 md:px-10"
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c17d87]">
              Academic Library
            </p>

            <h2 className="font-serif text-4xl font-semibold text-[#4b2938] md:text-5xl">
              Find your resources
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[#806a72]">
              Select your programme, year, semester and resource
              type to find academic materials relevant to you.
            </p>

          </div>

          {/* FILTER CARD */}
          <div className="rounded-[2rem] border border-[#eedcdf] bg-[#fffaf8] p-7 shadow-sm md:p-10">

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {/* =====================
                  PROGRAMME
              ====================== */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5b3545]">
                  Programme
                </label>

                <select
                  value={selectedProgramme}
                  onChange={handleProgrammeChange}
                  className="w-full rounded-xl border border-[#dec7cc] bg-white px-4 py-3 text-[#5d4750] outline-none transition focus:border-[#b87380]"
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

              {/* =====================
                  YEAR
              ====================== */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5b3545]">
                  Year
                </label>

                <select
                  value={selectedYear}
                  onChange={(event) =>
                    setSelectedYear(event.target.value)
                  }
                  disabled={!selectedProgramme}
                  className="w-full rounded-xl border border-[#dec7cc] bg-white px-4 py-3 text-[#5d4750] outline-none transition focus:border-[#b87380] disabled:cursor-not-allowed disabled:bg-[#f5eeee] disabled:text-[#aa999f]"
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

                {/* Architecture message */}
                {selectedProgramme === "Architecture" && (
                  <p className="mt-2 text-xs text-[#b87380]">
                    Architecture includes 5th Year.
                  </p>
                )}

              </div>

              {/* =====================
                  SEMESTER
              ====================== */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5b3545]">
                  Semester
                </label>

                <select
                  value={selectedSemester}
                  onChange={(event) =>
                    setSelectedSemester(event.target.value)
                  }
                  className="w-full rounded-xl border border-[#dec7cc] bg-white px-4 py-3 text-[#5d4750] outline-none transition focus:border-[#b87380]"
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

              {/* =====================
                  RESOURCE TYPE
              ====================== */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5b3545]">
                  Resource Type
                </label>

                <select
                  value={selectedType}
                  onChange={(event) =>
                    setSelectedType(event.target.value)
                  }
                  className="w-full rounded-xl border border-[#dec7cc] bg-white px-4 py-3 text-[#5d4750] outline-none transition focus:border-[#b87380]"
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

            {/* SEARCH BUTTON */}

            <div className="mt-8 flex justify-center">

              <button className="rounded-xl bg-[#5a3042] px-10 py-3.5 font-semibold text-white transition hover:bg-[#704056]">
                Search Resources
              </button>

            </div>

            {/* =====================
                CURRENT SELECTION
            ====================== */}

            {selectedProgramme && (

              <div className="mt-8 rounded-2xl border border-[#efdadd] bg-white p-5">

                <p className="text-sm font-semibold text-[#b87380]">
                  Your selection
                </p>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-[#f9e8eb] px-4 py-2 text-sm text-[#6b4050]">
                    {selectedProgramme}
                  </span>

                  {selectedYear && (
                    <span className="rounded-full bg-[#f9e8eb] px-4 py-2 text-sm text-[#6b4050]">
                      {selectedYear}
                    </span>
                  )}

                  {selectedSemester && (
                    <span className="rounded-full bg-[#f9e8eb] px-4 py-2 text-sm text-[#6b4050]">
                      Semester {selectedSemester}
                    </span>
                  )}

                  {selectedType && (
                    <span className="rounded-full bg-[#f9e8eb] px-4 py-2 text-sm text-[#6b4050]">
                      {selectedType}
                    </span>
                  )}

                </div>

              </div>

            )}

          </div>

          {/* =========================
              RESOURCE TYPE CARDS
          ========================== */}

          <div className="mt-16">

            <h3 className="text-center font-serif text-3xl font-semibold text-[#4b2938]">
              Browse by resource type
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-center text-[#806a72]">
              Quickly browse the type of academic material you need.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {resourceTypes.map((type) => (

                <button
                  key={type}
                  onClick={() =>
                    setSelectedType(type)
                  }
                  className="rounded-2xl border border-[#eedcdf] bg-[#fffaf8] p-6 text-left transition hover:-translate-y-1 hover:border-[#d5a8b0] hover:shadow-md"
                >

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7e3e6] text-lg text-[#8a5366]">
                    ✦
                  </div>

                  <h4 className="font-semibold text-[#523141]">
                    {type}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#846d76]">
                    Browse {type.toLowerCase()} shared by CST
                    students.
                  </p>

                </button>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          ABOUT
      ========================== */}

      <section
        id="about"
        className="border-t border-[#f0dfe1] bg-[#fff7f5] px-6 py-20 md:px-10"
      >

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c17d87]">
            About Novelle
          </p>

          <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4b2938]">
            Share notes. Share knowledge.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#79636c]">
            Novelle is an academic resource sharing platform
            designed for students of the College of Science and
            Technology to discover, upload and share useful
            learning materials in one organized place.
          </p>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================== */}

      <footer className="bg-[#4b2938] px-6 py-10 text-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

          <div className="flex items-center gap-3">

            <img
              src="/logo.jpeg"
              alt="Novelle logo"
              className="h-11 w-11 rounded-lg object-cover"
            />

            <div>

              <p className="font-serif text-xl font-semibold">
                Novelle
              </p>

              <p className="text-xs tracking-widest text-[#e4bdc4]">
                SHARE NOTES. SHARE KNOWLEDGE.
              </p>

            </div>

          </div>

          <p className="text-sm text-[#dec5cb]">
            Academic Resource Sharing Platform
          </p>

        </div>

      </footer>

    </main>
  );
}
