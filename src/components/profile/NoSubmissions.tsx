"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoSubmissions() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

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
              No Submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <Inbox className="w-24 h-24 text-muted-foreground mx-auto" />
            </motion.div>
            <p className="text-lg mb-4 text-muted-foreground">
              You haven&apos;t made any submissions yet.
            </p>
            <p className="text-sm mb-4 text-muted-foreground">
              Head to your dashboard to get started and create your first
              submission.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGoToDashboard} className="w-full group">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
