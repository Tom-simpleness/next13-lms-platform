"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@clerk/nextjs/server";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    accessorFn: (row) => {
      if (row.emailAddresses && row.emailAddresses[0]) {
        return row.emailAddresses[0].emailAddress;
      }
      return "N/A";
      // Return the email address
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LastName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FirstName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    accessorFn: (row) => {
      if (row.publicMetadata.role) {
        return row.publicMetadata.role;
      }
      return "N/A";
      // Return the email address
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original.publicMetadata.role;
      const id = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">...</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Edit role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={role as string}
              onValueChange={(newRole) => {
                setNewRole(id, newRole).then((res) => {
                  location.reload();
                });
              }}
            >
              <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="student">
                Student
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="teacher">
                Teacher
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// post axios request to change role

async function setNewRole(id: string, newValue: string) {
  try {
    // Corrected to include form values in the POST request
    const response = await axios.post("/api/users/roles", {
      id: id,
      role: newValue,
    });
    return response;
  } catch (error) {
    console.log("[USER ROLE]" + error);
  }
}
