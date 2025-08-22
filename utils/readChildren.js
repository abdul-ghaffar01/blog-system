import React from "react";
import getItem from "./getItem";

export default function readChildren(children, returnTag) {
  if (!children) return null;

  const Tag = returnTag || React.Fragment;

  // Ensure it's always an array
  const normalized = Array.isArray(children) ? children : [children];

  return normalized.map((child, index) => {
    if (typeof child === "string") {
      return <Tag key={index}>{child}</Tag>;
    } else if (typeof child === "object" && child !== null) {
      return <Tag key={child.id || index}>{getItem(child)}</Tag>;
    }
    return null;
  });
}
