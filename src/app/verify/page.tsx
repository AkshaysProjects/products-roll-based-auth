import Login from "@/components/auth/Login";
import VerifyLoader from "@/components/auth/VerifyLoader";

export default async function VerifyEmailPage({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) {
  if (token) return <VerifyLoader />;
  return <Login />;
}
