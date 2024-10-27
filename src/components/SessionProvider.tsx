// src/components/SessionProvider.tsx
"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React, { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
  session: Session | null;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children, session }) => {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
