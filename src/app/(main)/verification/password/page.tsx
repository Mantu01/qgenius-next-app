"use client";

import { KeyRound, ShieldAlert, Check, X, LockKeyhole, EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import InputField from "@/components/auth/InputField";

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export default function PasswordResetPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
    setValidatingToken(false);
  }, []);

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      setLoading(true);
      await axios.post("/api/auth/resetpassword", { token, password: data.password });
      setSuccess(true);
      setLoading(false);
    } catch (error: any) {
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Password reset failed",
      });
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const passwordFields = [
    {
      id: "password",
      register: register("password", {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        validate: {
          hasUppercase: (value) => /[A-Z]/.test(value) || "Must contain uppercase letter",
          hasLowercase: (value) => /[a-z]/.test(value) || "Must contain lowercase letter",
          hasNumber: (value) => /[0-9]/.test(value) || "Must contain number",
          hasSpecial: (value) => /[^A-Za-z0-9]/.test(value) || "Must contain special character",
        },
      }),
      type: showPassword ? "text" : "password",
      label: "New Password",
      icon: <LockKeyhole className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: "Enter your new password",
      required: true,
      togglePassword: togglePasswordVisibility,
      toggleIcon: showPassword ? (
        <EyeOff className="h-5 w-5 text-gray-400" />
      ) : (
        <Eye className="h-5 w-5 text-gray-400" />
      ),
    },
    {
      id: "confirmPassword",
      register: register("confirmPassword", {
        required: "Please confirm your password",
        validate: (value) => value === password || "Passwords do not match",
      }),
      type: showConfirmPassword ? "text" : "password",
      label: "Confirm Password",
      icon: <LockKeyhole className="h-5 w-5 text-gray-400 dark:text-gray-500" />,
      placeholder: "Confirm your new password",
      required: true,
      togglePassword: toggleConfirmPasswordVisibility,
      toggleIcon: showConfirmPassword ? (
        <EyeOff className="h-5 w-5 text-gray-400" />
      ) : (
        <Eye className="h-5 w-5 text-gray-400" />
      ),
    },
  ];

  const passwordRequirements = [
    {
      label: "At least 8 characters",
      valid: password?.length >= 8,
    },
    {
      label: "At least one uppercase letter",
      valid: /[A-Z]/.test(password || ""),
    },
    {
      label: "At least one lowercase letter",
      valid: /[a-z]/.test(password || ""),
    },
    {
      label: "At least one number",
      valid: /[0-9]/.test(password || ""),
    },
    {
      label: "At least one special character",
      valid: /[^A-Za-z0-9]/.test(password || ""),
    },
    {
      label: "Passwords match",
      valid: password === confirmPassword && !!password,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-5 pb-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="mt-8">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <KeyRound className="h-10 w-10 text-gray-600 dark:text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reset Your Password</h1>
            <p className="text-gray-500 dark:text-gray-400">Create a new secure password for your account</p>
          </div>

          {validatingToken && (
            <div className="my-8 text-center">
              <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-4">Validating your reset link...</p>
            </div>
          )}

          {!token && !validatingToken && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">No Reset Token</h2>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-4">
                    Please use the link provided in your password reset email.
                  </p>
                  <Link
                    href="/forgot-password"
                    className="inline-block px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Request Password Reset
                  </Link>
                </div>
              </div>
            </div>
          )}

          {token && !success && !validatingToken && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                {passwordFields.map((field) => (
                  <div key={field.id}>
                    <InputField {...field} />
                    {errors[field.id as keyof ResetPasswordData]?.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                        {errors[field.id as keyof ResetPasswordData]?.message}
                      </p>
                    )}
                  </div>
                ))}

                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Password Requirements:</h3>
                  <ul className="space-y-2 text-sm">
                    {passwordRequirements.map((req, index) => (
                      <li
                        key={index}
                        className={`flex items-center ${req.valid ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        {req.valid ? (
                          <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                        ) : (
                          <X className="h-4 w-4 mr-2 text-gray-400 dark:text-gray-500" />
                        )}
                        {req.label}
                      </li>
                    ))}
                  </ul>
                </div>

                {errors.root && (
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300">{errors.root.message}</p>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {true ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25"/>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl shadow-sm border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">Password Reset Successfully</h2>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                    Your password has been updated. You can now login with your new password.
                  </p>
                  <Link
                    href="/login"
                    className="inline-block px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Need help?{" "}
              <Link href="/contact" className="text-green-600 hover:underline dark:text-green-400">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}