import { Search } from "lucide-react";

export default function DataTable({ columns, rows, searchTerm, onSearchChange, searchPlaceholder = "Search…", emptyLabel = "No records found." }) {
  return (
    <div className="card-surface overflow-hidden">
      <div className="flex items-center gap-3 border-b border-ink/[0.06] px-5 py-4">
        <div className="relative w-full max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-ink/15 bg-alabaster py-2 pl-9 pr-4 text-sm text-ink placeholder:text-ink-faint/60 focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100"
          />
        </div>
        <span className="ml-auto text-xs text-ink-faint">{rows.length} result{rows.length === 1 ? "" : "s"}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/[0.06] text-xs uppercase tracking-wide text-ink-faint">
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3 font-semibold">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-14 text-center text-sm text-ink-faint">
                  {emptyLabel}
                </td>
              </tr>
            )}
            {rows.map((row, i) => (
              <tr key={row.id || i} className="border-b border-ink/[0.04] last:border-0 hover:bg-alabaster-dim/60">
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-4 align-middle">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
