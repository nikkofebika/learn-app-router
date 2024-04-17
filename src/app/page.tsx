import DefaultLayout from "@/components/layouts/DefaultLayout";
import TableOne from "@/components/Tables/TableOne";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <DefaultLayout>
      {session?.user?.name}
      <TableOne />
    </DefaultLayout>
  );
}
