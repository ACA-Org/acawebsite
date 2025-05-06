import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

export default function PageRichText({
  content,
}: {
  content: RichTextField | null | undefined;
}) {
  return (
    <PrismicRichText
      field={content}
      components={{
        heading1: ({ children }) => (
          <h1 className="heading-1 mt-8 mb-6">{children}</h1>
        ),
        heading2: ({ children }) => (
          <h2 className="heading-2 mt-7 mb-5 text-blue-200">{children}</h2>
        ),
        heading3: ({ children }) => (
          <h3 className="heading-3 mt-6 mb-4">{children}</h3>
        ),
        heading4: ({ children }) => (
          <h4 className="heading-4 mt-5 mb-3">{children}</h4>
        ),
        heading5: ({ children }) => (
          <h5 className="heading-5 mt-4 mb-3">{children}</h5>
        ),
        heading6: ({ children }) => (
          <h6 className="heading-6 mt-3 mb-2">{children}</h6>
        ),
        paragraph: ({ children, text }) => {
          if (text === "-----")
            return <div className="my-6 h-[1px] w-full bg-gray-100" />;
          return (
            <p className="body-md mb-4 leading-relaxed text-gray-100">
              {children}
            </p>
          );
        },
        list: ({ children }) => (
          <ul className="mb-4 list-inside list-disc space-y-2">{children}</ul>
        ),
        listItem: ({ children }) => <li className="ml-4">{children}</li>,
        hyperlink: ({ node, children }) => {
          if (node.data.link_type === "Web") {
            return (
              <a
                href={node.data.url}
                target={node.data.target}
                className="text-blue-200 underline transition-colors duration-200 visited:text-blue-400 hover:text-blue-300"
              >
                {children}
              </a>
            );
          }
        },
      }}
    />
  );
}
