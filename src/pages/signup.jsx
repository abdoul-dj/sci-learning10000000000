import React, { useState, useMemo } from "react";
import {
  Eye,
  EyeOff,
  Atom,
  Facebook,
} from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (form.password.length >= 8) score++;
    if (/[A-Z]/.test(form.password)) score++;
    if (/[a-z]/.test(form.password)) score++;
    if (/[0-9]/.test(form.password)) score++;
    if (/[^A-Za-z0-9]/.test(form.password))
      score++;

    return score;
  }, [form.password]);

  const strengthText = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ];

  const validate = () => {
    const newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

    if (!isLogin) {
      if (!form.fullName.trim()) {
        newErrors.fullName =
          "Full name is required";
      } else if (
        form.fullName.trim().length < 3
      ) {
        newErrors.fullName =
          "Minimum 3 characters";
      }
    }

    if (!form.email.trim()) {
      newErrors.email = "Email required";
    } else if (
      !emailRegex.test(form.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!form.password) {
      newErrors.password =
        "Password required";
    } else if (
      !strongPassword.test(form.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number and special character";
    }

    if (!isLogin) {
      if (
        form.password !==
        form.confirmPassword
      ) {
        newErrors.confirmPassword =
          "Passwords do not match";
      }

      if (!form.terms) {
        newErrors.terms =
          "Accept Terms & Conditions";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (isLogin) {
      console.log("LOGIN", form);
      alert("Login Successful");
    } else {
      console.log("SIGNUP", form);
      alert("Account Created");
    }
  };

  const handleChange = (e) => {
    const { name, value, checked, type } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 lg:p-6">
      <div className="mx-auto flex min-h-[95vh] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-xl">

        {/* LEFT SIDE */}

        <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-b from-white to-violet-100 p-10 lg:flex">

          <div className="flex items-center gap-2">
          <img
            src="bnbn.png"
            alt="logo"
            lazy="loading"
            className="w-20  h-20 object-cover"
          />
            <h1 className="text-3xl font-bold">
              ScienceLearn
            </h1>
          </div>

          <div>
            <h2 className="text-6xl font-bold leading-tight">
              Learn Science.
              <br />
              Understand{" "}
              <span className="text-[#C4419F]">
                Better.
              </span>
              <br />
              Build Your Future.
            </h2>

            <p className="mt-6 max-w-lg text-xl text-gray-600">
              Interactive lessons, smart quizzes
              and recognized certificates to
              help students achieve their goals.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900"
            alt="student"
            loading="lazy"
            className="mx-auto h-[500px] object-cover rounded-3xl"
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">

          <div className="w-full max-w-xl">

            <h1 className="text-5xl font-bold">
              {isLogin
                ? "Sign In"
                : "Sign Up"}
            </h1>

            <p className="mt-2 text-lg text-gray-500">
              {isLogin
                ? "Welcome back"
                : "Create your account to start learning"}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {!isLogin && (
                <div>
                  <label className="mb-2 block font-medium">
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl  p-4 outline-none focus:border-[#C4419F]"
                  />

                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="mb-2 block font-medium">
                  Email
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl p-4 outline-none focus:border-[#C4419F]"
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Password
                </label>

                <div className="relative">
                  <input
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="w-full rounded-xl  p-4 pr-14 outline-none focus:border-[#C4419F]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-4"
                  >
                    {showPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>

                {!isLogin && (
                  <>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-[#C4419F] transition-all duration-300"
                        style={{
                          width: `${
                            passwordStrength * 20
                          }%`,
                        }}
                      />
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                      {
                        strengthText[
                          passwordStrength
                        ]
                      }
                    </p>
                  </>
                )}

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="mb-2 block font-medium">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={
                        form.confirmPassword
                      }
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full rounded-xl  p-4 pr-14 outline-none focus:border-[#C4419F]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-4 top-4"
                    >
                      {showConfirmPassword ? (
                        <EyeOff />
                      ) : (
                        <Eye />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {
                        errors.confirmPassword
                      }
                    </p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={form.terms}
                      onChange={handleChange}
                    />

                    <span>
                      I agree to Terms of
                      Service and Privacy
                      Policy
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="text-sm text-red-500">
                      {errors.terms}
                    </p>
                  )}
                </div>
              )}

              <button
                className="w-full rounded-xl bg-[#C4419F] cursor-pointer  py-4 text-lg font-semibold text-white transition hover:scale-[1.01]"
              >
                {isLogin
                  ? "Sign In"
                  : "Create Account"}
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-gray-500">
                  continue to site
                </span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              

              <p className="pt-4 text-center text-lg">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  type="button"
                  onClick={() =>
                    setIsLogin(!isLogin)
                  }
                  className="ml-2 font-semibold cursor-pointer text-[#C4419F]"
                >
                  {isLogin
                    ? "Sign Up"
                    : "Sign In"}
                </button>
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}