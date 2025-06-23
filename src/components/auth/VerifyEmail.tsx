'use client';

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        setLoading(true);
        await axios.post("/api/auth/emailverification", { token });
        setVerified(true);
      } catch (error) {
        setError(true);
        //@ts-expect-error: unknown
        console.error(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center w-[100vw] justify-center min-h-screen bg-gradient-to-b from-green-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 text-center border border-gray-200">

        {/* Header */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Verification</h1>
        <p className="text-gray-600 mb-6">We&apos;re confirming your email address</p>

        {/* Loading Spinner */}
        {loading && (
          <div className="my-8">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 mt-4">Verifying your email...</p>
          </div>
        )}

        {/* Verified */}
        {verified && !loading && (
          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-green-700">Email Verified Successfully</h2>
            <p className="text-sm text-green-600 mb-4">Your email has been confirmed. Your account is now active.</p>
            <Link href="/login" className="inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors duration-200 w-full">
              Continue to Login
            </Link>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="w-12 h-12 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-red-700">Verification Failed</h2>
            <p className="text-sm text-red-600 mb-4">We couldn&apos;t verify your email with the provided token.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/resend-verification" className="flex-1 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg text-sm font-medium transition-colors duration-200">
                Resend Email
              </Link>
              <Link href="/contact" className="flex-1 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors duration-200">
                Contact Support
              </Link>
            </div>
          </div>
        )}

        {/* No Token */}
        {!token && !loading && !verified && !error && (
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-yellow-700">No Verification Token</h2>
            <p className="text-sm text-yellow-600 mb-4">Please use the link provided in your verification email.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/resend-verification" className="flex-1 px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-lg text-sm font-medium transition-colors duration-200">
                Resend Email
              </Link>
              <Link href="/" className="flex-1 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors duration-200">
                Back to Home
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-green-600 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
}
