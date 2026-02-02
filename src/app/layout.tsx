import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getFooterData, getHeaderData } from "./actions/getLayoutData";
import Header from "@/components/header";
import { MenuItemSlice } from "../../prismicio-types";
import Footer, { FooterProps } from "@/components/footer";
import { gillSans } from "./fonts/GillSans";
import CacheProvider from "react-inlinesvg/provider";
import { getOptimizedPathMap, PathMapData } from "./actions/getPathMap";
import { HydrationBoundary } from "jotai-ssr";
import { pathMapAtom } from "./atoms/pathMapAtom";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { ViewTransitions } from "next-view-transitions";
import { Providers } from "./components/Providers";
import Script from "next/script";

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
  let pathMapData: PathMapData = {};

  const fetchFooterInfo = async () => {
    try {
      footerInfo = await getFooterData();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHeaderInfo = async () => {
    try {
      const result = await getHeaderData();

      headerInfo = result?.data || null;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPathMap = async () => {
    try {
      pathMapData = await getOptimizedPathMap();
    } catch (err) {
      console.error("[Layout] Error fetching path map:", err);
    }
  };

  await Promise.allSettled([
    fetchFooterInfo(),
    fetchHeaderInfo(),
    fetchPathMap(),
  ]);

  return (
    <ViewTransitions>
      <html lang="en" className="w-screen overflow-x-clip">
        <body
          className={`${gillSans.variable} [font-family:GillSans] antialiased`}
        >
          <Providers>
            <HydrationBoundary hydrateAtoms={[[pathMapAtom, pathMapData]]}>
              <CacheProvider>
                {headerInfo && <Header data={headerInfo} />}
              </CacheProvider>
              <div className="mt-17 md:mt-24">{children}</div>
              {footerInfo && <Footer data={footerInfo} />}
            </HydrationBoundary>
          </Providers>
          <Analytics />
          <div id="google_translate_element" style={{ display: "none" }} />
          <Script id="google-translate-init" strategy="afterInteractive">
            {`function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false,
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}`}
          </Script>
          <Script
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />
        </body>
        <GoogleAnalytics gaId="G-ND0DBVWRNR" />
        <PrismicPreview repositoryName={repositoryName} />
      </html>
    </ViewTransitions>
  );
}
