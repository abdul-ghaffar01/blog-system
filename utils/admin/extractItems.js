export default function extractItems(editor) {
  if (!editor) return [];

  const elements = Array.from(editor.children);

  const extracted = elements
    .map((el) => {
      const tag = el.tagName.toLowerCase();
      const styles = el.className ? el.className.split(" ") : [];

      if (tag.startsWith("h")) {
        return {
          type: "heading",
          level: Number(tag.replace("h", "")),
          text: el.innerText,
          styles,
        };
      }

      if (tag === "p") {
        return {
          type: "paragraph",
          text: el.innerText,
          styles,
        };
      }

      if (tag === "img") {
        return {
          type: "image",
          src: el.getAttribute("src"),
          alt: el.getAttribute("alt") || "",
          styles,
        };
      }

      if (tag === "pre" && el.querySelector("code")) {
        return {
          type: "code",
          language: el
            .querySelector("code")
            .className.replace("language-", ""),
          code: el.querySelector("code").innerText,
          styles: null,
        };
      }

      if (tag === "blockquote") {
        return {
          type: "quote",
          text: el.innerText,
          author: el.getAttribute("data-author") || "",
          styles,
        };
      }

      if (tag === "ul" || tag === "ol") {
        return {
          type: "list",
          list_type: tag === "ul" ? "unordered" : "ordered",
          items: Array.from(el.querySelectorAll("li")).map(
            (li) => li.innerText
          ),
          styles,
        };
      }

      if (tag === "a") {
        return {
          type: "link",
          href: el.getAttribute("href"),
          text: el.innerText,
          styles,
        };
      }

      if (tag === "div" && el.dataset.type === "box") {
        return {
          type: "box",
          styles,
          items: [], // can make recursive later
        };
      }

      if (tag === "table") {
        const headers = Array.from(el.querySelectorAll("thead th")).map(
          (th) => th.innerText
        );
        const rows = Array.from(el.querySelectorAll("tbody tr")).map((tr) =>
          Array.from(tr.querySelectorAll("td")).map((td) => td.innerText)
        );

        return {
          type: "table",
          styles,
          headers,
          rows,
          items: [],
        };
      }

      return null;
    })
    .filter(Boolean);

  return extracted;
}
