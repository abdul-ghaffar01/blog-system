import uniqueId from "../uniqueId";

export default function handleHeading(val, editor) {
    const tag = `<${val} id="${uniqueId()}">Type something here...</${val}>`
    editor.innerHTML += tag;

}