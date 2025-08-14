import uniqueId from "../uniqueId";

export default function handleLink(val, editor) {
    // val should be like: { href: "https://example.com", text: "Click me" }
    const tag = `<a id="${uniqueId()}" href="${val.href}" target="${val.target}" rel="noopener noreferrer">${val.text}</a>`;
    console.log(tag);
    editor.innerHTML += tag;
}
