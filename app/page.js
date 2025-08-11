"use client"
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

export default function Home() {
  "use client";

  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <h2 className="text-xl font-semibold mb-2">Card Title</h2>
        <p className="text-muted mb-4">This is some card content.</p>
        <Button
        className="bg-red-500"
        onClick={() => setOpen(true)}>Open Modal</Button>
        
      </Card>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
        <p className="text-muted">This is the modal content.</p>
      </Modal>
    </div>
  );
}
