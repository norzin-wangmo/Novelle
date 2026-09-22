"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

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
  uploadedBy: string;
  uploadedDate: string;
  fileName: string;
  fileType: string;
  fileSize: string;
};

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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "introduction-to-programming.pdf",
    fileType: "PDF",
    fileSize: "2.4 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "database-management-systems.pdf",
    fileType: "PDF",
    fileSize: "3.1 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "engineering-mathematics-past-paper.pdf",
    fileType: "PDF",
    fileSize: "1.8 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "computer-networks-assignment.pdf",
    fileType: "PDF",
    fileSize: "1.2 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "data-structures-tutorial.pdf",
    fileType: "PDF",
    fileSize: "2.0 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "software-engineering-quiz.pdf",
    fileType: "PDF",
    fileSize: "850 KB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "electronics-laboratory-material.pdf",
    fileType: "PDF",
    fileSize: "4.6 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "exam-preparation-study-guide.pdf",
    fileType: "PDF",
    fileSize: "2.7 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "architecture-reference-material.pdf",
    fileType: "PDF",
    fileSize: "5.3 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "theory-of-probability-notes.pdf",
    fileType: "PDF",
    fileSize: "3.8 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "fluid-mechanics-tutorial.pdf",
    fileType: "PDF",
    fileSize: "2.2 MB",
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
    uploadedBy: "CST Student",
    uploadedDate: "September 2026",
    fileName: "mechanical-engineering-lab-guide.pdf",
    fileType: "PDF",
    fileSize: "3.5 MB",
  },
];

