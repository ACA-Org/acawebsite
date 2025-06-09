import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `Table`.
 */
export type TableProps = SliceComponentProps<Content.TableSlice>;

/**
 * Component for "Table" Slices.
 */
const Table: FC<TableProps> = ({ slice }) => {
  const { tableData } = slice.primary;

  if (!tableData) return null;

  const { head, body } = tableData;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {head && (
              <thead className="bg-gray-50">
                <tr>
                  {head.rows?.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="body-md px-6 py-4 text-left font-medium text-blue-300"
                    >
                      <PrismicRichText field={header.cells[0].content} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-gray-200 bg-white">
              {body.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="body-md px-6 py-4 whitespace-nowrap text-gray-600"
                    >
                      <PrismicRichText field={cell.content} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Table;
