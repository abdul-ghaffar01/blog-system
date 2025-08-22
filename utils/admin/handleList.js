import uniqueId from "../uniqueId";

export default function handleList(val, editor) {
  // val = { type: "ul" | "ol", items: ["Item 1", "Item 2", ...] }

  const listTag = val.type === "ol" ? "ol" : "ul";

  const listItems = (val.items || [])
    .map(item => `<li id="${uniqueId()}">${item}</li>`)
    .join("");

  const tag = `<${listTag} id="${uniqueId()}">${listItems}</${listTag}>`;

  console.log(tag);
  editor.innerHTML += tag;
}
