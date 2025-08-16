import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const colorOptions = [
  { name: "Background", var: "--background" },
  { name: "Foreground", var: "--foreground" },
  { name: "Surface", var: "--surface" },
  { name: "Primary", var: "--primary" },
  { name: "Success", var: "--success" },
  { name: "Success Hover", var: "--success-hover" },
  { name: "Warning", var: "--warning" },
  { name: "Warning Hover", var: "--warning-hover" },
  { name: "Danger", var: "--danger" },
  { name: "Danger Hover", var: "--danger-hover" },
];

const ElementStyles = ({ el }) => {
  if (!el || !el.elem) return null;
  const node = el.elem;

  const [openColors, setOpenColors] = useState(true);
  const [customColor, setCustomColor] = useState("#000000");
  const [customBg, setCustomBg] = useState("#ffffff");

  const applyColor = (color, target = "color") => {
    node.style[target] = color;
  };

  const applySpacing = (side, type, value) => {
    node.style[`${type}-${side}`] = value ? `${value}px` : "";
  };

  return (
    <div className="bg-surface rounded-md space-y-4 text-sm">
      <h3 className="text-muted text-sm mb-1">Styles</h3>

      {/* Colors */}

      <div>
        {/* Text color */}
        <p className="text-xs text-muted mb-1">Text Color</p>
        <div className="flex items-center gap-2 mb-3">
          <select
            onChange={(e) => applyColor(e.target.value, "color")}
            className="flex-1 bg-background rounded px-2 py-1 text-foreground text-sm focus:outline-none"
          >
            <option value="">Select color</option>
            {colorOptions.map(({ name, var: cssVar }) => {
              const colorValue = getComputedStyle(
                document.documentElement
              ).getPropertyValue(cssVar).trim();
              return (
                <option key={`text-${name}`} value={colorValue}>
                  {name}
                </option>
              );
            })}
          </select>

          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              applyColor(e.target.value, "color");
            }}
            className="w-10 h-8 cursor-pointer rounded"
          />
        </div>


        {/* Background color */}
        <p className="text-xs text-muted mb-1">Background Color</p>
        <div className="flex items-center gap-2 mb-3">
          <select
            onChange={(e) => applyColor(e.target.value, "backgroundColor")}
            className="flex-1 bg-background rounded px-2 py-1 text-foreground text-sm focus:outline-none"
          >
            <option value="">Select background</option>
            {colorOptions.map(({ name, var: cssVar }) => {
              const colorValue = getComputedStyle(
                document.documentElement
              ).getPropertyValue(cssVar).trim();
              return (
                <option key={`bg-${name}`} value={colorValue}>
                  ● {name} {/* using dot to represent color */}
                </option>
              );
            })}
          </select>

          <input
            type="color"
            value={customBg}
            onChange={(e) => {
              setCustomBg(e.target.value);
              applyColor(e.target.value, "backgroundColor");
            }}
            className="w-10 h-8 cursor-pointer rounded"
          />
        </div>
      </div>

      {/* Spacing */}
      <div >
        {/* Margin row */}
        <div className="flex items-center gap-2 mb-3">
          <p className="text-xs text-muted mb-1 w-16">Margin</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {["Top", "Right", "Bottom", "Left"].map((side) => (
              <div key={`m-${side}`}>
                <label className="text-xs text-muted block">{side}</label>
                <input
                  type="number"
                  placeholder="px"
                  className="w-full bg-background rounded px-2 py-1 text-foreground text-sm focus:outline-none"
                  onChange={(e) =>
                    applySpacing(side.toLowerCase(), "margin", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Padding row */}
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted mb-1 w-16">Padding</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {["Top", "Right", "Bottom", "Left"].map((side) => (
              <div key={`p-${side}`}>
                <label className="text-xs text-muted block">{side}</label>
                <input
                  type="number"
                  placeholder="px"
                  className="w-full bg-background rounded px-2 py-1 text-foreground text-sm focus:outline-none"
                  onChange={(e) =>
                    applySpacing(side.toLowerCase(), "padding", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementStyles;
