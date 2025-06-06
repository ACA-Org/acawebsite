import { Breadcrumbs } from "@/components/breadcrumbs";
import { Search } from "./containers/Search";

export default async function Page() {
  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-5 md:mb-28 md:px-8">
        <div>
          <div className="my-8 flex flex-row gap-8 md:my-12 md:gap-16">
            <div className="flex w-full flex-col items-start gap-8">
              <div className="mt-4 flex flex-col gap-8 md:gap-12">
                <Breadcrumbs />
                <h1 className="heading-1 z-20 text-[52px] leading-[70px] font-semibold text-blue-300 max-lg:text-[38px] max-lg:leading-[50px]">
                  Search
                </h1>
              </div>
            </div>
          </div>

          <Search />
        </div>
      </div>
    </div>
  );
}
