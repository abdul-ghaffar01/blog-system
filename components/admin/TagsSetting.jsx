"use client";
import React, { useEffect } from "react";
import useAdminStore from "@/stores/useAdminStore";
import ElementAccordion from "../ui/admin/ElementAccordion";
import ElementStyleControls from "../ui/admin/ElementStyleControls";

const TagsSetting = () => {
  const { elements, selectedItem } = useAdminStore();

  useEffect(() => {
    console.log("rendered elems", elements)
    if(elements[0])
    console.log("cking", elements[0].elem.id)

  }, [elements]);

  return (
    <div className="w-full h-full overflow-y-auto bg-background">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>

      {elements.map((el, index) => (
        <ElementAccordion
          key={index}
          title={`${el.tag} #${index + 1}`}
          open={selectedItem?.id === el.elem.id}
          elementId={el.id}
        >
          <ElementStyleControls elementIndex={index} />
        </ElementAccordion>
      ))}
    </div>
  );
};

export default TagsSetting;
