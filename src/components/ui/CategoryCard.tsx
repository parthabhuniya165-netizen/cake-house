"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  className?: string;
  colorClass?: string;
}

export const CategoryCard = ({
  icon: Icon,
  title,
  className,
  colorClass = "bg-primary-container/20 text-primary",
}: CategoryCardProps) => {
  return (
    <Link href="/#menu" className="block">
      <motion.div
        whileHover={{ y: -4, backgroundColor: "rgba(199, 1, 85, 0.05)" }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "bg-surface-container-lowest p-6 rounded-xl flex flex-col items-center justify-center text-center gap-3 shadow-sm border border-surface-container-highest/50 transition-all duration-300 cursor-pointer h-full",
          className
        )}
      >
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", colorClass)}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="font-bold text-[10px] text-on-surface tracking-widest uppercase">{title}</span>
      </motion.div>
    </Link>
  );
};
