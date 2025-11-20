interface TableProps {
  header: string[];
  row: { [key: string]: React.ReactNode }[];
  footer?: { [key: string]: React.ReactNode }[];
}
export default function Table({ header, row, footer }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border">
      <table className="min-w-full divide-y max-h-full">
        {/* Table Head */}
        <thead className="">
          <tr>
            {header.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="lg:px-6 px-2 py-3 text-center text-[10px] lg:text-sm font-semibold  uppercase tracking-wider"
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
                <td key={colIndex} className="lg:px-6 px-2 py-3 text-center text-[10px] lg:text-sm ">
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
                    className="lg:px-6 px-2 py-3 text-center text-[10px] lg:text-sm font-medium "
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