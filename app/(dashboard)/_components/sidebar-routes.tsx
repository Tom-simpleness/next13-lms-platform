"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
// Assuming usePathname is correctly imported from your project's setup
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

// Define the guest routes
const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

// Define the teacher routes
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

// Define the admin routes
const adminRoutes = [
  {
    icon: List,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: BarChart,
    label: "AnalyticsAdmin",
    href: "/admin/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  // Determine if the current page is for teacher or admin
  const isTeacherPage = pathname?.includes("/teacher");
  const isAdminPage = pathname?.includes("/admin");

  // Choose the routes based on the current page
  const routes = isAdminPage
    ? adminRoutes
    : isTeacherPage
    ? teacherRoutes
    : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
