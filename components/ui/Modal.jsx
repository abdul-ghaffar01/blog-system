"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Background overlay */}
                    <div
                        className="absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 w-full max-w-lg p-6 bg-surface rounded-xl shadow-lg border border-border"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-background transition"
                        >
                            <X size={20} />
                        </button>

                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
