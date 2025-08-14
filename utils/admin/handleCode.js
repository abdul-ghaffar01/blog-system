import uniqueId from "../uniqueId";

export default function handleCode(val, editor) {
    // val should be like: { href: "https://example.com", text: "Click me" }
    const tag = `<pre id="${uniqueId()}" class="language-${val.language}" >${val.code}</pre>`;
    console.log(tag);
    editor.innerHTML += tag;
}
