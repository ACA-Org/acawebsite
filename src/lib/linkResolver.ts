import { AllDocumentTypes } from "../../prismicio-types";
import { PathMapData } from "@/app/actions/getPathMap";

type DocType = {
  id?: string;
  type: AllDocumentTypes["type"];
  uid?: string;
  [key: string]: any;
};

export function linkResolver(
  doc: DocType,
  pathMap: PathMapData | Map<string, string>
): string {
  // Handle Map or object
  const getPath = (id: string) => {
    if (pathMap instanceof Map) {
      return pathMap.get(id);
    }
    return pathMap[id];
  };

  // If we have an ID, use the path map (fastest)
  if (doc.id) {
    const path = getPath(doc.id);
    if (path) {
      return path;
    }
  }

  // Fallback to type-based resolution (for documents without ID)
  switch (doc.type) {
    case "tierOnePage":
      return doc.uid ? `/${doc.uid}` : "/";
    case "tierTwoPage":
    case "tierThreePage":
    case "tierFourPage":
      // Without ID, we can't resolve multi-level paths
      // This should rarely happen as Prismic links usually have IDs
      return "/";
    case "newsletterDetail":
      return doc.uid ? `/newsletters/${doc.uid}` : "/newsletters";
    case "newsletterPage":
      return "/newsletters";
    case "contactPage":
      return "/contact";
    case "locationsPage":
      return "/locations";
    case "privacyPolicy":
      return "/privacy_policy";
    case "homepage":
      return "/";
    default:
      return "/";
  }
}
