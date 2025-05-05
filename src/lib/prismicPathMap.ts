import { createClient } from "@/prismicio";
import { FilledContentRelationshipField } from "@prismicio/client";

export type PathMap = Map<string, string> | null;

export async function getPathMap(): Promise<Map<string, string>> {
  const client = createClient();
  const tierOneDocs = await client.getAllByType("tierOnePage");
  const tierTwoDocs = await client.getAllByType("tierTwoPage");
  const tierThreeDocs = await client.getAllByType("tierThreePage");
  const contactPage = await client.getSingle("contactPage");
  const locationsPage = await client.getSingle("locationsPage");
  const privacyPolicy = await client.getSingle("privacyPolicy");

  const map = new Map<string, string>();

  for (const doc of tierOneDocs) {
    map.set(doc.id, `/${doc.uid}`);
  }

  for (const doc of tierTwoDocs) {
    const parent = tierOneDocs.find(
      (d) =>
        d.id === (doc.data.parentPage as FilledContentRelationshipField)?.id
    );
    if (parent) {
      map.set(doc.id, `/${parent.uid}/${doc.uid}`);
    }
  }

  for (const doc of tierThreeDocs) {
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
      map.set(doc.id, `/${grandparent.uid}/${parent.uid}/${doc.uid}`);
    }
  }

  map.set(contactPage.id, `/contact`);
  map.set(locationsPage.id, `/locations`);
  map.set(privacyPolicy.id, `/privacy-policy`);

  return map;
}
