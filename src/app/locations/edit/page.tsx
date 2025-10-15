import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LocationsEditClient from "./LocationsEditClient";

export default async function LocationsEditPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email && !session?.user?.id) {
    redirect("/");
  }

  // Get authorized users from environment variable
  const authorizedUsers = process.env.LOCATIONS_ADMIN_USERS || "";
  const authorizedList = authorizedUsers
    .split(",")
    .map((user) => user.trim())
    .filter(Boolean);

  const isAuthorized =
    authorizedList.length === 0 ||
    authorizedList.includes(session?.user.email || "");

  if (!isAuthorized) {
    redirect("/");
  }

  return <LocationsEditClient />;
}
