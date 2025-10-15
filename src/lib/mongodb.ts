import { MongoClient, Db, Collection } from "mongodb";
import { Location } from "@/app/locations/data/types";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db("aca");
}

export async function getLocationsCollection(): Promise<Collection<Location>> {
  const db = await getDatabase();
  return db.collection<Location>("locations");
}

// Cache for locations data
let locationsCache: {
  data: Location[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedLocations(): Promise<Location[]> {
  const now = Date.now();

  // Check if cache is valid
  if (locationsCache.data && now - locationsCache.timestamp < CACHE_DURATION) {
    return locationsCache.data;
  }

  // Fetch fresh data
  const collection = await getLocationsCollection();
  const locations = await collection.find({}).toArray();

  // Update cache
  locationsCache = {
    data: locations,
    timestamp: now,
  };

  return locations;
}

export function invalidateLocationsCache() {
  locationsCache = {
    data: null,
    timestamp: 0,
  };
}
