interface TableProps {
  header: string[];
  row: { [key: string]: React.ReactNode }[];
  footer?: { [key: string]: React.ReactNode }[];
}
export default function Table({ header, row, footer }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md border transition-all duration-300">
      <table className="min-w-full divide-y max-h-[500px]">
        {/* Table Head */}
        <thead className="">
          <tr>
            {header.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="lg:px-6 px-2 py-3 text-center text-[10px] lg:text-sm font-semibold  uppercase tracking-wider transition-all duration-300"
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
                <td key={colIndex} className="lg:px-6 px-2 py-3 text-center text-[10px] lg:text-sm transition-all duration-300 ">
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
                    className="lg:px-6 px-2 py-3 text-center text-[10px] lg:text-sm font-medium transition-all duration-300 "
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
