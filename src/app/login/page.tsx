import Login from "@/components/auth/Login";
import TokenLoader from "@/components/auth/TokenLoader";

export default async function RegisterPage({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) {
  if (token) return <TokenLoader />;
  return <Login />;
}
