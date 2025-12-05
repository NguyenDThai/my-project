"use client";

import ResetPasswordForm from "@/components/ResetPasswordForm";
import React, { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