export default function ResourceDetailsPage() {
  const params = useParams();

  const resourceId = Number(params.id);

  const resource = resources.find(
    (item) => item.id === resourceId
  );

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!resource) {
    return (
      <main className="min-h-screen bg-[#f4f5f7] px-6 py-20 text-center">

        <div className="mx-auto max-w-[500px] rounded-lg border border-[#dfe3e6] bg-white p-10">

          <div className="text-[40px]">
            📄
          </div>

          <h1 className="mt-4 text-[24px] font-bold text-[#202529]">
            Resource not found
          </h1>

          <p className="mt-3 text-[14px] text-[#697077]">
            This resource does not exist or may have been removed.
          </p>

          <Link
            href="/resources"
            className="mt-6 inline-block rounded-md bg-[#0f6fc6] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#0b5fae]"
          >
            Back to Resources
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#202529]">

      {/* ================= NAVBAR ================= */}

      <header className="border-b border-[#dfe3e6] bg-white">

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

          <Link
            href="/resources"
            className="rounded-md border border-[#d4d9dd] bg-white px-4 py-2 text-[13px] font-medium text-[#555c62] hover:border-[#0f6fc6] hover:text-[#0f6fc6]"
          >
            ← Back to Resources
          </Link>

        </div>

      </header>

      {/* ================= CONTENT ================= */}

      <section className="mx-auto max-w-[1100px] px-5 py-9 md:px-8">

        {/* BREADCRUMB */}

        <div className="mb-5 flex flex-wrap items-center gap-2 text-[12px] text-[#777e84]">

          <Link
            href="/dashboard"
            className="hover:text-[#0f6fc6]"
          >
            Dashboard
          </Link>

          <span>›</span>

          <Link
            href="/resources"
            className="hover:text-[#0f6fc6]"
          >
            Resources
          </Link>

          <span>›</span>

          <span className="text-[#343a40]">
            {resource.title}
          </span>

        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* ================= LEFT ================= */}

          <div>

            {/* RESOURCE HEADER */}

            <div className="rounded-lg border border-[#dfe3e6] bg-white p-6 md:p-8">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <span className="rounded bg-[#e8f3fb] px-3 py-1.5 text-[11px] font-semibold text-[#0f6fc6]">
                  {resource.type}
                </span>

                <button
                  type="button"
                  onClick={() => setLiked(!liked)}
                  className={`rounded-md border px-3 py-2 text-[12px] font-medium ${
                    liked
                      ? "border-[#e6a3ad] bg-[#fff2f4] text-[#c73e52]"
                      : "border-[#d4d9dd] bg-white text-[#697077]"
                  }`}
                >
                  {liked ? "♥" : "♡"}{" "}
                  {resource.likes + (liked ? 1 : 0)}
                </button>

              </div>

              <h1 className="mt-5 text-[28px] font-bold leading-tight text-[#202529] md:text-[32px]">
                {resource.title}
              </h1>

              <p className="mt-4 text-[14px] leading-7 text-[#697077]">
                {resource.description}
              </p>

              {/* ACADEMIC INFO */}

              <div className="mt-7 grid gap-4 border-t border-[#e5e8ea] pt-6 sm:grid-cols-2">

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9197]">
                    Programme
                  </p>

                  <p className="mt-1 text-[14px] font-medium text-[#343a40]">
                    {resource.programme}
                  </p>

                </div>

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9197]">
                    Module
                  </p>

                  <p className="mt-1 text-[14px] font-medium text-[#343a40]">
                    {resource.module}
                  </p>

                  <p className="mt-0.5 text-[11px] text-[#8a9197]">
                    {resource.moduleCode}
                  </p>

                </div>

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9197]">
                    Year
                  </p>

                  <p className="mt-1 text-[14px] font-medium text-[#343a40]">
                    {resource.year}
                  </p>

                </div>

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a9197]">
                    Semester
                  </p>

                  <p className="mt-1 text-[14px] font-medium text-[#343a40]">
                    {resource.semester}
                  </p>

                </div>

              </div>

            </div>

            {/* ================= FILE PREVIEW ================= */}

            <div className="mt-6 rounded-lg border border-[#dfe3e6] bg-white">

              <div className="border-b border-[#e4e7e9] px-6 py-4">

                <h2 className="text-[16px] font-bold text-[#30363b]">
                  Resource Preview
                </h2>

              </div>

              <div className="flex min-h-[360px] items-center justify-center bg-[#f8f9fa] p-8">

                <div className="text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border border-[#dfe3e6] bg-white text-[28px]">
                    📄
                  </div>

                  <p className="mt-4 text-[14px] font-semibold text-[#343a40]">
                    {resource.fileName}
                  </p>

                  <p className="mt-1 text-[12px] text-[#81888e]">
                    {resource.fileType} • {resource.fileSize}
                  </p>

                  <p className="mx-auto mt-4 max-w-[390px] text-[12px] leading-5 text-[#8a9197]">
                    File preview will appear here after the backend and
                    file storage are connected.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}

          <aside>

            {/* DOWNLOAD CARD */}

            <div className="rounded-lg border border-[#dfe3e6] bg-white p-5">

              <h2 className="text-[15px] font-bold text-[#30363b]">
                Resource File
              </h2>

              <div className="mt-4 rounded-md bg-[#f5f6f7] p-4">

                <p className="break-all text-[12px] font-medium text-[#343a40]">
                  {resource.fileName}
                </p>

                <p className="mt-2 text-[11px] text-[#7b8288]">
                  {resource.fileType} • {resource.fileSize}
                </p>

              </div>

              <button
                type="button"
                className="mt-4 w-full rounded-md bg-[#0f6fc6] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[#0b5fae]"
              >
                ↓ Download Resource
              </button>

              <button
                type="button"
                onClick={() => setSaved(!saved)}
                className={`mt-2 w-full rounded-md border px-4 py-2.5 text-[13px] font-medium ${
                  saved
                    ? "border-[#0f6fc6] bg-[#f1f8fd] text-[#0f6fc6]"
                    : "border-[#cfd4d8] bg-white text-[#555c62]"
                }`}
              >
                {saved ? "♥ Saved" : "♡ Save Resource"}
              </button>

            </div>

            {/* DETAILS */}

            <div className="mt-5 rounded-lg border border-[#dfe3e6] bg-white p-5">

              <h2 className="text-[15px] font-bold text-[#30363b]">
                Resource Details
              </h2>

              <div className="mt-5 space-y-4">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#90969b]">
                    Uploaded by
                  </p>

                  <p className="mt-1 text-[13px] text-[#444b50]">
                    {resource.uploadedBy}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#90969b]">
                    Uploaded
                  </p>

                  <p className="mt-1 text-[13px] text-[#444b50]">
                    {resource.uploadedDate}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#90969b]">
                    Resource Type
                  </p>

                  <p className="mt-1 text-[13px] text-[#444b50]">
                    {resource.type}
                  </p>

                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#90969b]">
                    Likes
                  </p>

                  <p className="mt-1 text-[13px] text-[#444b50]">
                    {resource.likes + (liked ? 1 : 0)}
                  </p>

                </div>

              </div>

            </div>

            {/* REPORT */}

            <div className="mt-5 rounded-lg border border-[#dfe3e6] bg-white p-5">

              <p className="text-[12px] leading-5 text-[#777e84]">
                Is there a problem with this resource?
              </p>

              <button
                type="button"
                className="mt-2 text-[12px] font-medium text-[#b13a3a] hover:underline"
              >
                Report Resource
              </button>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}
