"use client";
import React, { useState } from "react";
import { Link, Image } from "lucide-react";
import onAction from "@/utils/admin/onAction";
import Modal from "@/components/ui/Modal";

export default function MediaButtons() {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isImageModalOpen, seIsImageModalOpen] = useState(false);
  const [message, setMessage] = useState("")
  const [linkText, setLinkText] = useState("");
  const [href, setHref] = useState("");
  const [target, setTarget] = useState("_self");
  const [rel, setRel] = useState("");
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");

  const handleLink = () => {
    setIsLinkModalOpen(true)
  }

  const handleImage = () => {
    seIsImageModalOpen(true)
  }

  const closeModals = () => {
    // closing both modals don't wanna write separate functions as they are useless
    setIsLinkModalOpen(false);
    seIsImageModalOpen(false);
    setMessage("")
  }

  const addLinkToAction = (e) => {
    e.preventDefault()
    const val = { href, target, rel, text: linkText }
    if (!href || !target || !linkText) {
      setMessage("Please fill all required fields")
      return;
    }
    onAction("link", val);
    closeModals();
    setHref("")
    setTarget("_blank")
    setRel("")
  }

  const addImageToAction = (e) => {
    e.preventDefault()
    const val = { src, alt }
    if (!src || !alt) {
      setMessage("Please fill all required fields")
      return;
    }
    onAction("image", val);
    closeModals();
    setSrc("")
    setAlt("")
  }

  return (
    <>
      <button onClick={handleLink} title="Add Link" className="p-2 hover:bg-background rounded transition">
        <Link size={18} />
      </button>
      <button onClick={handleImage} title="Add Image" className="p-2 hover:bg-background rounded transition">
        <Image size={18} />
      </button>
      <Modal isOpen={isLinkModalOpen} onClose={closeModals}>
        <div className="bg-[var(--surface)] rounded-xl w-full max-w-md ">
          <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">
            Link Attributes
          </h2>
          <p className="text-danger">{message}</p>
          <form
            onSubmit={addLinkToAction}
            className="space-y-4"
          >
            {/* Text */}
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">
                Text
              </label>
              <input
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Anything"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Href */}
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">
                Href
              </label>
              <input
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Target */}
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">
                Target
              </label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="_self">_self</option>
                <option value="_blank">_blank</option>
              </select>
            </div>

            {/* Rel */}
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">
                Rel
              </label>
              <input
                value={rel}
                onChange={(e) => setRel(e.target.value)}
                placeholder="noopener noreferrer"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModals}
                className="px-4 py-2 rounded-lg bg-[var(--danger)] text-white hover:bg-[var(--danger-hover)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal isOpen={isImageModalOpen} onClose={closeModals}>
        <div className="bg-[var(--surface)]  w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-[var(--foreground)]">
            Image Attributes
          </h2>
          <p className="text-danger">{message}</p>
          <form
            onSubmit={addImageToAction}
            className="space-y-4"
          >
            {/* Src */}
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">
                Src
              </label>
              <input
                value={src}
                onChange={(e) => setSrc(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Alt */}
            <div>
              <label className="block text-sm font-medium text-[var(--muted)] mb-1">
                Alt
              </label>
              <input
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="Description of the image"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModals}
                className="px-4 py-2 rounded-lg bg-[var(--danger)] text-white hover:bg-[var(--danger-hover)] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
