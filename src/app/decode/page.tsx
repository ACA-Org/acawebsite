import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function Decode() {
  const cookieStore = await cookies();

  const val = cookieStore.get("test-token")?.value;

  if (!val) {
    return <div>No token found</div>;
  }

  const decoded = await decode({
    token: val,
    secret: "4TQnjZb3TKud82M95K0jhvHQBDjom60rJL7aJV4RNZU=",
  });

  console.log({ decoded, val });

  return <div>{JSON.stringify(decoded)}</div>;
}

