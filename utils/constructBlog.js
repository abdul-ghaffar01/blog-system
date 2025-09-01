import React from "react";
import getItem from "./getItem";

export default function constructBlog(items) {
  return Array.isArray(items) && items.map((item, index) => (
    <React.Fragment key={item.id || index}>
      {getItem(item, index)}
    </React.Fragment>
  ));
}
