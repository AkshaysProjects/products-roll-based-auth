"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvalidRequest() {
  const [progress, setProgress] = useState(100);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          router.back();
          return 0;
        }
        return prevProgress - 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-[350px] sm:w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive mr-2" />
              Invalid Request ID
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              The request ID you&apos;re trying to access is invalid or
              doesn&apos;t exist.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting back in {Math.ceil(progress / 20)} seconds...
            </p>
            <Progress value={progress} className="mt-2" />
          </CardContent>
          <CardFooter>
            <Button onClick={handleGoBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back Now
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
