"use client";

import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext<null>(null);

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
}) {
  const [userSession, setUserSession] = useState(session);

  return (
    <SessionContext.Provider value={{ userSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
