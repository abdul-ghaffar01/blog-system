import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const menuItems = {
    File: ["New", "Open", "Save", "Save As", "Exit"],
    Edit: ["Undo", "Redo", "Cut", "Copy", "Paste"],
    View: ["Zoom In", "Zoom Out", "Fullscreen"],
    Insert: ["Image", "Table", "Link"],
    Format: ["Bold", "Italic", "Underline", "Align Left", "Align Right"],
    Tools: ["Spelling", "Word Count"],
    Help: ["Documentation", "About"],
  };

  return (
    <div className="w-full h-fit bg-background border-b border-border p-1 relative">
      <ul className="flex gap-1 text-muted">
        {Object.keys(menuItems).map((menu, idx) => (
          <div
            key={idx}
            className="relative"
            onMouseEnter={() => setOpenMenu(menu)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            {/* Menu Button */}
            <div className="flex items-center gap-1 text-sm hover:bg-surface hover:text-foreground px-3 py-1 rounded-md cursor-pointer select-none">
              {menu}
              <ChevronDown size={14} className="opacity-60" />
            </div>

            {/* Dropdown */}
            {openMenu === menu && (
              <ul className="absolute left-0 top-full mt-1 w-40 bg-surface border border-border rounded-md shadow-lg z-50">
                {menuItems[menu].map((item, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 text-sm text-foreground hover:bg-background cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
