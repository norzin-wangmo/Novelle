"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function SignUp() {
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

  // ================= PASSWORD CHECKS =================

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

  // ================= PROGRAMME =================

  function handleProgrammeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setProgramme(event.target.value);
    setYear("");
  }

  // ================= STUDENT ID =================

  function handleStudentIdChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value.replace(/\D/g, "");
    setStudentId(value);
  }

  // ================= SUBMIT =================

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
      NEXT BACKEND STEP:

      1. Create the account securely.
      2. Send verification email/OTP to CST email.
      3. Student verifies ownership.
      4. Account becomes verified.
      5. Student can log in.
    */

    setSuccess(
      "Your details are valid. Your CST email is ready for verification."
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf8]">

      {/* ================= HEADER ================= */}

      <header className="border-b border-[#ead8da] bg-[#fffaf8]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">

          <Link
            href="/"
            className="flex items-center gap-3"
          >
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
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-[#70495a] transition hover:text-[#bd7782]"
          >
            ← Back to Home
          </Link>

        </div>
      </header>

      {/* ================= SIGN UP ================= */}

      <section className="px-6 py-12 md:py-16">

        <div className="mx-auto max-w-3xl">

          <div className="mb-9 text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c17d87]">
              Student Registration
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4b2938] md:text-5xl">
              Create your Novelle account
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#806a72]">
              Register using your official CST student
              credentials to access and share academic resources.
            </p>

          </div>

          {/* ================= CARD ================= */}

          <div className="rounded-[2rem] border border-[#eedcdf] bg-white p-7 shadow-[0_20px_60px_rgba(91,48,66,0.08)] md:p-10">

            {/* CST NOTICE */}

            <div className="mb-8 rounded-2xl border border-[#efd7dc] bg-[#fff4f5] p-5">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5dfe3] font-bold text-[#9d5d6c]">
                  ✓
                </div>

                <div>

                  <h3 className="font-semibold text-[#593646]">
                    CST students only
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#806a72]">
                    Your Student ID must match your official CST
                    college email. Your email will be verified
                    before your account receives student access.
                  </p>

                </div>

              </div>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="grid gap-6 md:grid-cols-2">

                {/* FULL NAME */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
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
                    className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 text-[#5d4750] outline-none transition placeholder:text-[#aa999f] focus:border-[#b87380]"
                  />

                </div>

                {/* STUDENT ID */}

                <div>

                  <label
                    htmlFor="studentId"
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
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
                    className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 text-[#5d4750] outline-none transition placeholder:text-[#aa999f] focus:border-[#b87380]"
                  />

                </div>

                {/* CST EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
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
                    className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 text-[#5d4750] outline-none transition placeholder:text-[#aa999f] focus:border-[#b87380]"
                  />

                  <p className="mt-2 text-xs text-[#9a8089]">
                    Example: 02250359.cst@rub.edu.bt
                  </p>

                </div>

                {/* PROGRAMME */}

                <div>

                  <label
                    htmlFor="programme"
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
                  >
                    Programme
                  </label>

                  <select
                    id="programme"
                    value={programme}
                    onChange={handleProgrammeChange}
                    className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 text-[#5d4750] outline-none transition focus:border-[#b87380]"
                  >

                    <option value="">
                      Select programme
                    </option>

                    {programmes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

                {/* YEAR */}

                <div>

                  <label
                    htmlFor="year"
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
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
                    className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 text-[#5d4750] outline-none transition focus:border-[#b87380] disabled:cursor-not-allowed disabled:bg-[#f5eeee] disabled:text-[#aa999f]"
                  >

                    <option value="">
                      {programme
                        ? "Select year"
                        : "Select programme first"}
                    </option>

                    {years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}

                  </select>

                  {programme === "Architecture" && (
                    <p className="mt-2 text-xs text-[#b87380]">
                      Architecture includes 5th Year.
                    </p>
                  )}

                </div>

                {/* SEMESTER */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="semester"
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
                  >
                    Semester
                  </label>

                  <select
                    id="semester"
                    value={semester}
                    onChange={(event) =>
                      setSemester(event.target.value)
                    }
                    className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 text-[#5d4750] outline-none transition focus:border-[#b87380]"
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
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
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
                      className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 pr-20 text-[#5d4750] outline-none transition placeholder:text-[#aa999f] focus:border-[#b87380]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#9c5e6c]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                  {/* PASSWORD REQUIREMENTS */}

                  {password.length > 0 && (
                    <div className="mt-4 rounded-xl bg-[#fff6f7] p-4">

                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#75515f]">
                        Password must contain
                      </p>

                      <div className="space-y-2 text-sm">

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
                    className="mb-2 block text-sm font-semibold text-[#5b3545]"
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
                      className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 pr-20 text-[#5d4750] outline-none transition placeholder:text-[#aa999f] focus:border-[#b87380]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#9c5e6c]"
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                  {confirmPassword.length > 0 && (
                    <p
                      className={`mt-3 text-sm font-medium ${
                        passwordsMatch
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {passwordsMatch
                        ? "✓ Passwords match"
                        : "✕ Passwords do not match"}
                    </p>
                  )}

                </div>

              </div>

              {/* EXPECTED CST EMAIL */}

              {studentId && (
                <div className="mt-6 rounded-xl bg-[#faf2f3] px-4 py-3">

                  <p className="text-xs font-medium text-[#9c6975]">
                    Expected college email
                  </p>

                  <p className="mt-1 break-all text-sm font-semibold text-[#62404f]">
                    {studentId}.cst@rub.edu.bt
                  </p>

                </div>
              )}

              {/* TERMS */}

              <label className="mt-6 flex cursor-pointer items-start gap-3">

                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(event) =>
                    setAgree(event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-[#5a3042]"
                />

                <span className="text-sm leading-6 text-[#806a72]">
                  I confirm that the information provided belongs
                  to me and I agree to the Novelle Terms and
                  Privacy Policy.
                </span>

              </label>

              {/* ERROR */}

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-[#5a3042] px-6 py-4 font-semibold text-white transition hover:bg-[#704056]"
              >
                Create Student Account
              </button>

              <p className="mt-6 text-center text-sm text-[#806a72]">
                Already have an account?{" "}

                <Link
                  href="/login"
                  className="font-semibold text-[#9c5e6c] hover:text-[#6d4052]"
                >
                  Login
                </Link>
              </p>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

/* ================= PASSWORD RULE COMPONENT ================= */

function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        valid
          ? "text-green-600"
          : "text-[#9a7e87]"
      }`}
    >
      <span className="w-4 font-bold">
        {valid ? "✓" : "○"}
      </span>

      <span>{text}</span>
    </div>
  );
}
