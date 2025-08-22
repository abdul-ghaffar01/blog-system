"use client"

import ElementAccordion from "../ui/admin/ElementAccordion";
import ElementStyleControls from "../ui/admin/ElementStyleControls";

const renderElements = (els, selectedItem, setSelectedItem, refsMap, depth = 0) => {


    return els.map((el, index) => {
        return (
            <div key={`${depth}-${index}`}
                ref={(node) => {
                    if (node) refsMap.current[el.elem.id] = node;
                }}
                className=" h-fit flex mt-2" >

                {/* Vertical line */}
                <div className={`${el.children && el.children.length > 0 ? "w-px" : "w-0"} bg-border mr-1`}></div>


                <div className="w-full">


                    {/* Accordion */}
                    <ElementAccordion
                        title={`${el.tag} #${index + 1}`}
                        open={selectedItem?.id === el.elem.id}
                        elementId={el.elem.id}
                        onClick={() => setSelectedItem(el.elem)}
                    >
                        <ElementStyleControls el={el} />
                    </ElementAccordion>

                    {/* children */}
                    <div className="ml-2">
                        {el.children && el.children.length > 0 && (
                            <div className="mt-2">
                                {renderElements(el.children, selectedItem, setSelectedItem, refsMap, depth + 1)}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        );
    });
};

export default renderElements;