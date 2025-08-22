import React from "react";

export default function Table({ item }) {
  console.log(item)
  if (!item || !item.headers || !item.rows) {
    return null;
  }

  return (
    <div className={`overflow-auto shadow ${item.styles?.join(" ")}`}>
      <table className="min-w-full border-collapse" style={{ border: `1px solid var(--border)` }}>
        <thead>
          <tr>
            {item.headers.map((header, idx) => (
              <th
                key={idx}
                className="text-left px-2 py-2"
                style={{ color: "var(--foreground)", border: `1px solid var(--border)` }}
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
                  className="px-2 py-2"
                  style={{ color: "var(--muted)", border: `1px solid var(--border)` }}
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
