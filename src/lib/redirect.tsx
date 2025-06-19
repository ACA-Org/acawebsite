import { useEffect, useState } from "react";

export const useImisLoginUrl = () => {
  const [imisLoginUrl, setImisLoginUrl] = useState<string>("");

  useEffect(() => {
    const imisLoginUrl = process.env.NEXT_PUBLIC_IMIS_LOGIN_URL;
    const redirectUrl = `${window.location.origin}/api/imis`;

    setImisLoginUrl(
      `${imisLoginUrl}?redirect_uri=${encodeURIComponent(redirectUrl)}`
    );
  }, []);

  return imisLoginUrl;
};

