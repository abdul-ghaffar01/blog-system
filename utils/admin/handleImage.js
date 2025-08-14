import uniqueId from "../uniqueId";

export default function handleImage(val, editor) {
    const tag = `<img id="${uniqueId()}" src="${val.src}" alt="${val.alt}" />`;
    console.log(tag);
    editor.innerHTML += tag;
}
