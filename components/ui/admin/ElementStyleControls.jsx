"use client";
import { useState } from "react";
import AddClasses from "./element-controls/AddClasses";
import RemoveUpDownBtns from "./element-controls/RemoveUpDownBtns";
import Alignment from "./element-controls/Alignment"; // I added since you referenced it
import SearchBox from "./element-controls/SearchBox";
import Attributes from "./element-controls/Attributes";
import ElementStyles from "./element-controls/ElementStyles";

const ElementStyleControls = ({ el }) => {
  const [query, setQuery] = useState("");

  // all available controls
  const controls = [
    { name: "remove / up / down", component: <RemoveUpDownBtns el={el} /> },
    { name: "add classes", component: <AddClasses el={el} /> },
    { name: "alignment", component: <Alignment el={el} /> },
    { name: "attributes", component: <Attributes el={el} /> },
    { name: "styles", component: <ElementStyles el={el} /> },
  ];

  // filter based on query
  const filteredControls = query
    ? controls.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : controls;

  return (
    <div className="space-y-3 bg-surface p-2 rounded">
      {/* Search box */}
      <SearchBox query={query} setQuery={setQuery} />

      {/* Render controls */}
      <div className="space-y-2">
        {filteredControls.length > 0 ? (
          filteredControls.map((c, i) => (
            <div key={i} >
              {c.component}
              <hr className="text-border my-3"/>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground p-2">No controls found</p>
        )}
      </div>
    </div>
  );
};

export default ElementStyleControls;
