import uniqueId from "../uniqueId";
import { insertAtCursor } from "./insertAtCursor";

export default function handleImage(val, editor) {
    const tag = `<img id="${uniqueId()}" src="${val.src}" alt="${val.alt}" />`;
    console.log(tag);
    // editor.innerHTML += tag;
    insertAtCursor(tag)
}
