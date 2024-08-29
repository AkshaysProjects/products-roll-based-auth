"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function SuccessCounter() {
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
      router.push("/");
    }
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
      <Confetti
        width={typeof window !== "undefined" ? window.innerWidth : 300}
        height={typeof window !== "undefined" ? window.innerHeight : 200}
        recycle={false}
        numberOfPieces={200}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-background rounded-lg shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-24 h-24 text-primary mx-auto mb-4" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Login Successful!
        </h1>
        <p className="text-xl mb-6 text-muted-foreground">
          Welcome back! We&apos;re glad to see you.
        </p>
        <div className="text-2xl font-semibold mb-4">
          Redirecting to homepage in{" "}
          <motion.span
            key={countdown}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-primary inline-block"
          >
            {countdown}
          </motion.span>{" "}
          seconds
        </div>
        <div className="relative">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
