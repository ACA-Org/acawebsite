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

export interface ImisUserResponse {
  $type: string;
  Items: Items;
  Offset: number;
  Limit: number;
  Count: number;
  TotalCount: number;
  NextPageLink: null;
  HasNext: boolean;
  NextOffset: number;
}

export interface Items {
  $type: string;
  $values: Value[];
}

export interface Value {
  $type: string;
  EffectiveDate: Date;
  ExpirationDate: Date;
  IsDisable: boolean;
  Roles: null;
  IsAnonymous: boolean;
  UserId: string;
  UserName: string;
  Party: Party;
}

export interface Party {
  $type: string;
  CityName: string;
  CountryName: string;
  CountrySubEntityName: string;
  Email: string;
  Phone: string;
  PartyId: string;
  Id: string;
  UniformId: string;
  Status: Status;
  Name: string;
  Sort: string;
  IsMarkedForDelete: boolean;
}

export interface Status {
  $type: string;
  PartyStatusId: string;
  Name: string;
  Description: string;
}

export async function getTokenFromRefresh(
  refresh_token: string
): Promise<ImisTokenResponse> {
  if (!process.env.IMIS_CLIENT_ID || !process.env.IMIS_CLIENT_SECRET) {
    console.error("[getTokenFromRefresh] Missing environment variables");
    throw new Error("Missing IMIS client credentials in environment variables");
  }

  try {
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
      console.error("[getTokenFromRefresh] Token refresh failed:", {
        status: res.status,
        statusText: res.statusText,
        error,
      });
      throw new Error(`Failed to get token: ${error}`);
    }

    const result = (await res.json()) as ImisTokenResponse;
    return result;
  } catch (error) {
    console.error("[getTokenFromRefresh] Unexpected error:", error);
    throw error;
  }
}

export async function fetchIMISUserProfile(
  access_token: string,
  userName: string
): Promise<ImisUserResponse> {
  const res = await fetch(
    `https://aca.org/api/User?UserName=${encodeURIComponent(userName)}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

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

