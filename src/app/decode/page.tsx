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

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Property</th>
            <th className="border border-gray-300 p-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {decoded &&
            Object.entries(decoded).map(([key, value]) => (
              <tr key={key}>
                <td className="border border-gray-300 p-2 font-medium">
                  {key}
                </td>
                <td className="border border-gray-300 p-2">
                  {typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : String(value)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

