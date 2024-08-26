"use client";

import AuthLoader from "@/loaders/AuthLoader";

export default function Loaders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthLoader>{children}</AuthLoader>
    </>
  );
}
