"use client";
import React, { useEffect, useState } from "react";
import { Bold, Italic, Underline, Code } from "lucide-react";
import onAction from "@/utils/admin/onAction";
import useAdminStore from "@/stores/useAdminStore";
import updatePreview from "@/utils/admin/updatePreview";
import Modal from "@/components/ui/Modal";

export default function FormattingButtons() {
  const { selectedItem } = useAdminStore();
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)
  const [language, setLanguage] = useState("Select a language");
  const [code, setCode] = useState("");

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

  const handleCode = () => {
    setIsCodeModalOpen(true)
  }

  const insertCode = (e) => {
    e.preventDefault()
    const val = { language, code }
    onAction("code", val)
    setIsCodeModalOpen(false)
    setLanguage("Select a language")
    setCode("")
  }

  const closeModal = () => {
    setIsCodeModalOpen(false)
  }
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
      <button onClick={handleCode} title="Code" className="p-2 hover:bg-background rounded transition">
        <Code size={18} />
      </button>
      <Modal isOpen={isCodeModalOpen} onClose={closeModal}>
        <form
          onSubmit={insertCode}
          className="space-y-4 p-4 bg-surface text-foreground"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <select
              name="language"
              className="w-full border rounded px-3 py-2 bg-background text-foreground border border-border outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a language
              </option>
              <option value="bash">Bash</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
              <option value="go">Go</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>

          <div className="">
            <label className="block text-sm font-medium mb-1">Code</label>
            <textarea
              name="code"
              rows="6"
              className="w-full border rounded px-3 py-2 font-mono bg-background outline-none border-border border"
              placeholder="Enter your code here..."
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
