"use client";

import LoggedIn from "@/components/auth/LoggedIn";
import SuccessCounter from "@/components/auth/SuccessCounter";
import TokenExpired from "@/components/auth/TokenExpired";
import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";
import useLogin from "@/hooks/useLogin";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TokenLoader() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { isAuthenticated } = useAuth();
  const { mutate, isSuccess, isError, isPending } = useLogin();

  useEffect(() => {
    if (token && !isAuthenticated) mutate(token);
  }, [mutate, token, isAuthenticated]);

  if (isAuthenticated) return <LoggedIn />;
  if (isPending) return <Spinner />;
  if (isSuccess) return <SuccessCounter />;
  if (isError) return <TokenExpired />;
}
