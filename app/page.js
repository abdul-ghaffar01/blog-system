"use client"
import Hero from "@/components/home/Hero";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

export default function Home() {
  "use client";

  const [open, setOpen] = useState(false);

  return (<>
    <Hero />
  </>
  );
}
