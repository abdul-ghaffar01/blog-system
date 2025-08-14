import useAdminStore from "@/stores/useAdminStore";

export default function updateTagsPanel() {
    const editor = useAdminStore.getState().editor

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
}