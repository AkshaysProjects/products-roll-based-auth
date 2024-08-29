"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RefreshCw, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TokenExpired() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/login");
    }
  }, [countdown, router]);

  const handleTryAgain = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-destructive/10 to-muted/20">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-background rounded-lg shadow-lg max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <XCircle className="w-24 h-24 text-destructive mx-auto mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 text-destructive">
          Login Link Expired
        </h1>
        <p className="text-xl mb-6 text-muted-foreground">
          We&apos;re sorry, but your login link has expired. Please try again.
        </p>
        <div className="text-lg font-semibold mb-4">
          Redirecting to login page in{" "}
          <motion.span
            key={countdown}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-destructive inline-block"
          >
            {countdown}
          </motion.span>{" "}
          seconds
        </div>
        <div className="relative mb-6">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-destructive"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>
        <Button
          onClick={handleTryAgain}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Try Again Now
        </Button>
      </motion.div>
    </div>
  );
}
