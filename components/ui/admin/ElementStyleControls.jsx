
import AddClasses from "./element-controls/AddClasses";
import RemoveUpDownBtns from "./element-controls/RemoveUpDownBtns";

const ElementStyleControls = ({ el }) => {


  return (
    <div className="space-y-2 bg-background p-2 rounded">
      {/* Buttons: Remove, Up, Down */}
      <RemoveUpDownBtns el={el} />      

      <AddClasses el={el} />
    </div>
  );
};

export default ElementStyleControls;
