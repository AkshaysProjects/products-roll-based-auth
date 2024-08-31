import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, fetchUserDetails } = useAuth();
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);
  if (isLoading || isAuthenticated === null) return <Spinner />;
  return <>{children}</>;
}
