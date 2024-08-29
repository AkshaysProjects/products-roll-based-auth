"use client";

import Spinner from "@/components/common/Spinner";
import NoRequests from "@/components/requests/NoRequests";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePendingRequests from "@/hooks/usePendingRequests";
import { format } from "date-fns";
import { ChevronRight, Clock, Package, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PendingRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { data: requests, isLoading } = usePendingRequests();

  if (isLoading || !requests) return <Spinner />;
  if (!requests.length) return <NoRequests />;

  const filteredRequests = requests.filter(
    (request) =>
      request.updatedProduct.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRequestClick = (requestId: string) => {
    router.push(`/pending-requests/${requestId}`);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Pending Product Edit Requests
          </CardTitle>
          <CardDescription>
            Review and manage product edit requests submitted by users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by product name or user ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium">
                      {request.updatedProduct.name}
                    </TableCell>
                    <TableCell>{request.user}</TableCell>
                    <TableCell>
                      {format(new Date(request.createdAt), "PPP")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => handleRequestClick(request._id)}
                        className="flex items-center"
                      >
                        Review <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">
              {filteredRequests.length} pending requests
            </span>
          </div>
          <Badge variant="outline" className="flex items-center">
            <Package className="w-4 h-4 mr-1" />
            Admin View
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}
