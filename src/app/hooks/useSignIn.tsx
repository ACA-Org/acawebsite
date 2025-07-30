import { useEffect, useState } from "react";

export const useSignIn = () => {
  const [imisLoginUrl, setImisLoginUrl] = useState<string>("");

  useEffect(() => {
    const imisLoginUrl = process.env.NEXT_PUBLIC_IMIS_LOGIN_URL;
    setImisLoginUrl(imisLoginUrl || "");
  }, []);

  const signIn = () => {
    // Store current page URL in a cookie that expires in 5 minutes
    const currentPage = window.location.href;
    document.cookie = `redirectUrl=${encodeURIComponent(currentPage)};max-age=300;path=/`;
    const loginUrl = new URL(imisLoginUrl);
    loginUrl.searchParams.set("ReturnUrl", currentPage);
    window.location.href = loginUrl.toString();
  };

  return { signIn, imisLoginUrl };
};
