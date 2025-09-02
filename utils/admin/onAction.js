import useAdminStore from "@/stores/useAdminStore";
import handleHeading from "./handleHeading";
import handleImage from "./handleImage";
import updatePreview from "./updatePreview";
import handleLink from "./handleLink";
import handleCode from "./handleCode";
import updateTagsPanel from "./updateTagsPanel";
import handleList from "./handleList";
import handleTable from "./handleTable";

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
        case "code":
            handleCode(val, editor)
            break;
        case "list":
            handleList(val, editor)
            break;
        case "table":
            handleTable(val, editor)
            break;
        case "box":
            handleBox(val, editor)
            break;
        default:
            return;
    }

    updateTagsPanel();
    updatePreview()
};

export default onAction;
