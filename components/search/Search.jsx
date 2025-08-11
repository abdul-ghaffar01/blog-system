"use client";

import useSearchStore from "@/stores/useSearchStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Search() {
    const { searching, setSearching } = useSearchStore();

    return (
        <AnimatePresence>
            {searching && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSearching(false)}
                        className="fixed inset-0 bg-black z-40"
                    />

                    {/* Modal container */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-1/2 left-1/2 z-50 max-w-4xl w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface p-6 shadow-lg"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSearching(false)}
                            className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
                            aria-label="Close search modal"
                        >
                            ✕
                        </button>

                        {/* Modal content */}
                        <div className="text-foreground space-y-6">
                            <h2 className="text-3xl font-semibold border-b border-border pb-2">
                                Search
                            </h2>

                            {/* Your search input and results go here */}
                            <div className="mt-4">
                                {/* Example input */}
                                <input
                                    type="search"
                                    placeholder="Type to search..."
                                    className="w-full rounded-md border border-border bg-background outline-none px-4 py-2 text-foreground placeholder:text-muted"
                                />
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
