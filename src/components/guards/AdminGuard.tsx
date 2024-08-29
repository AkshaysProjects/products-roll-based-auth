import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminGuard() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] sm:w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Admin Access Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-4"
            >
              <Shield className="w-16 h-16 text-destructive mx-auto" />
            </motion.div>
            <p className="text-lg mb-4">
              This page is restricted to admin users only.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/")} className="w-full">
              Go to Homepage
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
