"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: { icon: ReactNode; name: string }[];
  headerTitle: string;
  headerLogoSrc: string;
  imageSrc: string;
}

interface ProjectInfoProps {
  project: Project;
}

// Animation synced with CardSwap timing
const easeOutCustom: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOutCustom,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

const techVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15,
    },
  },
};

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={project.id}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-5"
    >
      <motion.h3
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold text-base-content"
      >
        {project.title}
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="text-base md:text-lg text-base-content/70 leading-relaxed"
      >
        {project.description}
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
        {project.technologies.map((tech, i) => (
          <motion.div
            key={`${project.id}-${tech.name}-${i}`}
            variants={techVariants}
            className="flex items-center gap-2 text-base-content/80 hover:text-base-content transition-colors"
            title={tech.name}
          >
            <span className="text-2xl">{tech.icon}</span>
            <span className="text-sm font-medium hidden sm:inline">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

export default ProjectInfo;
