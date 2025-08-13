import React from "react";

export default function Table({ item }) {
  if (!item || !item.headers || !item.rows) {
    return null;
  }

  return (
    <div className={`overflow-auto shadow ${item.styles?.join(" ")}`}>
      <table className="min-w-full border-collapse" style={{ border: `1px solid var(--color-border)` }}>
        <thead>
          <tr>
            {item.headers.map((header, idx) => (
              <th
                key={idx}
                className="text-left px-4 py-2"
                style={{ color: "var(--color-foreground)", border: `1px solid var(--color-border)` }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {item.rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-surface transition">
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="px-4 py-2"
                  style={{ color: "var(--color-muted)", border: `1px solid var(--color-border)` }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
