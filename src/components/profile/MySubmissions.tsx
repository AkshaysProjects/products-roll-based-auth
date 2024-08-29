"use client";

import Spinner from "@/components/common/Spinner";
import NoSubmissions from "@/components/profile/NoSubmissions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useMySubmissions from "@/hooks/useMySubmissions";
import { PendingChange } from "@/types/change";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  Image as ImageIcon,
  IndianRupeeIcon,
  XCircle,
} from "lucide-react";

export default function MySubmissions() {
  const { data: submissions, isLoading } = useMySubmissions();

  if (isLoading || !submissions) return <Spinner />;
  if (!submissions.length) return <NoSubmissions />;

  const getStatusIcon = (status: PendingChange["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: PendingChange["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">My Submissions</h1>
      <AnimatePresence>
        {submissions.map((submission) => (
          <motion.div
            key={submission._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {submission.updatedProduct.name}
                  </CardTitle>
                  <CardDescription>
                    Submitted on {format(new Date(submission.createdAt), "PPP")}
                  </CardDescription>
                </div>
                <Badge
                  className={`${getStatusColor(submission.status)} capitalize`}
                >
                  {getStatusIcon(submission.status)}
                  <span className="ml-2">{submission.status}</span>
                </Badge>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="details">
                    <AccordionTrigger>View Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">
                            {submission.product
                              ? "Updated Product"
                              : "New Product"}
                          </h3>
                          <p>
                            <strong>Name:</strong>{" "}
                            {submission.updatedProduct.name}
                          </p>
                          <p>
                            <strong>Description:</strong>{" "}
                            {submission.updatedProduct.description}
                          </p>
                          <p className="flex items-center">
                            <strong>Price: </strong>{" "}
                            {submission.updatedProduct.price.toFixed(2)}
                            <IndianRupeeIcon className="w-4 h-4 mr-1" />
                          </p>
                        </div>
                        {submission.product && (
                          <div>
                            <h3 className="font-semibold mb-2">
                              Original Product
                            </h3>
                            <p>
                              <strong>Name:</strong> {submission.product.name}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {submission.product.description}
                            </p>
                            <p className="flex items-center">
                              <strong>Price:</strong>{" "}
                              {submission.product.price.toFixed(2)}
                              <IndianRupeeIcon className="w-4 h-4 mr-1" />
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() =>
                    window.open(
                      submission.updatedProduct.image ??
                        submission.product?.image,
                      "_blank"
                    )
                  }
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  View Image
                </Button>
                <p className="text-sm text-muted-foreground">
                  Last updated: {format(new Date(submission.updatedAt), "PPP")}
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
