import useAdminStore from "@/stores/useAdminStore";
import updatePanels from "./updatePanels";

export const colorOptions = [
  { name: "Background", var: "background" },
  { name: "Foreground", var: "foreground" },
  { name: "Surface", var: "surface" },
  { name: "Primary", var: "primary" },
  { name: "Success", var: "success" },
  { name: "Success Hover", var: "success-hover" },
  { name: "Warning", var: "warning" },
  { name: "Warning Hover", var: "warning-hover" },
  { name: "Danger", var: "danger" },
  { name: "Danger Hover", var: "danger-hover" },
];
export const spacingOptions = [
  "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4",
  "5", "6", "8", "10", "12", "16", "20", "24", "28", "32"
];

export const radiusOptions = [
  "none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"
];




// helper for applying tailwind classes
export const applyClass = (newClass, type) => {
  const node = useAdminStore.getState().selectedItem
  console.log("new class", newClass)
  console.log("type", type)
  // remove previous classes of same type
  node.classList.forEach((cls) => {
    if (cls.startsWith(type)) node.classList.remove(cls);
  });
  // add new class if not empty
  if (newClass) node.classList.add(newClass);
  updatePanels();
};
