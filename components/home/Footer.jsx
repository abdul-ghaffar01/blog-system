"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/navbar/Logo";
import { Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Blogs", href: "/blogs" },
        { name: "Categories", href: "/categories" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const socials = [
        { name: "Github", icon: Github, href: "https://github.com/abdul-ghaffar01" },
        { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/i_abdul_ghaffar" },
        { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/abdul-ghaffar01/" },
    ];

    return (
        <footer
            style={{
                background: "var(--surface)",
                color: "var(--muted)",
                borderTop: "1px solid var(--border)",
            }}
            className="mt-16"
        >
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Left - Logo + About */}
                <div>
                    <Logo />
                    <p className="mt-4 text-sm leading-relaxed">
                        Your go-to platform for the latest blogs, insights, and trends.
                        Stay informed, inspired, and ahead of the curve.
                    </p>
                </div>

                {/* Middle - Navigation */}
                <div>
                    <h4
                        className="text-lg font-semibold mb-4"
                        style={{ color: "var(--foreground)" }}
                    >
                        Quick Links
                    </h4>
                    <ul className="space-y-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    target="_blank"
                                    className="hover:text-[var(--primary)] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right - Socials */}
                <div>
                    <h4
                        className="text-lg font-semibold mb-4"
                        style={{ color: "var(--foreground)" }}
                    >
                        Follow Us
                    </h4>
                    <div className="flex gap-4">
                        {socials.map(({ name, icon: Icon, href }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div
                className="text-center text-xs py-4"
                style={{
                    borderTop: "1px solid var(--border)",
                    color: "var(--muted)",
                }}
            >
                © {new Date().getFullYear()} IAbdulGhaffar. All rights reserved.
            </div>
        </footer>
    );
}
