export interface ImisTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  userName: string;
  "as:client_id": string;
  ".issued": string;
  ".expires": string;
  TenantId: string;
}

export interface ImisUserProfile {
  id: string;
  full_name: string;
  email: string;
  [key: string]: any;
}

export async function getTokenFromRefresh(
  refresh_token: string
): Promise<ImisTokenResponse> {
  if (!process.env.IMIS_CLIENT_ID || !process.env.IMIS_CLIENT_SECRET) {
    throw new Error("Missing IMIS client credentials in environment variables");
  }

  const res = await fetch("https://aca.org/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
      client_id: process.env.IMIS_CLIENT_ID,
      client_secret: process.env.IMIS_CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to get token: ${error}`);
  }

  const result = (await res.json()) as ImisTokenResponse;
  return result;
}

export async function fetchIMISUserProfile(
  access_token: string
): Promise<ImisUserProfile> {
  const res = await fetch("https://aca.org/api/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch user profile: ${error}`);
  }

  const profile = await res.json();
  return {
    id: profile.id,
    full_name: profile.full_name,
    email: profile.email,
    ...profile,
  };
}

