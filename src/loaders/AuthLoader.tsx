import Spinner from "@/components/common/Spinner";
import useAuth from "@/hooks/useAuth";

export default function AuthLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  return <>{children}</>;
}
