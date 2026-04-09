"use client";

import { useState, useEffect } from "react";
import { addMonths } from "date-fns";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CalendarHeader from "@/components/CalendarHeader";
import CalendarGrid from "@/components/CalendarGrid";
import NotesPanel from "@/components/NotesPanel";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(1);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") setDark(true);
    else if (saved === "light") setDark(false);
    else setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const changeMonth = (dir: number) => {
    setDirection(dir);
    setCurrentDate(addMonths(currentDate, dir));
  };

  const monthImages: Record<number, string> = {
    0: "/images/jan.jpg",
    1: "/images/feb.jpg",
    2: "/images/mar.jpg",
    3: "/images/apr.jpg",
    4: "/images/may.jpg",
    5: "/images/jun.jpg",
    6: "/images/jul.jpg",
    7: "/images/aug.jpg",
    8: "/images/sep.jpg",
    9: "/images/oct.jpg",
    10: "/images/nov.jpg",
    11: "/images/dec.jpg",
  };

  // 🔥 TILT EFFECT
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-200, 200], [8, -8]));
  const rotateY = useSpring(useTransform(x, [-200, 200], [-8, 8]));

  return (
    <div className="
      app-bg min-h-screen
      flex justify-center items-start
      px-2 sm:px-6
      py-4 sm:py-8
    ">

      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="
          w-full
          max-w-sm
          sm:max-w-xl
          md:max-w-3xl
          lg:max-w-5xl
          xl:max-w-6xl
        "
      >

        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-2xl dark:bg-blue-500/20" />

          <div className="
            relative
            bg-white dark:bg-[#0f172a]
            text-gray-900 dark:text-white
            rounded-2xl shadow-2xl
            card-border
            w-full
            overflow-hidden flex flex-col
          ">

            {/* HERO */}
            <motion.div
              key={currentDate.getMonth()}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              className="relative h-40 sm:h-56 md:h-64 w-full"
            >
              <img
                src={monthImages[currentDate.getMonth()]}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              {/* THEME BUTTON */}
              <button
                onClick={() => setDark(prev => !prev)}
                className="
                  absolute top-3 right-3 sm:top-4 sm:right-4
                  flex items-center gap-2 px-3 py-1.5 rounded-full
                  text-xs sm:text-sm
                  bg-white/90 dark:bg-zinc-800/90
                  border border-gray-200 dark:border-blue-500/30
                  shadow-md backdrop-blur
                  hover:scale-105 active:scale-95
                  transition-all duration-200
                "
              >
                {dark ? "☀️ Light" : "🌙 Dark"}
              </button>

              {/* TEXT */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white text-right">
                <p className="text-xs sm:text-sm">{currentDate.getFullYear()}</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  {currentDate.toLocaleString("default", { month: "long" })}
                </h1>
              </div>
            </motion.div>

            {/* CONTENT */}
            <div className="p-3 sm:p-6 flex flex-col gap-4 sm:gap-6">
              <CalendarHeader
                currentDate={currentDate}
                onPrev={() => changeMonth(-1)}
                onNext={() => changeMonth(1)}
              />

              <CalendarGrid currentDate={currentDate} direction={direction} />

              <NotesPanel />
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
