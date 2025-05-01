export type PrismicWebhookPayload = {
  type: "api-update" | "test-trigger";
  secret?: string | null;
  masterRef: string;
  domain: string;
  apiUrl: string;
  releases: {
    addition: {
      id: string;
      ref: string;
      label: string;
      documents: string[];
    }[];
    update: {
      id: string;
      ref: string;
      label: string;
      scheduledAt: string;
      documents: string[];
    }[];
    deletion: {
      id: string;
      ref: string;
      label: string;
      documents: string[];
    }[];
  };
  bookmarks?: Record<string, unknown>; // Legacy field
  collection?: Record<string, unknown>; // Legacy field
  tags: {
    addition: {
      id: string;
    }[];
    deletion: {
      id: string;
    }[];
  };
  documents: string[];
};
