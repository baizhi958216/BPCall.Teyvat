"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  return (
    <SessionProvider basePath="/BLL/api/auth/provider">
      {children}
    </SessionProvider>
  );
}
