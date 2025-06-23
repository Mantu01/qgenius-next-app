'use client'

import VerifyEmailPage from "@/components/auth/VerifyEmail";
import { Suspense } from "react";

export default function EmailVerificationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailPage />
      </Suspense>
    </div>
  );
}
