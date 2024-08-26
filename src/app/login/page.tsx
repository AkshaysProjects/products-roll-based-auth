import Login from "@/components/Login";
import TokenLoader from "@/components/TokenLoader";

export default async function RegisterPage({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) {
  if (token) return <TokenLoader />;
  return <Login />;
}
