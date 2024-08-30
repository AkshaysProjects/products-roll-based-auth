"use client";

import EmailVerified from "@/components/auth/EmailVerified";
import LoggedIn from "@/components/auth/LoggedIn";
import TokenExpired from "@/components/auth/TokenExpired";
import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyLoader() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isAuthenticated } = useAuth();
  const { mutate, isSuccess, isError, isPending } = useVerifyEmail();

  useEffect(() => {
    if (token && !isAuthenticated) mutate(token);
  }, [mutate, token, isAuthenticated]);

  if (isAuthenticated) return <LoggedIn />;
  if (isPending) return <Spinner />;
  if (isSuccess) return <EmailVerified />;
  if (isError) return <TokenExpired />;
}
