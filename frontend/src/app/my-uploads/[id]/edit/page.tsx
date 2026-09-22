"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  fileName: string;
};

export default function EditResourcePage() {
  const params = useParams();

  const resourceId = Number(
    Array.isArray(params.id) ? params.id[0] : params.id
  );

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
  // DEMO UPLOADED RESOURCES
  // These match the resources currently shown in My Uploads.
  // Later this data will come from the backend/database.
  // =====================================================

  const resources: Resource[] = [
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
      fileName: "data-structures-tutorial.pdf",
    },
  ];

  const resource = resources.find(
    (item) => item.id === resourceId
  );

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    title: resource?.title ?? "",
    description: resource?.description ?? "",
    programme: resource?.programme ?? "",
    year: resource?.year ?? "",
    semester: resource?.semester ?? "",
    module: resource?.module ?? "",
    moduleCode: resource?.moduleCode ?? "",
    type: resource?.type ?? "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // YEAR OPTIONS
  // Architecture is the only programme with 5th Year.
  // =====================================================

  const years =
    formData.programme === "Architecture"
      ? [
          "1st Year",
          "2nd Year",
          "3rd Year",
          "4th Year",
          "5th Year",
        ]
      : [
          "1st Year",
          "2nd Year",
          "3rd Year",
          "4th Year",
        ];

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
    setError("");
  }

  // =====================================================
  // PROGRAMME CHANGE
  // Remove 5th Year if student changes away from Architecture.
  // =====================================================

  function handleProgrammeChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    const selectedProgramme = event.target.value;

    setFormData((current) => ({
      ...current,
      programme: selectedProgramme,
      year:
        selectedProgramme !== "Architecture" &&
        current.year === "5th Year"
          ? ""
          : current.year,
    }));

    setMessage("");
    setError("");
  }

  // =====================================================
  // SAVE CHANGES
  // =====================================================

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.title.trim() ||
      !formData.programme ||
      !formData.year ||
      !formData.semester ||
      !formData.module.trim() ||
      !formData.type
    ) {
      setError(
        "Please complete all required resource information."
      );

      return;
    }

    setMessage(
      "Resource changes saved for this frontend demo. Permanent updates will be connected when we build the backend."
    );
  }

  // =====================================================
  // RESOURCE NOT FOUND
  // =====================================================

  if (!resource) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f5f7] px-6 text-[#202529]">

        <div className="w-full max-w-[500px] rounded-xl border border-[#dfe3e6] bg-white px-8 py-12 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef5fa] text-[20px] font-bold text-[#0f6fc6]">
            ?
          </div>

          <h1 className="mt-5 text-[22px] font-bold text-[#252a30]">
            Upload Not Found
          </h1>

          <p className="mt-2 text-[13px] leading-5 text-[#747b81]">
            This resource is not included in your current demo uploads.
          </p>

          <Link
            href="/my-uploads"
            className="mt-6 inline-block rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
          >
            ← Back to My Uploads
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#202529]">

      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-[#dfe3e6] bg-white">

        <div className="mx-auto flex h-[68px] max-w-[1050px] items-center justify-between px-6">

          {/* LOGO */}

          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >
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
            href="/my-uploads"
            className="rounded-md border border-[#d4d8db] bg-white px-4 py-2 text-[13px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
          >
            ← My Uploads
          </Link>

        </div>

      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[900px] px-6 py-10">

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#8b9298]">

          <Link
            href="/dashboard"
            className="hover:text-[#0f6fc6]"
          >
            Dashboard
          </Link>

          <span>›</span>

          <Link
            href="/my-uploads"
            className="hover:text-[#0f6fc6]"
          >
            My Uploads
          </Link>

          <span>›</span>

          <span className="text-[#555c62]">
            Edit Resource
          </span>

        </div>

        {/* =================================================
            PAGE HEADING
        ================================================= */}

        <div className="mt-6">

          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0f6fc6]">
            Manage Resource
          </p>

          <h2 className="mt-2 text-[30px] font-bold text-[#202529]">
            Edit Resource
          </h2>

          <p className="mt-2 max-w-[650px] text-[14px] leading-6 text-[#697077]">
            Update the academic information associated with your uploaded
            resource.
          </p>

        </div>

        {/* =================================================
            CURRENT RESOURCE
        ================================================= */}

        <section className="mt-8 rounded-xl border border-[#dfe3e6] bg-white p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">

              <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8b9298]">
                Currently Editing
              </p>

              <h3 className="mt-1 truncate text-[15px] font-bold text-[#30363b]">
                {resource.title}
              </h3>

              <p className="mt-1 truncate text-[11px] text-[#747b81]">
                {resource.fileName}
              </p>

            </div>

            <Link
              href={`/resources/${resource.id}`}
              className="shrink-0 text-[12px] font-semibold text-[#0f6fc6] hover:underline"
            >
              View Resource →
            </Link>

          </div>

        </section>

        {/* =================================================
            EDIT FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >

          {/* =================================================
              ACADEMIC DETAILS
          ================================================= */}

          <section className="rounded-xl border border-[#dfe3e6] bg-white p-6">

            <div className="border-b border-[#edf0f2] pb-4">

              <h3 className="text-[17px] font-bold text-[#30363b]">
                Academic Details
              </h3>

              <p className="mt-1 text-[12px] text-[#747b81]">
                Update where this resource belongs academically.
              </p>

            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              {/* PROGRAMME */}

              <div className="sm:col-span-2">

                <label
                  htmlFor="programme"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Programme{" "}
                  <span className="text-[#a65757]">
                    *
                  </span>
                </label>

                <select
                  id="programme"
                  name="programme"
                  value={formData.programme}
                  onChange={handleProgrammeChange}
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
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

                <label
                  htmlFor="year"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Year{" "}
                  <span className="text-[#a65757]">
                    *
                  </span>
                </label>

                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  disabled={!formData.programme}
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none disabled:cursor-not-allowed disabled:bg-[#f3f4f5] disabled:text-[#9aa0a5] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                >
                  <option value="">
                    Select year
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

                {formData.programme === "Architecture" && (
                  <p className="mt-1.5 text-[10px] text-[#0f6fc6]">
                    Architecture includes 5th Year.
                  </p>
                )}

              </div>

              {/* SEMESTER */}

              <div>

                <label
                  htmlFor="semester"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Semester{" "}
                  <span className="text-[#a65757]">
                    *
                  </span>
                </label>

                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                >
                  <option value="">
                    Select semester
                  </option>

                  <option value="Semester 1">
                    Semester 1
                  </option>

                  <option value="Semester 2">
                    Semester 2
                  </option>
                </select>

              </div>

              {/* MODULE NAME */}

              <div>

                <label
                  htmlFor="module"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Module Name{" "}
                  <span className="text-[#a65757]">
                    *
                  </span>
                </label>

                <input
                  id="module"
                  name="module"
                  type="text"
                  value={formData.module}
                  onChange={handleChange}
                  placeholder="Example: Theory of Probability"
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none placeholder:text-[#969ca1] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                />

              </div>

              {/* MODULE CODE */}

              <div>

                <label
                  htmlFor="moduleCode"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Module Code
                  <span className="ml-1 font-normal text-[#8b9298]">
                    (optional)
                  </span>
                </label>

                <input
                  id="moduleCode"
                  name="moduleCode"
                  type="text"
                  value={formData.moduleCode}
                  onChange={handleChange}
                  placeholder="Example: MAT205"
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] uppercase outline-none placeholder:text-[#969ca1] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              RESOURCE INFORMATION
          ================================================= */}

          <section className="rounded-xl border border-[#dfe3e6] bg-white p-6">

            <div className="border-b border-[#edf0f2] pb-4">

              <h3 className="text-[17px] font-bold text-[#30363b]">
                Resource Information
              </h3>

              <p className="mt-1 text-[12px] text-[#747b81]">
                Update the title, type and description of your resource.
              </p>

            </div>

            <div className="mt-5 space-y-5">

              {/* RESOURCE TYPE */}

              <div>

                <label
                  htmlFor="type"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Resource Type{" "}
                  <span className="text-[#a65757]">
                    *
                  </span>
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                >
                  <option value="">
                    Select resource type
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

              {/* TITLE */}

              <div>

                <label
                  htmlFor="title"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Resource Title{" "}
                  <span className="text-[#a65757]">
                    *
                  </span>
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter a clear resource title"
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] outline-none placeholder:text-[#969ca1] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="description"
                  className="mb-2 block text-[12px] font-semibold text-[#343a40]"
                >
                  Description
                  <span className="ml-1 font-normal text-[#8b9298]">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Briefly describe what this resource contains..."
                  className="w-full resize-none rounded-md border border-[#cfd4d8] bg-white px-3 py-2.5 text-[13px] leading-5 outline-none placeholder:text-[#969ca1] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                />

              </div>

            </div>

          </section>

          {/* =================================================
              RESOURCE FILE
          ================================================= */}

          <section className="rounded-xl border border-[#dfe3e6] bg-white p-6">

            <div className="border-b border-[#edf0f2] pb-4">

              <h3 className="text-[17px] font-bold text-[#30363b]">
                Resource File
              </h3>

              <p className="mt-1 text-[12px] text-[#747b81]">
                The currently uploaded file is shown below.
              </p>

            </div>

            <div className="mt-5 flex flex-col gap-4 rounded-lg border border-[#dfe3e6] bg-[#f8f9fa] p-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#dfe3e6] bg-white text-[16px] text-[#0f6fc6]">
                  ▤
                </div>

                <div className="min-w-0">

                  <p className="truncate text-[12px] font-semibold text-[#343a40]">
                    {resource.fileName}
                  </p>

                  <p className="mt-1 text-[10px] text-[#8b9298]">
                    Current uploaded resource file
                  </p>

                </div>

              </div>

              <span className="shrink-0 rounded-full bg-[#eef3f6] px-3 py-1 text-[10px] font-medium text-[#697077]">
                Existing File
              </span>

            </div>

            <div className="mt-4 rounded-lg border border-[#d9e7f2] bg-[#f4f9fd] px-4 py-3">

              <p className="text-[11px] leading-5 text-[#5d6f7d]">
                File replacement will be connected when Novelle&apos;s
                backend and file storage are implemented. For now, you can
                edit the academic information and resource details.
              </p>

            </div>

          </section>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (

            <div className="rounded-lg border border-[#e5caca] bg-[#fff6f6] px-4 py-3">

              <p className="text-[12px] font-medium text-[#a65757]">
                {error}
              </p>

            </div>

          )}

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {message && (

            <div className="rounded-lg border border-[#cce2d2] bg-[#f4fbf6] px-4 py-3">

              <p className="text-[12px] font-medium leading-5 text-[#467553]">
                {message}
              </p>

            </div>

          )}

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/my-uploads"
              className="rounded-md border border-[#d4d8db] bg-white px-5 py-2.5 text-center text-[13px] font-medium text-[#555c62] hover:bg-[#f6f7f8]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
            >
              Save Changes
            </button>

          </div>

        </form>

        {/* =================================================
            FRONTEND NOTICE
        ================================================= */}

        <div className="mt-7 rounded-lg border border-[#d9e7f2] bg-[#f4f9fd] px-5 py-4">

          <p className="text-[12px] leading-5 text-[#5d6f7d]">

            <span className="font-semibold text-[#0f6fc6]">
              Frontend demo:
            </span>{" "}

            Changes made on this page currently exist only in the form.
            When Novelle&apos;s backend and database are connected, saving
            will permanently update the student&apos;s uploaded resource.

          </p>

        </div>

      </div>

    </main>
  );
}
