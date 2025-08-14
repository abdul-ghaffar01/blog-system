import uniqueId from "../uniqueId";

export default function handleHeading(val, editor) {
    const tag = `<${val} id="${uniqueId()}">Heading</${val}>`
    console.log(tag)
    editor.innerHTML += tag;

}