import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "tierOnePage",
    path: "/:uid",
  },
  {
    type: "tierTwoPage",
    resolvers: {
      parentPage: "parentPage",
    },
    path: "/:parentPage/:uid",
  },
  {
    type: "tierThreePage",
    resolvers: {
      parentPage: "parentPage",
      grandparentPage: "parentPage.parentPage",
    },
    path: "/:grandparentPage/:parentPage/:uid",
  },
  {
    type: "contactPage",
    path: "/contact",
  },
  {
    type: "locationsPage",
    path: "/locations",
  },
  {
    type: "privacyPolicy",
    path: "/privacy_policy",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
  });

  return client;
};
