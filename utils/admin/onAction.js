import useAdminStore from "@/stores/useAdminStore";
import handleHeading from "./handleHeading";
import handleImage from "./handleImage";
import updatePreview from "./updatePreview";
import handleLink from "./handleLink";

const onAction = (type, val) => {
    const editor = useAdminStore.getState().editor

    if (!editor) return;

    switch (type) {
        case "heading":
            handleHeading(val, editor);
            break;
        case "image":
            handleImage(val, editor)
            break;
        case "link":
            handleLink(val, editor)
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

    useAdminStore.getState().setElements(updatedElements);

    updatePreview()
};

export default onAction;
