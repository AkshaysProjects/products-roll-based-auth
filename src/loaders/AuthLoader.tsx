import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || isAuthenticated === null) return <Spinner />;
  return <>{children}</>;
}
