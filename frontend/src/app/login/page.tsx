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

    const studentEmailPattern =
      /^[0-9]+\.cst@rub\.edu\.bt$/i;

    if (!studentEmailPattern.test(email.trim())) {
      setError(
        "Please use your official CST student email, for example 02250359.cst@rub.edu.bt."
      );
      return;
    }

    setSuccess(
      "Login details accepted for the UI demo. Authentication will be connected later."
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#202529]">

      {/* ================= NAVBAR ================= */}

      <header className="border-b border-[#dfe3e6] bg-white">
        <div className="flex h-[72px] items-center justify-between px-5 md:px-7">

          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Novelle"
              className="h-12 w-12 rounded-full object-cover"
            />

            <span className="text-[18px] font-semibold text-[#202529]">
              Novelle
            </span>
          </Link>

          <Link
            href="/"
            className="text-[15px] text-[#0f6fc6] hover:underline"
          >
            Back to Home
          </Link>

        </div>
      </header>

      {/* ================= LOGIN ================= */}

      <section className="mx-auto max-w-[1100px] px-6 py-14">

        <div className="mx-auto max-w-[470px]">

          {/* TITLE */}

          <div className="mb-8">

            <h1 className="text-[32px] font-bold leading-tight text-[#202529]">
              Login to Novelle
            </h1>

            <p className="mt-3 text-[15px] leading-6 text-[#60676d]">
              Access academic resources shared by the CST student
              community.
            </p>

          </div>

          {/* LOGIN CARD */}

          <div className="rounded-xl border border-[#dfe3e6] bg-white p-7">

            {/* STUDENT NOTICE */}

            <div className="mb-7 rounded-lg bg-[#f5f8fa] p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#e4f2fc] text-sm font-bold text-[#0f6fc6]">
                  ✓
                </div>

                <div>

                  <p className="text-[15px] font-semibold text-[#202529]">
                    CST Student Access
                  </p>

                  <p className="mt-1 text-[13px] leading-5 text-[#697077]">
                    Login using your registered CST college email.
                  </p>

                </div>

              </div>

            </div>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}

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
                  placeholder="02250359.cst@rub.edu.bt"
                  className="w-full rounded-md border border-[#cfd4d8] bg-white px-3 py-3 text-[15px] text-[#343a40] outline-none placeholder:text-[#8b9298] focus:border-[#0f6fc6] focus:ring-1 focus:ring-[#0f6fc6]"
                />

              </div>

              {/* PASSWORD */}

              <div className="mt-6">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-[14px] font-semibold text-[#343a40]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[13px] text-[#0f6fc6] hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
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

              </div>

              {/* REMEMBER ME */}

              <label className="mt-5 flex cursor-pointer items-center gap-2">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#0f6fc6]"
                />

                <span className="text-[14px] text-[#555d63]">
                  Remember me
                </span>

              </label>

              {/* ERROR */}

              {error && (
                <div className="mt-5 rounded-md border border-[#e5a5a5] bg-[#fff4f4] px-4 py-3 text-[14px] text-[#a52828]">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="mt-5 rounded-md border border-[#a7d8b3] bg-[#f1faf3] px-4 py-3 text-[14px] text-[#287a3d]">
                  {success}
                </div>
              )}

              {/* LOGIN */}

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-[#0f6fc6] px-5 py-3 text-[15px] font-medium text-white hover:bg-[#0b5fae]"
              >
                Login
              </button>

              {/* DIVIDER */}

              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#dfe3e6]" />

                <span className="text-[12px] text-[#777e84]">
                  New to Novelle?
                </span>

                <div className="h-px flex-1 bg-[#dfe3e6]" />

              </div>

              {/* SIGNUP */}

              <Link
                href="/signup"
                className="block w-full rounded-md border border-[#0f6fc6] px-5 py-3 text-center text-[15px] font-medium text-[#0f6fc6] hover:bg-[#f4f9fd]"
              >
                Create Student Account
              </Link>

            </form>

          </div>

          <p className="mt-6 text-center text-[13px] text-[#747b81]">
            College of Science and Technology Academic Resource
            Sharing Platform
          </p>

        </div>

      </section>

    </main>
  );
}
