import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/QueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
