interface TableProps {
  header: string[];
  row: { [key: string]: any }[];
  footer?: { [key: string]: any }[];
}

export default function Table({ header, row, footer }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border ">
      <table className="min-w-full divide-y ">
        {/* Table Head */}
        <thead className="">
          <tr>
            {header.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-sm font-semibold  uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className=" divide-y ">
          {row.map((r, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-colors duration-150"
            >
              {header.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm ">
                  {r[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* Table Footer */}
        {footer && (
          <tfoot className="">
            {footer.map((f, rowIndex) => (
              <tr key={rowIndex}>
                {header.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-3 text-sm font-medium "
                  >
                    {f[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </div>
  );
}