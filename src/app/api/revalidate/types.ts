export type PrismicWebhookPayload = {
  type: "api-update" | "test-trigger";
  masterRef: string;
  // "releases": {},
  // "masks": {},
  // "tags": {},
  // "locales": {},
  // "experiments": {},
  documents: string[];
  domain: string;
  apiUrl: string;
  secret: string;
};
