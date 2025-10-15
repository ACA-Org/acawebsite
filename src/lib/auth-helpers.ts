import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/**
 * Check if the current user is authorized to manage locations
 * Returns true if authorized, false otherwise
 */
export async function isLocationsAdmin(): Promise<boolean> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email && !session?.user?.id) {
    return false;
  }

  // Get authorized users from environment variable
  const authorizedUsers = process.env.LOCATIONS_ADMIN_USERS || "";
  const authorizedList = authorizedUsers
    .split(",")
    .map((user) => user.trim())
    .filter(Boolean);

  // If no list specified, allow all authenticated users
  if (authorizedList.length === 0) {
    return true;
  }

  // Check if user is authorized (by email or ID)
  return (
    authorizedList.includes(session.user.email || "") ||
    authorizedList.includes(session.user.id || "")
  );
}

/**
 * Get the current session
 */
export async function getCurrentSession() {
  return await getServerSession(authOptions);
}

