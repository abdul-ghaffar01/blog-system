"use client";
import React, { useState, useRef } from "react";

export default function ThreePanelLayout({ left, center, right }) {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(300); // default left panel
  const [rightWidth, setRightWidth] = useState(300); // default right panel
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const startDragLeft = () => setIsDraggingLeft(true);
  const startDragRight = () => setIsDraggingRight(true);

  const stopDrag = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const onDrag = (e) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    if (isDraggingLeft) {
      let newLeft = e.clientX;
      if (newLeft < 100) newLeft = 100; // min width
      if (newLeft > containerWidth - rightWidth - 100)
        newLeft = containerWidth - rightWidth - 100;
      setLeftWidth(newLeft);
    }
    if (isDraggingRight) {
      let newRight = containerWidth - e.clientX;
      if (newRight < 100) newRight = 100;
      if (newRight > containerWidth - leftWidth - 100)
        newRight = containerWidth - leftWidth - 100;
      setRightWidth(newRight);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex w-full h-full bg-red-400 "
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* Left Panel */}
      <div
        className="bg-background shadow-md overflow-y-auto overflow-x-hidden"
        style={{ width: leftWidth }}
      >
        {left}
      </div>

      {/* Left Resizer */}
      <div
        className={`w-1 cursor-col-resize ${isDraggingLeft ? "bg-foreground" : "bg-border"}`}
        onMouseDown={startDragLeft}
      />

      {/* Center Panel */}
      <div className="flex-1 bg-background overflow-y-auto overflow-x-hidden">{center}</div>

      {/* Right Resizer */}
      <div
        className={`w-1 cursor-col-resize ${isDraggingRight ? "bg-foreground" : "bg-border"}`}
        onMouseDown={startDragRight}
      />

      {/* Right Panel */}
      <div
        className="bg-background shadow-md overflow-y-auto overflow-x-hidden"
        style={{ width: rightWidth }}
      >
        {right}
      </div>
    </div>
  );
}
