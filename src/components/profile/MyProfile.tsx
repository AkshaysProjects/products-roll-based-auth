"use client";

import Spinner from "@/components/common/Spinner";
import StatCard from "@/components/profile/StatCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useProfile from "@/hooks/useProfile";
import { getInitials } from "@/utils/email";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Mail,
  Shield,
  XCircle,
} from "lucide-react";

export default function MyProfile() {
  const { data: user, isLoading } = useProfile();

  if (isLoading || !user) return <Spinner />;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.email}`}
                alt={user.email}
              />
              <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl font-bold">
                {user.email.split("@")[0]}
              </CardTitle>
              <CardDescription className="flex items-center justify-center sm:justify-start mt-2">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </CardDescription>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                  className="mr-2"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                {user.emailVerified && (
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="text-sm">
                  Joined: {format(new Date(user.createdAt), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center">
                <Edit className="w-5 h-5 mr-2 text-muted-foreground" />
                <span className="text-sm">
                  Last updated:{" "}
                  {format(new Date(user.updatedAt), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Change Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  icon={<Clock className="w-8 h-8 text-yellow-500" />}
                  label="Pending"
                  value={user.pendingChanges}
                />
                <StatCard
                  icon={<CheckCircle className="w-8 h-8 text-green-500" />}
                  label="Approved"
                  value={user.approvedChanges}
                />
                <StatCard
                  icon={<XCircle className="w-8 h-8 text-red-500" />}
                  label="Rejected"
                  value={user.rejectedChanges}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
