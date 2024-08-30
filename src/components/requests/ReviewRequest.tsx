"use client";

import Spinner from "@/components/common/Spinner";
import NoRequests from "@/components/requests/NoRequests";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import usePendingRequest from "@/hooks/usePendingRequest";
import { Product } from "@/types/product";
import api from "@/utils/api";
import { format } from "date-fns";
import {
  ArrowLeft,
  CheckCircle,
  Image as ImageIcon,
  IndianRupeeIcon,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ReviewRequest() {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const router = useRouter();
  const { id: requestId }: { id: string } = useParams();
  const { data: request, isLoading } = usePendingRequest(requestId);

  if (isLoading) return <Spinner />;
  if (!request) return <NoRequests />;

  const handleAction = async (action: "approve" | "reject") => {
    await api
      .post(`/api/changes/${request._id}/${action}`)
      .then(() => {
        toast({
          title: action === "approve" ? "Request Approved" : "Request Rejected",
          description:
            action === "approve"
              ? "The product edit request has been approved successfully."
              : "The product edit request has been rejected successfully.",
        });
        router.push("/pending-requests");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong, please try again.",
        });
      });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/pending-requests")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pending Requests
      </Button>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Review Product Edit Request
          </CardTitle>
          <CardDescription>Request ID: {request._id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {request.product && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Original Product</h3>
                <ProductDetails product={request.product} />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {request.product ? "Updated Product" : "New Product"}
              </h3>
              <ProductDetails product={request.updatedProduct} />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Request Details</h3>
            <p>
              <strong>Submitted by:</strong> {request.user}
            </p>
            <p>
              <strong>Submitted on:</strong>{" "}
              {format(new Date(request.createdAt), "PPP")}
            </p>
            <p>
              <strong>Last updated:</strong>{" "}
              {format(new Date(request.updatedAt), "PPP")}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog
            open={isApproveDialogOpen}
            onOpenChange={setIsApproveDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                <CheckCircle className="mr-2 h-4 w-4" /> Approve
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to approve this product edit request?
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsApproveDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleAction("approve")}>
                  Confirm Approval
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isRejectDialogOpen}
            onOpenChange={setIsRejectDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="destructive">
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to reject this product edit request?
                  This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsRejectDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleAction("reject")}
                >
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}

function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="space-y-2">
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p className="flex items-center">
        <strong>Price:</strong> {product.price.toFixed(2)}
        <IndianRupeeIcon />
      </p>
      <div>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={() => window.open(product.image, "_blank")}
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          View Image
        </Button>
      </div>
    </div>
  );
}
