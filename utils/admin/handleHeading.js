import uniqueId from "../uniqueId";
import { insertAtCursor } from "./insertAtCursor";

export default function handleHeading(val) {
    const tag = `<${val} id="${uniqueId()}">Type something here...</${val}>`
    insertAtCursor(tag)

}