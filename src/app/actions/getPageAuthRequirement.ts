"use server";

import { createClient } from "@/prismicio";

/**
 * Lightweight function to check if a page requires authentication
 * Only fetches the requiresAuth field to minimize data transfer
 */
export async function getPageAuthRequirement(
  pathname: string
): Promise<boolean> {
  const client = createClient();

  try {
    // Parse the pathname to determine page type and UID
    const segments = pathname.split("/").filter(Boolean);

    // Special case: newsletters detail page
    if (segments[0] === "newsletters" && segments[1]) {
      const page = await client
        .getByUID("newsletterDetail", segments[1], {
          graphQuery: `{
            newsletterDetail {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return page?.data?.requiresAuth ?? false;
    }

    // Special case: newsletters listing page
    if (segments[0] === "newsletters" && !segments[1]) {
      const page = await client
        .getSingle("newsletterPage", {
          graphQuery: `{
            newsletterPage {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return page?.data?.requiresAuth ?? false;
    }

    // Special case: locations page
    if (segments[0] === "locations") {
      const page = await client
        .getSingle("locationsPage", {
          graphQuery: `{
            locationsPage {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return (page?.data as any)?.requiresAuth ?? false;
    }

    // Special case: contact page
    if (segments[0] === "contact") {
      const page = await client
        .getSingle("contactPage", {
          graphQuery: `{
            contactPage {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return (page?.data as any)?.requiresAuth ?? false;
    }

    // Special case: privacy policy
    if (segments[0] === "privacy_policy") {
      const page = await client
        .getSingle("privacyPolicy", {
          graphQuery: `{
            privacyPolicy {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return (page?.data as any)?.requiresAuth ?? false;
    }

    // Tier-based pages
    if (segments.length === 1) {
      // Tier One Page
      const page = await client
        .getByUID("tierOnePage", segments[0], {
          graphQuery: `{
            tierOnePage {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return page?.data?.requiresAuth ?? false;
    } else if (segments.length === 2) {
      // Tier Two Page
      const page = await client
        .getByUID("tierTwoPage", segments[1], {
          graphQuery: `{
            tierTwoPage {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return page?.data?.requiresAuth ?? false;
    } else if (segments.length === 3) {
      // Tier Three Page
      const page = await client
        .getByUID("tierThreePage", segments[2], {
          graphQuery: `{
            tierThreePage {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return page?.data?.requiresAuth ?? false;
    } else if (segments.length === 4) {
      // Tier Four Page
      const page = await client
        .getByUID("tierFourPage", segments[3], {
          graphQuery: `{
            tierFourPage {
              requiresAuth
            }
          }`,
        })
        .catch(() => null);

      return page?.data?.requiresAuth ?? false;
    }

    // Default to false if page type cannot be determined
    return false;
  } catch (error) {
    console.error("[Auth] Error checking page auth requirement:", error);
    return false;
  }
}

