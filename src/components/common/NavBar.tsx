"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, isAdmin } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname == "/") return null;
  if (pathname === "/login") return null;
  if (pathname === "/register") return null;

  const NavButton = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} passHref>
        <Button
          variant={isActive ? "secondary" : "outline"}
          size="sm"
          className={`${
            isActive ? "bg-secondary" : ""
          } text-sm font-medium transition-colors hover:bg-secondary`}
        >
          {children}
        </Button>
      </Link>
    );
  };

  return (
    <nav className="bg-background shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Logo
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isAuthenticated && isAdmin && (
              <NavButton href="/pending-requests">Pending Requests</NavButton>
            )}
            {isAuthenticated && !isAdmin && (
              <NavButton href="/my-submissions">My Submissions</NavButton>
            )}
            <NavButton href="/dashboard">Dashboard</NavButton>
            {!isAuthenticated && (
              <>
                <NavButton href="/login">Login</NavButton>
                <NavButton href="/register">Register</NavButton>
              </>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {isAuthenticated && isAdmin && (
              <NavButton href="/pending-requests">Pending Requests</NavButton>
            )}
            {isAuthenticated && !isAdmin && (
              <NavButton href="/my-submissions">My Submissions</NavButton>
            )}
            <NavButton href="/dashboard">Dashboard</NavButton>
            {!isAuthenticated && (
              <>
                <NavButton href="/login">Login</NavButton>
                <NavButton href="/register">Register</NavButton>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
