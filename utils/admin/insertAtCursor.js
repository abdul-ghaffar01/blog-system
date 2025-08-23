import useAdminStore from "@/stores/useAdminStore";

export function insertAtCursor(html) {
    const editor = useAdminStore.getState().editor;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
        editor.innerHTML += html;
        return;
    }

    const range = sel.getRangeAt(0);

    // ✅ check: selection inside editor
    if (!editor.contains(range.startContainer)) {
        editor.innerHTML += html;
        console.log("Not inside editor");
        return;
    }

    range.deleteContents();
    const temp = document.createElement("div");
    temp.innerHTML = html.trim();
    const node = temp.firstChild;

    range.insertNode(node);

    // ✅ handle cursor placement
    const newRange = document.createRange();
    if (node.nodeName === "IMG" || node.nodeName === "HR" || node.nodeName === "BR") {
        // void elements → place cursor AFTER the node
        newRange.setStartAfter(node);
        newRange.setEndAfter(node);
    } else {
        // normal elements → place cursor INSIDE at end
        newRange.selectNodeContents(node);
        newRange.collapse(false);
    }

    sel.removeAllRanges();
    sel.addRange(newRange);
}
