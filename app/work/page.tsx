"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import AnimatedText from "@/app/components/AnimatedText";

// Types pour les projets
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  year: string;
}

// Animation variants pour les éléments qui apparaissent
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

// Animation pour les cartes de projet
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
  hover: { 
    y: -12, 
    scale: 1.03, 
    boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Animation pour les tags
const tagVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2 } }
};

// Catégories de projets
const categories = ["Tous", "Web Design", "Développement", "UI/UX", "Branding"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  // Liste des projets
  const projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Minimaliste",
      description: "Design et développement d'un portfolio épuré pour un photographe",
      category: "Web Design",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
      image: "/medias/project1.jpg",
      year: "2023"
    },
    {
      id: 2,
      title: "Application Web E-commerce",
      description: "Interface utilisateur moderne pour une boutique en ligne",
      category: "Développement",
      tags: ["React", "Redux", "Node.js"],
      image: "/medias/project2.jpg",
      year: "2023"
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Tableau de bord interactif avec visualisations de données",
      category: "UI/UX",
      tags: ["TypeScript", "D3.js", "Firebase"],
      image: "/medias/project3.jpg",
      year: "2022"
    },
    {
      id: 4,
      title: "Refonte Site Corporate",
      description: "Modernisation complète de l'identité web d'une entreprise",
      category: "Branding",
      tags: ["WordPress", "GSAP", "Figma"],
      image: "/medias/project4.jpg",
      year: "2022"
    },
    {
      id: 5,
      title: "Application Mobile Fitness",
      description: "Interface intuitive pour suivre ses activités sportives",
      category: "UI/UX",
      tags: ["React Native", "Firebase", "Figma"],
      image: "/medias/project5.jpg",
      year: "2021"
    },
    {
      id: 6,
      title: "Plateforme Éducative",
      description: "Système de gestion de cours en ligne avec espace interactif",
      category: "Développement",
      tags: ["Vue.js", "Express", "MongoDB"],
      image: "/medias/project6.jpg",
      year: "2021"
    }
  ];

  // Filtrer les projets par catégorie
  const filteredProjects = activeCategory === "Tous" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <main className="text-base-content relative min-h-screen">
      <WorkHeader />
      <div className="container mx-auto px-6 relative z-10">
        <ProjectFilters 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        <ProjectGrid projects={filteredProjects} />
      </div>
      <WorkContact />
      
      {/* Éléments décoratifs de fond */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-secondary/5 blur-[100px]"></div>
        <div className="absolute top-2/3 right-1/2 w-72 h-72 rounded-full bg-accent/5 blur-[100px]"></div>
      </div>
    </main>
  );
}

const WorkHeader: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-4xl"
        >
          <motion.div 
            variants={fadeIn} 
            custom={0}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 backdrop-blur-sm border border-primary/20"
          >
            <AnimatedText translationKey="work.title" />
          </motion.div>
          
          <motion.h1
            variants={fadeIn}
            custom={1}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            <AnimatedText translationKey="work.selectedWorks" />
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            custom={2}
            className="text-xl text-base-content/70 max-w-2xl mt-6 leading-relaxed"
          >
            <AnimatedText translationKey="work.discover" />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      custom={3}
      className="flex flex-wrap gap-3 mb-20"
    >
      {categories.map((category: string) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
            activeCategory === category
              ? "bg-primary text-primary-content shadow-lg shadow-primary/20 border border-primary/30"
              : "bg-base-200/80 text-base-content/70 hover:bg-base-300 border border-base-300/50 hover:border-base-300"
          }`}
        >
          {category}
        </button>
      ))}
    </motion.div>
  );
};

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </motion.div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      variants={fadeIn}
      custom={index}
      whileHover="hover"
      className="group"
    >
      <motion.div 
        variants={cardVariants}
        className="bg-base-100/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-base-200 h-full flex flex-col shadow-sm transition-all duration-300"
      >
        <div className="h-64 bg-base-300 relative overflow-hidden">
          {/* Image placeholder - remplacer par une vraie image */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
          <div className="absolute top-0 right-0 bg-base-100/70 backdrop-blur-md px-4 py-1.5 m-4 rounded-full text-xs font-medium border border-base-200/50">
            {project.year}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-bold text-white/10 group-hover:text-white/20 transition-all duration-500 ease-out transform group-hover:scale-125 opacity-70">
              {project.id}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-2xl group-hover:text-primary transition-colors duration-300">{project.title}</h3>
            <span className="text-xs px-4 py-1.5 bg-secondary/10 rounded-full text-secondary font-medium border border-secondary/20">
              {project.category}
            </span>
          </div>
          <p className="text-base-content/70 text-base mb-6 flex-1 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <motion.span 
                key={tag} 
                className="px-3 py-1.5 bg-base-200/80 text-xs rounded-full font-medium border border-base-300/50"
                variants={tagVariants}
                whileHover="hover"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <Link 
            href={`/work/${project.id}`} 
            className="text-primary font-medium flex items-center gap-1 mt-auto group-hover:gap-3 transition-all duration-300 py-2"
          >
            <span>Voir les détails</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WorkContact: React.FC = () => {
  return (
    <section className="py-32 bg-base-200/50 backdrop-blur-sm relative overflow-hidden border-t border-base-300/30">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeIn} custom={0} className="space-y-8">
            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              <AnimatedText translationKey="contact.collaborate" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <AnimatedText translationKey="contact.project" />
            </h2>
            <p className="text-base-content/70 text-xl max-w-2xl mx-auto leading-relaxed">
              <AnimatedText translationKey="contact.open" />
            </p>
            
            <motion.div 
              className="pt-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href="/contact" 
                className="btn btn-primary btn-lg px-10 py-3 h-auto rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all text-base"
              >
                <AnimatedText translationKey="contact.contactMe" />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
