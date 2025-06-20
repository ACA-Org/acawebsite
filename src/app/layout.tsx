import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getFooterData, getHeaderData } from "./actions/getLayoutData";
import Header from "@/components/header";
import { MenuItemSlice } from "../../prismicio-types";
import Footer, { FooterProps } from "@/components/footer";
import { gillSans } from "./fonts/GillSans";
import CacheProvider from "react-inlinesvg/provider";
import { getSearchData, PageData } from "./actions/getSearchData";
import { HydrationBoundary } from "jotai-ssr";
import { pageInfoAtom } from "./atoms/pageInfoAtom";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ViewTransitions } from "next-view-transitions";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userAtom } from "./atoms/userAtom";

export const viewport: Viewport = {
  themeColor: "#0F2D52",
};

export const metadata: Metadata = {
  title: "ACA - American Correctional Association",
  description:
    "For more than 152 years, the American Correctional Association has championed the cause of corrections and correctional effectiveness.",
  metadataBase: new URL("https://aca.org"),
  openGraph: {
    title: "ACA - American Correctional Association",
    description:
      "For more than 152 years, the American Correctional Association has championed the cause of corrections and correctional effectiveness.",
    url: "https://aca.org",
    type: "website",
    images: [
      {
        url: "https://images.prismic.io/acawebsite/Z_vG-uvxEdbNO-jG_aca-og.png?auto=format,compress&rect=0,0,1200,630&w=2400&h=1260",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACA - American Correctional Association",
    description:
      "For more than 152 years, the American Correctional Association has championed the cause of corrections and correctional effectiveness.",
    images: [
      {
        url: "https://images.prismic.io/acawebsite/Z_vG-uvxEdbNO-jG_aca-og.png?auto=format,compress&rect=0,0,1200,630&w=2400&h=1260",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let footerInfo: FooterProps | null = null;
  let headerInfo: MenuItemSlice[] | null = null;
  let pagesInfo: PageData[] | null = null;
  let userInfo: User | null = null;

  const fetchFooterInfo = async () => {
    console.time("fetchFooterInfo");
    try {
      footerInfo = await getFooterData();
    } catch (err) {
      console.error(err);
    }
    console.timeEnd("fetchFooterInfo");
  };

  const fetchHeaderInfo = async () => {
    console.time("fetchHeaderInfo");
    try {
      const result = await getHeaderData();

      headerInfo = result?.data || null;
    } catch (err) {
      console.error(err);
    }
    console.timeEnd("fetchHeaderInfo");
  };

  const fetchPagesInfo = async () => {
    console.time("fetchPagesInfo");
    try {
      const pageData = await getSearchData();

      pagesInfo = pageData || null;
    } catch (err) {
      console.error(err);
    }
    console.timeEnd("fetchPagesInfo");
  };

  const fetchUserInfo = async () => {
    console.time("fetchUserInfo");
    const session = await getServerSession(authOptions);
    userInfo = session?.user || null;
    console.timeEnd("fetchUserInfo");
  };

  await Promise.allSettled([
    fetchFooterInfo(),
    fetchHeaderInfo(),
    fetchPagesInfo(),
    fetchUserInfo(),
  ]);

  return (
    <ViewTransitions>
      <html lang="en" className="w-screen overflow-x-clip">
        <body
          className={`${gillSans.variable} [font-family:GillSans] antialiased`}
        >
          <HydrationBoundary
            hydrateAtoms={[
              [pageInfoAtom, pagesInfo || []],
              [userAtom, userInfo],
            ]}
          >
            <CacheProvider>
              {headerInfo && <Header data={headerInfo} />}
            </CacheProvider>
            <div className="mt-17">{children}</div>
            {footerInfo && <Footer data={footerInfo} />}
          </HydrationBoundary>
        </body>
        <GoogleAnalytics gaId="G-ND0DBVWRNR" />
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    </ViewTransitions>
  );
}
