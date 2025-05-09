import { Breadcrumbs } from "@/components/breadcrumbs";
import { Search } from "./containers/Search";
import { HydrationBoundary } from "jotai-ssr";
import { getSearchData } from "../actions/getSearchData";
import { pageInfoAtom } from "../atoms/pageInfoAtom";

export default async function Page() {
  const pageData = await getSearchData();

  return (
    <HydrationBoundary hydrateAtoms={[[pageInfoAtom, pageData]]}>
      <div className="flex w-full flex-col">
        <div className="mx-auto mb-28 flex w-full max-w-[1440px] flex-col px-4 md:px-8">
          <div>
            <div className="my-12 flex flex-row gap-16">
              <div className="flex w-full flex-col items-start gap-12 max-md:gap-8">
                <div className="mt-4 flex flex-col gap-12">
                  <Breadcrumbs />
                  <h1 className="heading-1 z-20 font-semibold text-blue-300">
                    Search
                  </h1>
                </div>
              </div>
            </div>

            <Search />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}

