import useAdminStore from "@/stores/useAdminStore";
import extractItems from "./extractItems";

export default function updatePreview() {
    const editor = useAdminStore.getState().editor
    extractItems(editor)

    // Extract fresh content after action for preview
    const extracted = extractItems(editor);
    useAdminStore.getState().setItems(extracted);
}