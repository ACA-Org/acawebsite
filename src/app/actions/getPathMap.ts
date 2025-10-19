"use server";

import { createClient } from "@/prismicio";
import { FilledContentRelationshipField } from "@prismicio/client";

export type PathMapData = {
  [id: string]: string; // id -> path
};

export async function getOptimizedPathMap(): Promise<PathMapData> {
  const client = createClient();

  // Fetch ONLY the fields needed for path resolution
  // This reduces data transfer by ~99% compared to fetching full documents
  const [
    tierOneDocs,
    tierTwoDocs,
    tierThreeDocs,
    tierFourDocs,
    newsletterDocs,
    singletonResults,
  ] = await Promise.all([
    client.getAllByType("tierOnePage", {
      fetch: ["tierOnePage.uid"], // Only fetch uid field
      fetchOptions: {
        next: {
          revalidate: 3600, // Cache for 1 hour
          tags: ["pathmap"],
        },
      },
    }),
    client.getAllByType("tierTwoPage", {
      fetch: ["tierTwoPage.uid", "tierTwoPage.parentPage"],
      fetchOptions: {
        next: {
          revalidate: 3600,
          tags: ["pathmap"],
        },
      },
    }),
    client.getAllByType("tierThreePage", {
      fetch: ["tierThreePage.uid", "tierThreePage.parentPage"],
      fetchOptions: {
        next: {
          revalidate: 3600,
          tags: ["pathmap"],
        },
      },
    }),
    client.getAllByType("tierFourPage", {
      fetch: ["tierFourPage.uid", "tierFourPage.parentPage"],
      fetchOptions: {
        next: {
          revalidate: 3600,
          tags: ["pathmap"],
        },
      },
    }),
    client.getAllByType("newsletterDetail", {
      fetch: ["newsletterDetail.uid"],
      fetchOptions: {
        next: {
          revalidate: 3600,
          tags: ["pathmap"],
        },
      },
    }),
    // Use allSettled to handle missing singleton documents gracefully
    Promise.allSettled([
      client.getSingle("contactPage", {
        fetch: [],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
      client.getSingle("locationsPage", {
        fetch: [],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
      client.getSingle("privacyPolicy", {
        fetch: [],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
      client.getSingle("homepage", {
        fetch: [],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
      client.getSingle("newsletterPage", {
        fetch: [],
        fetchOptions: {
          next: {
            revalidate: 3600,
            tags: ["pathmap"],
          },
        },
      }),
    ]),
  ]);

  // Extract singleton documents, handling missing ones
  const contactPage =
    singletonResults[0].status === "fulfilled"
      ? singletonResults[0].value
      : null;
  const locationsPage =
    singletonResults[1].status === "fulfilled"
      ? singletonResults[1].value
      : null;
  const privacyPolicy =
    singletonResults[2].status === "fulfilled"
      ? singletonResults[2].value
      : null;
  const homepage =
    singletonResults[3].status === "fulfilled"
      ? singletonResults[3].value
      : null;
  const newsletterPage =
    singletonResults[4].status === "fulfilled"
      ? singletonResults[4].value
      : null;

  const pathMap: PathMapData = {};

  // Tier 1 pages
  tierOneDocs.forEach((doc) => {
    pathMap[doc.id] = `/${doc.uid}`;
  });

  // Tier 2 pages
  tierTwoDocs.forEach((doc) => {
    const parent = tierOneDocs.find(
      (d) =>
        d.id === (doc.data.parentPage as FilledContentRelationshipField)?.id
    );
    if (parent) {
      pathMap[doc.id] = `/${parent.uid}/${doc.uid}`;
    }
  });

  // Tier 3 pages
  tierThreeDocs.forEach((doc) => {
    const parent = tierTwoDocs.find(
      (d) =>
        d.id === (doc.data.parentPage as FilledContentRelationshipField)?.id
    );
    const grandparent = parent
      ? tierOneDocs.find(
          (d) =>
            d.id ===
            (parent.data.parentPage as FilledContentRelationshipField)?.id
        )
      : null;

    if (parent && grandparent) {
      pathMap[doc.id] = `/${grandparent.uid}/${parent.uid}/${doc.uid}`;
    }
  });

  // Tier 4 pages
  tierFourDocs.forEach((doc) => {
    const parent = tierThreeDocs.find(
      (d) =>
        d.id === (doc.data.parentPage as FilledContentRelationshipField)?.id
    );
    const grandparent = parent
      ? tierTwoDocs.find(
          (d) =>
            d.id ===
            (parent.data.parentPage as FilledContentRelationshipField)?.id
        )
      : null;
    const greatGrandparent = grandparent
      ? tierOneDocs.find(
          (d) =>
            d.id ===
            (grandparent.data.parentPage as FilledContentRelationshipField)?.id
        )
      : null;

    if (parent && grandparent && greatGrandparent) {
      pathMap[doc.id] =
        `/${greatGrandparent.uid}/${grandparent.uid}/${parent.uid}/${doc.uid}`;
    }
  });

  // Newsletter detail pages
  newsletterDocs.forEach((doc) => {
    pathMap[doc.id] = `/newsletters/${doc.uid}`;
  });

  // Singleton pages (only add if they exist)
  if (contactPage) pathMap[contactPage.id] = "/contact";
  if (locationsPage) pathMap[locationsPage.id] = "/locations";
  if (privacyPolicy) pathMap[privacyPolicy.id] = "/privacy_policy";
  if (homepage) pathMap[homepage.id] = "/";
  if (newsletterPage) pathMap[newsletterPage.id] = "/newsletters";

  return pathMap;
}

