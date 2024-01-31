import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const UsersPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  let users = await clerkClient.users.getUserList();
  users = JSON.parse(JSON.stringify(users));

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default UsersPage;
