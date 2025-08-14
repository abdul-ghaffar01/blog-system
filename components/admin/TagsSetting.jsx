"use client";
import React, { useEffect } from "react";
import useAdminStore from "@/stores/useAdminStore";
import ElementAccordion from "../ui/admin/ElementAccordion";
import ElementStyleControls from "../ui/admin/ElementStyleControls";

const TagsSetting = () => {
  const { elements, selectedItem } = useAdminStore();

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <h2 className="text-lg font-semibold p-2 bg-background">Elements</h2>

      {elements.map((el, index) => (
        <ElementAccordion
          key={index}
          title={`${el.tag} #${index + 1}`}
          open={selectedItem?.id === el.elem.id}
          elementId={el.elem.id}
        >
          <ElementStyleControls elementIndex={index} />
        </ElementAccordion>
      ))}
    </div>
  );
};

export default TagsSetting;
