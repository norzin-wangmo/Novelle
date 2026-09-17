"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please enter your CST email and password.");
      return;
    }

    // Frontend-only CST student email check
    const studentEmailPattern =
      /^[0-9]+\.cst@rub\.edu\.bt$/i;

    if (!studentEmailPattern.test(email.trim())) {
      setError(
        "Please use your official CST student email, for example 02250359.cst@rub.edu.bt."
      );
      return;
    }

    /*
      FRONTEND ONLY FOR NOW

      Later the backend will:
      - Check whether the account exists
      - Check the password
      - Check whether the CST email is verified
      - Create a login session
    */

    setSuccess(
      "Login details accepted for the UI demo. Authentication will be connected later."
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

      {/* ================= LOGIN SECTION ================= */}

      <section className="flex min-h-[calc(100vh-87px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* HEADING */}

          <div className="mb-8 text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#c17d87]">
              Welcome Back
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#4b2938] md:text-5xl">
              Login to Novelle
            </h2>

            <p className="mt-4 leading-7 text-[#806a72]">
              Access your academic resources and continue
              sharing knowledge with the CST community.
            </p>

          </div>

          {/* ================= LOGIN CARD ================= */}

          <div className="rounded-[2rem] border border-[#eedcdf] bg-white p-7 shadow-[0_20px_60px_rgba(91,48,66,0.08)] md:p-9">

            {/* STUDENT ACCESS MESSAGE */}

            <div className="mb-7 rounded-2xl border border-[#efd7dc] bg-[#fff4f5] p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5dfe3] font-bold text-[#9d5d6c]">
                  ✓
                </div>

                <div>
                  <p className="font-semibold text-[#593646]">
                    CST Student Access
                  </p>

                  <p className="mt-1 text-sm leading-5 text-[#806a72]">
                    Login using your registered CST college
                    email.
                  </p>
                </div>

              </div>

            </div>

            <form onSubmit={handleSubmit}>

              {/* ================= EMAIL ================= */}

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
                  placeholder="02250359.cst@rub.edu.bt"
                  className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 text-[#5d4750] outline-none transition placeholder:text-[#aa999f] focus:border-[#b87380]"
                />

              </div>

              {/* ================= PASSWORD ================= */}

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#5b3545]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#a66574] transition hover:text-[#714052]"
                  >
                    Forgot Password?
                  </Link>

                </div>

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
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#dec7cc] bg-[#fffafa] px-4 py-3.5 pr-20 text-[#5d4750] outline-none transition placeholder:text-[#aa999f] focus:border-[#b87380]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#9c5e6c] transition hover:text-[#693d4e]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* ================= REMEMBER ME ================= */}

              <label className="mt-5 flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#5a3042]"
                />

                <span className="text-sm text-[#806a72]">
                  Remember me
                </span>

              </label>

              {/* ================= ERROR ================= */}

              {error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                  {error}
                </div>
              )}

              {/* ================= SUCCESS ================= */}

              {success && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                  {success}
                </div>
              )}

              {/* ================= LOGIN BUTTON ================= */}

              <button
                type="submit"
                className="mt-7 w-full rounded-xl bg-[#5a3042] px-6 py-4 font-semibold text-white transition hover:bg-[#704056]"
              >
                Login
              </button>

              {/* DIVIDER */}

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#ead8da]" />

                <span className="text-xs uppercase tracking-wider text-[#aa9199]">
                  New to Novelle?
                </span>

                <div className="h-px flex-1 bg-[#ead8da]" />

              </div>

              {/* CREATE ACCOUNT */}

              <Link
                href="/signup"
                className="block w-full rounded-xl border border-[#6b3b4e] px-6 py-3.5 text-center font-semibold text-[#603548] transition hover:bg-[#fff4f5]"
              >
                Create Student Account
              </Link>

            </form>

          </div>

          {/* SECURITY NOTE */}

          <p className="mt-6 text-center text-xs leading-5 text-[#9b858c]">
            Novelle is designed for the College of Science and
            Technology academic community.
          </p>

        </div>

      </section>

    </main>
  );
}
