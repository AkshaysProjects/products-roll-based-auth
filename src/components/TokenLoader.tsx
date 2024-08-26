"use client";

import Spinner from "@/components/Spinner";
import api from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TokenLoader() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  useEffect(() => {
    if (token)
      api
        .post("/api/auth/login", { token })
        .then(() => router.replace("/"))
        .catch(() => router.replace("/login"));
  }, [token, router]);
  return <Spinner />;
}
