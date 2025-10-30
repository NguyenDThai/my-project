"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const StepOrderOne = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: number) => void;
}) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      setCurrentStep(2);
    }
  }, [setCurrentStep, session]);

  return (
    <>
      {!session?.user && (
        <div>
          Vui lòng đăng nhập để tiến hành thanh toán{" "}
          <a href="/login" className="underline text-orange-500">
            Đăng Nhập
          </a>
        </div>
      )}
    </>
  );
};

export default StepOrderOne;
