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
        heading1: ({ children }) => <h1 className="heading-1">{children}</h1>,
        heading2: ({ children }) => (
          <h2 className="heading-2 text-blue-200">{children}</h2>
        ),
        heading3: ({ children }) => <h3 className="heading-3">{children}</h3>,
        heading4: ({ children }) => <h4 className="heading-4">{children}</h4>,
        heading5: ({ children }) => <h5 className="heading-5">{children}</h5>,
        heading6: ({ children }) => <h6 className="heading-6">{children}</h6>,
        paragraph: ({ children, text }) => {
          if (text === "-----")
            return <div className="w-full h-0.5 bg-gray-300" />;
          return <p className="body-md text-gray-100">{children}</p>;
        },
        list: ({ children }) => (
          <ul className="list-disc list-inside">{children}</ul>
        ),

        hyperlink: ({ node, children }) => {
          if (node.data.link_type === "Web") {
            return (
              <a
                href={node.data.url}
                target={node.data.target}
                className="text-blue-200 underline visited:text-blue-400 hover:text-blue-300"
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
