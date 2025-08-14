"use client";
import React, { useEffect } from "react";
import { Bold, Italic, Underline, Code } from "lucide-react";
import onAction from "@/utils/admin/onAction";
import useAdminStore from "@/stores/useAdminStore";
import updatePreview from "@/utils/admin/updatePreview";

export default function FormattingButtons() {
  const { selectedItem } = useAdminStore();

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (e) => {
      // Check if the selectedItem is focused
      if (document.activeElement !== selectedItem) return;

      if (e.ctrlKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        makeBold();
      }
      if (e.ctrlKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        makeItalic();
      }
      if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        makeUnderline();
      }
      updatePreview();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const makeBold = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const strong = document.createElement("strong");

    // Wrap selected text in <strong>
    strong.appendChild(range.extractContents());
    range.insertNode(strong);

    // Insert an empty text node after <strong> to break bold effect
    const textNode = document.createTextNode("\u200B"); // zero-width space
    strong.parentNode.insertBefore(textNode, strong.nextSibling);

    // Move caret after the new text node
    range.setStartAfter(textNode);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };
  const makeItalic = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const em = document.createElement("em");

    em.appendChild(range.extractContents());
    range.insertNode(em);

    // Add zero-width space after italic text
    const textNode = document.createTextNode("\u200B");
    em.parentNode.insertBefore(textNode, em.nextSibling);

    // Move caret after the space
    range.setStartAfter(textNode);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const makeUnderline = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const u = document.createElement("u");

    u.appendChild(range.extractContents());
    range.insertNode(u);

    // Add zero-width space after underline text
    const textNode = document.createTextNode("\u200B");
    u.parentNode.insertBefore(textNode, u.nextSibling);

    // Move caret after the space
    range.setStartAfter(textNode);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <>
      <button onClick={makeBold} title="Bold" className="p-2 hover:bg-background rounded transition">
        <Bold size={18} />
      </button>
      <button onClick={makeItalic} title="Italic" className="p-2 hover:bg-background rounded transition">
        <Italic size={18} />
      </button>
      <button onClick={makeUnderline} title="Underline" className="p-2 hover:bg-background rounded transition">
        <Underline size={18} />
      </button>
      <button onClick={() => onAction("code")} title="Code" className="p-2 hover:bg-background rounded transition">
        <Code size={18} />
      </button>
    </>
  );
}
