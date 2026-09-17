"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");

  const [programme, setProgramme] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agree, setAgree] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const years =
    programme === "Architecture"
      ? architectureYears
      : normalYears;

  // ================= PASSWORD RULES =================

  const hasMinimumLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const hasSpecialCharacter =
    /[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/']/g.test(password);

  const passwordIsValid =
    hasMinimumLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialCharacter;

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  // ================= PROGRAMME CHANGE =================

  function handleProgrammeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setProgramme(event.target.value);

    // Reset year when programme changes
    setYear("");
  }

  // ================= STUDENT ID =================

  function handleStudentIdChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    // Student ID contains numbers only
    const value = event.target.value.replace(/\D/g, "");

    setStudentId(value);
  }

  // ================= FORM SUBMISSION =================

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !fullName ||
      !studentId ||
      !email ||
      !programme ||
      !year ||
      !semester ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    // Student email must match Student ID
    const expectedEmail =
      `${studentId}.cst@rub.edu.bt`.toLowerCase();

    if (email.trim().toLowerCase() !== expectedEmail) {
      setError(
        `Your CST college email must match your Student ID. Expected: ${expectedEmail}`
      );
      return;
    }

    if (!passwordIsValid) {
      setError(
        "Your password does not meet all the security requirements."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    if (!agree) {
      setError(
        "Please agree to the Terms and Privacy Policy."
      );
      return;
    }

    /*
      FRONTEND UI ONLY FOR NOW

      Later the backend will:
      1. Create the account.
      2. Send verification to CST email.
      3. Verify email ownership.
      4. Activate the account.
    */

    setSuccess(
      "Your details are valid. Your CST email is ready for verification."
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#202529]">

      {/* ================= NAVBAR ================= */}

      <header className="border-b border-[#dfe3e6] bg-white">

        <div className="flex h-[72px] items-center justify-between px-5 md:px-7">

          {/* NOVELLE */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <img
              src="/logo.jpeg"
              alt="Novelle"
              className="h-12 w-12 rounded-full object-cover"
            />

            <span className="text-[18px] font-semibold text-[#202529]">
              Novelle
            </span>

          </Link>

          {/* BACK HOME */}

          <Link
            href="/"
            className="text-[15px] text-[#0f6fc6] hover:underline"
          >
            Back to Home
          </Link>

        </div>

      </header>

      {/* ================= SIGN UP PAGE ================= */}

      <section className="mx-auto max-w-[1100px] px-6 py-14">

        <div className="mx-auto max-w-[720px]">

          {/* ================= TITLE ================= */}

          <div className="mb-8">

            <h1 className="text-[32px] font-bold leading-tight text-[#202529]">
              Create your Novelle account
            </h1>

            <p className="mt-3 max-w-[620px] text-[15px] leading-6 text-[#60676d]">
              Register using your official CST student credentials
              to access and share academic resources.
            </p>

          </div>

          {/* ================= FORM CARD ================= */}

          <div className="rounded-xl border border-[#dfe3e6] bg-white p-7">

            {/* ================= STUDENT NOTICE ================= */}

            <div className="mb-7 rounded-lg bg-[#f5f8fa] p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#e4f2fc] text-sm font-bold text-[#0f6fc6]">
                  ✓
                </div>

                <div>

                  <p className="text-[15px] font-semibold text-[#202529]">
                    CST Students Only
                  </p>

                  <p className="mt-1 text-[13px] leading-5 text-[#697077]">
                    Registration requires your official CST
                    student email. Your Student ID must match
                    the email address used to create your account.
                  </p>

                </div>

              </div>

            </div>

            {/* ================= FORM ================= */}

            <form onSubmit={handleSubmit}>

              <div className="grid gap-6 md:grid-cols-2">

                {/* ================= FULL NAME ================= */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[15px] text-[#343a40] outline-none placeholder:text-[#8b9298] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                  />

                </div>

                {/* ================= STUDENT ID ================= */}

                <div>

                  <label
                    htmlFor="studentId"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    Student ID
                  </label>

                  <input
                    id="studentId"
                    type="text"
                    inputMode="numeric"
                    value={studentId}
                    onChange={handleStudentIdChange}
                    placeholder="e.g. 02250359"
                    className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[15px] text-[#343a40] outline-none placeholder:text-[#8b9298] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                  />

                </div>

                {/* ================= EMAIL ================= */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    CST College Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder={
                      studentId
                        ? `${studentId}.cst@rub.edu.bt`
                        : "studentid.cst@rub.edu.bt"
                    }
                    className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[15px] text-[#343a40] outline-none placeholder:text-[#8b9298] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                  />

                  <p className="mt-2 text-[12px] text-[#777e84]">
                    Example: 02250359.cst@rub.edu.bt
                  </p>

                </div>

                {/* ================= PROGRAMME ================= */}

                <div>

                  <label
                    htmlFor="programme"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    Programme
                  </label>

                  <select
                    id="programme"
                    value={programme}
                    onChange={handleProgrammeChange}
                    className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[15px] text-[#343a40] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                  >

                    <option value="">
                      Select programme
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

                {/* ================= YEAR ================= */}

                <div>

                  <label
                    htmlFor="year"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    Year
                  </label>

                  <select
                    id="year"
                    value={year}
                    disabled={!programme}
                    onChange={(event) =>
                      setYear(event.target.value)
                    }
                    className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[15px] text-[#343a40] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6] disabled:cursor-not-allowed disabled:bg-[#f3f4f5] disabled:text-[#92989d]"
                  >

                    <option value="">
                      {programme
                        ? "Select year"
                        : "Select programme first"}
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

                  {programme === "Architecture" && (
                    <p className="mt-2 text-[12px] text-[#0f6fc6]">
                      Architecture includes 5th Year.
                    </p>
                  )}

                </div>

                {/* ================= SEMESTER ================= */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="semester"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    Semester
                  </label>

                  <select
                    id="semester"
                    value={semester}
                    onChange={(event) =>
                      setSemester(event.target.value)
                    }
                    className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[15px] text-[#343a40] outline-none focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
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

                {/* ================= PASSWORD ================= */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Create a strong password"
                      className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 pr-16 text-[15px] text-[#343a40] outline-none placeholder:text-[#8b9298] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#0f6fc6] hover:underline"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                  {/* PASSWORD REQUIREMENTS */}

                  {password.length > 0 && (

                    <div className="mt-4 rounded-lg border border-[#e0e4e7] bg-[#f8f9fa] p-4">

                      <p className="mb-3 text-[13px] font-semibold text-[#343a40]">
                        Password requirements
                      </p>

                      <div className="space-y-2">

                        <PasswordRule
                          valid={hasMinimumLength}
                          text="At least 8 characters"
                        />

                        <PasswordRule
                          valid={hasUppercase}
                          text="One uppercase letter (A-Z)"
                        />

                        <PasswordRule
                          valid={hasLowercase}
                          text="One lowercase letter (a-z)"
                        />

                        <PasswordRule
                          valid={hasNumber}
                          text="One number (0-9)"
                        />

                        <PasswordRule
                          valid={hasSpecialCharacter}
                          text="One special character (! @ # $ % etc.)"
                        />

                      </div>

                    </div>

                  )}

                </div>

                {/* ================= CONFIRM PASSWORD ================= */}

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-[14px] font-semibold text-[#343a40]"
                  >
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      placeholder="Re-enter your password"
                      className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 pr-16 text-[15px] text-[#343a40] outline-none placeholder:text-[#8b9298] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#0f6fc6] hover:underline"
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                  {confirmPassword.length > 0 && (

                    <p
                      className={`mt-3 text-[13px] font-medium ${
                        passwordsMatch
                          ? "text-[#287a3d]"
                          : "text-[#a52828]"
                      }`}
                    >
                      {passwordsMatch
                        ? "✓ Passwords match"
                        : "✕ Passwords do not match"}
                    </p>

                  )}

                </div>

              </div>

              {/* ================= EXPECTED EMAIL ================= */}

              {studentId && (

                <div className="mt-6 rounded-lg border border-[#dce6ed] bg-[#f5f8fa] px-4 py-3">

                  <p className="text-[12px] text-[#697077]">
                    Expected CST college email
                  </p>

                  <p className="mt-1 break-all text-[14px] font-semibold text-[#0f6fc6]">
                    {studentId}.cst@rub.edu.bt
                  </p>

                </div>

              )}

              {/* ================= TERMS ================= */}

              <label className="mt-6 flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) =>
                    setAgree(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-[#0f6fc6]"
                />

                <span className="text-[14px] leading-6 text-[#555d63]">
                  I confirm that the information provided belongs
                  to me and I agree to the Novelle Terms and
                  Privacy Policy.
                </span>

              </label>

              {/* ================= ERROR ================= */}

              {error && (

                <div className="mt-5 rounded-md border border-[#e5a5a5] bg-[#fff4f4] px-4 py-3 text-[14px] text-[#a52828]">
                  {error}
                </div>

              )}

              {/* ================= SUCCESS ================= */}

              {success && (

                <div className="mt-5 rounded-md border border-[#a7d8b3] bg-[#f1faf3] px-4 py-3 text-[14px] text-[#287a3d]">
                  {success}
                </div>

              )}

              {/* ================= CREATE ACCOUNT ================= */}

              <button
                type="submit"
                className="mt-7 w-full rounded-md bg-[#0f6fc6] px-5 py-3 text-[15px] font-medium text-white hover:bg-[#0b5fae]"
              >
                Create Student Account
              </button>

              {/* ================= LOGIN ================= */}

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#dfe3e6]" />

                <span className="text-[12px] text-[#777e84]">
                  Already registered?
                </span>

                <div className="h-px flex-1 bg-[#dfe3e6]" />

              </div>

              <Link
                href="/login"
                className="block w-full rounded-md border border-[#0f6fc6] px-5 py-3 text-center text-[15px] font-medium text-[#0f6fc6] hover:bg-[#f4f9fd]"
              >
                Login to Novelle
              </Link>

            </form>

          </div>

          {/* FOOTNOTE */}

          <p className="mt-6 text-center text-[13px] text-[#747b81]">
            College of Science and Technology Academic Resource
            Sharing Platform
          </p>

        </div>

      </section>

    </main>
  );
}

/* ================= PASSWORD RULE ================= */

function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[13px] ${
        valid
          ? "text-[#287a3d]"
          : "text-[#737a80]"
      }`}
    >

      <span className="w-4 font-semibold">
        {valid ? "✓" : "○"}
      </span>

      <span>
        {text}
      </span>

    </div>
  );
}
