import useAdminStore from "@/stores/useAdminStore";
import handleHeading from "./handleHeading";
import extractItems from "./extractItems";

const onAction = (type, val, editor) => {
    console.log("Came to onAction");

    if (!editor) return;

    switch (type) {
        case "heading":
            handleHeading(val, editor);
            break;
        default:
            return;
    }

    // After action, update store with current editor elements
    const updatedElements = Array.from(editor.querySelectorAll("*")).map((el) => ({
        tag: el.tagName.toLowerCase(),
        styles: {
            color: el.style.color || "",
            fontSize: el.style.fontSize || "",
            backgroundColor: el.style.backgroundColor || ""
        },
        content: el.innerText,
        elem: el
    }));

    console.log("updated elements", updatedElements)
    useAdminStore.getState().setElements(updatedElements);

    // Extract fresh content after action for preview
    const extracted = extractItems(editor);
    useAdminStore.getState().setItems(extracted);
};

export default onAction;
