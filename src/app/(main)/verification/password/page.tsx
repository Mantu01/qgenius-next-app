"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function PasswordResetPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validatingToken, setValidatingToken] = useState(true);

  // Validate password requirements
  const [passwordLength, setPasswordLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
    setValidatingToken(false);
  }, []);

  useEffect(() => {
    // Validate password as user types
    setPasswordLength(password.length >= 8);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecial(/[^A-Za-z0-9]/.test(password));
    setPasswordsMatch(password === confirmPassword && password !== "");
  }, [password, confirmPassword]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch || !passwordLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      setError(true);
      setErrorMessage("Please meet all password requirements");
      return;
    }
    
    try {
      setLoading(true);
      await axios.post("/api/auth/resetpassword", { token, password });
      setSuccess(true);
      setError(false);
      setLoading(false);
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response?.data?.message || "Password reset failed");
      setLoading(false);
      console.error(error.response?.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 text-center border border-gray-200">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset Your Password</h1>
        <p className="text-gray-600 mb-6">Create a new secure password for your account</p>

        {validatingToken && (
          <div className="my-8">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 mt-4">Validating your reset link...</p>
          </div>
        )}

        {!token && !validatingToken && (
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-yellow-700">No Reset Token</h2>
            <p className="text-sm text-yellow-600 mb-4">Please use the link provided in your password reset email.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/forgot-password"
                className="flex-1 px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Request Password Reset
              </Link>
            </div>
          </div>
        )}

        {token && !success && !validatingToken && (
          <form onSubmit={handleResetPassword} className="mt-6 text-left">
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter new password"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Confirm new password"
                required
              />
            </div>
            
            <div className="mb-6 bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h3>
              <ul className="space-y-1 text-xs">
                <li className={`flex items-center ${passwordLength ? 'text-green-600' : 'text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${passwordLength ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={passwordLength ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                  </svg>
                  At least 8 characters long
                </li>
                <li className={`flex items-center ${hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${hasUppercase ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={hasUppercase ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                  </svg>
                  Include at least one uppercase letter
                </li>
                <li className={`flex items-center ${hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${hasLowercase ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={hasLowercase ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                  </svg>
                  Include at least one lowercase letter
                </li>
                <li className={`flex items-center ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${hasNumber ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={hasNumber ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                  </svg>
                  Include at least one number
                </li>
                <li className={`flex items-center ${hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${hasSpecial ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={hasSpecial ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                  </svg>
                  Include at least one special character
                </li>
                <li className={`flex items-center ${passwordsMatch ? 'text-green-600' : 'text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 ${passwordsMatch ? 'text-green-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={passwordsMatch ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                  </svg>
                  Passwords match
                </li>
              </ul>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                {errorMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading || !passwordsMatch}
              className={`w-full py-3 px-4 text-white bg-green-600 rounded-lg text-sm font-medium transition-colors duration-200 ${
                loading || !passwordsMatch ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        )}

        {success && (
          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-green-700">Password Reset Successfully</h2>
            <p className="text-sm text-green-600 mb-4">Your password has been updated. You can now login with your new password.</p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors duration-200 w-full"
            >
              Go to Login
            </Link>
          </div>
        )}

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-green-600 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
}