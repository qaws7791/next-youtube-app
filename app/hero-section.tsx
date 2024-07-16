"use client";
import siteConfig from "@/config/site-config";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="mb-8">
      <motion.h1
        className="text-5xl font-bold my-8 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {siteConfig.title}
      </motion.h1>
      <motion.p
        className="text-xl font-semibold text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
      >
        {siteConfig.description}
      </motion.p>
    </div>
  );
}
