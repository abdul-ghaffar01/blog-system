import getTypeFromTag from "../getTypeFromTag.js";

export default function extractItems(editor) {
  if (!editor) return [];

  function extractInlineContent(node) {
    let content = [];

    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.textContent.trim() !== "" || /\s/.test(child.textContent)) {
          content.push(child.textContent);
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();
        const styles = child.className ? child.className.split(" ") : [];
        const typeInfo = getTypeFromTag(tag);

        content.push({
          ...typeInfo,
          styles,
          children: extractInlineContent(child)
        });
      }
    });

    return content;
  }

  function extractElement(el) {
    const tag = el.tagName?.toLowerCase?.();
    if (!tag) return null;

    const styles = el.className ? el.className.split(" ") : [];
    const typeInfo = getTypeFromTag(tag);

    // Handle specific block types
    if (typeInfo.type === "heading") {
      return {
        ...typeInfo,
        styles,
        children: extractInlineContent(el)
      };
    }
    if (typeInfo.type === "paragraph") {
      return {
        ...typeInfo,
        styles,
        children: extractInlineContent(el)
      };
    }
    if (typeInfo.type === "bold" || typeInfo.type === "italic" || typeInfo.type === "underline") {
      return {
        ...typeInfo,
        styles,
        children: extractInlineContent(el)
      };
    }
    if (typeInfo.type === "quote") {
      return {
        ...typeInfo,
        author: el.getAttribute("data-author") || "",
        styles,
        children: extractInlineContent(el)
      };
    }
    if (typeInfo.type === "list") {
      return {
        ...typeInfo,
        styles,
        items: Array.from(el.querySelectorAll(":scope > li")).map(li => extractInlineContent(li))
      };
    }
    if (typeInfo.type === "link") {
      return {
        ...typeInfo,
        href: el.getAttribute("href"),
        target: el.target,
        rel: el.rel,
        styles,
        children: extractInlineContent(el)
      };
    }
    if (typeInfo.type === "image") {
      return {
        ...typeInfo,
        src: el.getAttribute("src"),
        alt: el.getAttribute("alt") || "",
        styles
      };
    }
    if (typeInfo.type === "code") {
      return {
        ...typeInfo,
        language: el.className.replace("language-", ""),
        code: el.innerText,
        styles
      };
    }
    if (typeInfo.type === "table") {
      const headers = Array.from(el.querySelectorAll("thead th")).map(th => th.innerText);
      const rows = Array.from(el.querySelectorAll("tbody tr")).map(tr =>
        Array.from(tr.querySelectorAll("td")).map(td => td.innerText)
      );

      return {
        ...typeInfo,
        styles,
        headers,
        rows
      };
    }

    // Default fallback: keep inline children
    return {
      ...typeInfo,
      styles,
      children: extractInlineContent(el)
    };
  }

  function extractChildren(parent) {
    return Array.from(parent.children)
      .map(child => extractElement(child))
      .filter(Boolean);
  }

  const extractedChildren = extractChildren(editor);
  return extractedChildren;
}
