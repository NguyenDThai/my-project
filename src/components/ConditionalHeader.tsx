"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";

const ConditionalHeader = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const adminRole = session?.user.role === "admin";
  if (adminRole) {
    return null;
  }

  return (
    <>
      <Header />
      <Chatbot />
    </>
  );
};

export default ConditionalHeader;
