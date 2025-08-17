import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";


const ElementStyles = ({ el }) => {
  if (!el || !el.elem) return null;
  const node = el.elem;

  const [openColors, setOpenColors] = useState(true);
  const [customBg, setCustomBg] = useState("#ffffff");

  return (
    <div className="bg-surface rounded-md space-y-4 text-sm">
      <h3 className="text-muted text-sm mb-1">Styles</h3>

      {/* Colors */}

      {/* Margin */}
     

      {/* Padding */}
      

      {/* Border Radius */}
     

    </div>
  );
};

export default ElementStyles;
