"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function NotesPanel() {
  const [notes, setNotes] = useLocalStorage("notes", "");
  const [tempNotes, setTempNotes] = useState(notes);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(true);

  const handleSave = () => {
    setNotes(tempNotes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => {
    setTempNotes(notes);
  }, [notes]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-zinc-700">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        
        {/* NOTES TOGGLE */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-sm font-semibold text-gray-600 cursor-pointer select-none"
        >
          NOTES
          
          {/* ROTATING ARROW */}
          <motion.span
            animate={{ rotate: open ? 0 : -90 }}
            transition={{ duration: 0.25 }}
            className="text-xs"
          >
            ▾
          </motion.span>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 cursor-pointer active:scale-95
            ${saved 
              ? "bg-green-500 text-white" 
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          {saved ? "Saved ✓" : "Save"}
        </button>
      </div>

      {/* COLLAPSIBLE CONTENT */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <textarea
  value={tempNotes}
  onChange={(e) => setTempNotes(e.target.value)}
  placeholder="Write your notes here..."
  className="
    w-full rounded-xl p-4
    bg-white/90 dark:bg-zinc-900/80
    border border-gray-200 dark:border-blue-500/40
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-blue-500
    neon
  "
  rows={4}
/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}