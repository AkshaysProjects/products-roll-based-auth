"use client";

import AdminGuard from "@/components/guards/AdminGuard";
import AuthGuard from "@/components/guards/AuthGuard";
import MemberGuard from "@/components/guards/MemberGuard";
import useAuth from "@/hooks/useAuth";

interface AuthGuardProps {
  admin?: boolean;
  member?: boolean;
  children: React.ReactNode;
}

export default function Guard({
  admin = false,
  member = false,
  children,
}: AuthGuardProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <AuthGuard />;
  }

  if (admin && !isAdmin) {
    return <AdminGuard />;
  }

  if (member && isAdmin) {
    return <MemberGuard />;
  }

  return <>{children}</>;
}
