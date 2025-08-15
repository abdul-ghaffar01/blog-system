import useAdminStore from "@/stores/useAdminStore";

function getElementTree(el) {
    return {
        tag: el.tagName.toLowerCase(),
        styles: {
            color: el.style.color || "",
            fontSize: el.style.fontSize || "",
            backgroundColor: el.style.backgroundColor || ""
        },
        content: el.innerText,
        elem: el,
        children: Array.from(el.children).map(getElementTree) // recursive call for children
    };
}

export default function updateTagsPanel() {
    const editor = useAdminStore.getState().editor;

    const updatedElements = Array.from(editor.children).map(getElementTree);

    console.log("Elements tree", updatedElements)
    useAdminStore.getState().setElements(updatedElements);
}
