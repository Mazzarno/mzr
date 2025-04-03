"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AnimatedText from "@/components/AnimatedText";
import { redirectTo404 } from "@/utils/redirects";

// Animation variants
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

// Liste des projets (normalement, cela viendrait d'une API ou d'une base de données)
const projects = [
  {
    id: 1,
    title: "Portfolio Minimaliste",
    description: "Design et développement d'un portfolio épuré pour un photographe",
    category: "Web Design",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    image: "/medias/project1.jpg",
    year: "2023",
    client: "Studio Photographie",
    duration: "2 mois",
    role: "Designer & Développeur Frontend",
    link: "https://example.com",
    details: "Ce projet consistait à créer un portfolio minimaliste et élégant pour un photographe professionnel. L'accent a été mis sur la mise en valeur des photographies avec une interface utilisateur épurée et des animations subtiles pour améliorer l'expérience utilisateur."
  },
  {
    id: 2,
    title: "Application Web E-commerce",
    description: "Interface utilisateur moderne pour une boutique en ligne",
    category: "Développement",
    tags: ["React", "Redux", "Node.js"],
    image: "/medias/project2.jpg",
    year: "2023",
    client: "Boutique Mode",
    duration: "4 mois",
    role: "Développeur Full Stack",
    link: "https://example.com",
    details: "Développement d'une plateforme e-commerce complète avec gestion des produits, panier d'achat, paiement sécurisé et interface d'administration pour le client."
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Tableau de bord interactif avec visualisations de données",
    category: "UI/UX",
    tags: ["TypeScript", "D3.js", "Firebase"],
    image: "/medias/project3.jpg",
    year: "2022",
    client: "Entreprise Tech",
    duration: "3 mois",
    role: "UI/UX Designer & Développeur Frontend",
    link: "https://example.com",
    details: "Conception et développement d'un tableau de bord analytique permettant de visualiser et d'analyser les données d'entreprise de manière interactive et intuitive."
  },
  {
    id: 4,
    title: "Refonte Site Corporate",
    description: "Modernisation complète de l'identité web d'une entreprise",
    category: "Branding",
    tags: ["WordPress", "GSAP", "Figma"],
    image: "/medias/project4.jpg",
    year: "2022",
    client: "Entreprise Conseil",
    duration: "5 mois",
    role: "Designer & Développeur WordPress",
    link: "https://example.com",
    details: "Refonte complète de l'identité visuelle et du site web d'une entreprise de conseil, incluant la création d'un nouveau logo, la définition d'une charte graphique et le développement d'un site WordPress sur mesure."
  },
  {
    id: 5,
    title: "Application Mobile Fitness",
    description: "Interface intuitive pour suivre ses activités sportives",
    category: "UI/UX",
    tags: ["React Native", "Firebase", "Figma"],
    image: "/medias/project5.jpg",
    year: "2021",
    client: "Startup Fitness",
    duration: "6 mois",
    role: "UI/UX Designer & Développeur Mobile",
    link: "https://example.com",
    details: "Conception et développement d'une application mobile permettant aux utilisateurs de suivre leurs activités sportives, de définir des objectifs et de visualiser leurs progrès."
  },
  {
    id: 6,
    title: "Plateforme Éducative",
    description: "Système de gestion de cours en ligne avec espace interactif",
    category: "Développement",
    tags: ["Vue.js", "Express", "MongoDB"],
    image: "/medias/project6.jpg",
    year: "2021",
    client: "Institut de Formation",
    duration: "8 mois",
    role: "Développeur Full Stack",
    link: "https://example.com",
    details: "Développement d'une plateforme éducative complète permettant la gestion de cours en ligne, l'inscription des étudiants, le suivi des progrès et l'interaction entre formateurs et apprenants."
  }
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const t = useTranslations();
  const projectId = parseInt(params.id);
  const project = projects.find(p => p.id === projectId);
  
  // Rediriger vers la page 404 si le projet n'existe pas
  useEffect(() => {
    if (!project) {
      redirectTo404();
    }
  }, [project]);

  // Si le projet n'existe pas, on retourne null (la redirection sera effectuée par useEffect)
  if (!project) {
    return null;
  }

  return (
    <main className="text-base-content relative min-h-screen py-16">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/3 to-secondary/3"></div>
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Fil d'Ariane */}
          <motion.div variants={fadeIn} custom={0} className="mb-8">
            <nav className="flex items-center text-sm text-base-content/60">
              <Link href="/" className="hover:text-primary transition-colors">
                <AnimatedText translationKey="navigation.home" />
              </Link>
              <span className="mx-2">/</span>
              <Link href="/work" className="hover:text-primary transition-colors">
                <AnimatedText translationKey="navigation.work" />
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary">{project.title}</span>
            </nav>
          </motion.div>
          
          {/* En-tête du projet */}
          <motion.div variants={fadeIn} custom={1} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-base-content/70 max-w-3xl">{project.description}</p>
          </motion.div>
          
          {/* Image principale du projet */}
          <motion.div 
            variants={fadeIn} 
            custom={2} 
            className="mb-16 rounded-2xl overflow-hidden shadow-xl shadow-base-300/20"
          >
            <Image 
              src={project.image} 
              alt={project.title} 
              width={1200}
              height={675}
              className="w-full h-auto object-cover aspect-video"
            />
          </motion.div>
          
          {/* Informations du projet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <motion.div variants={fadeIn} custom={3} className="col-span-2">
              <h2 className="text-2xl font-bold mb-6">
                <AnimatedText translationKey="about.about" /> {t("work.projects")}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p>{project.details}</p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} custom={4} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3 text-primary">
                  <AnimatedText translationKey="work.client" />
                </h3>
                <p>{project.client}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-primary">
                  <AnimatedText translationKey="work.role" />
                </h3>
                <p>{project.role}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-primary">
                  <AnimatedText translationKey="work.duration" />
                </h3>
                <p>{project.duration}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-primary">
                  <AnimatedText translationKey="work.technologies" />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 bg-base-200 text-xs rounded-full font-medium border border-base-300/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-block"
                >
                  <AnimatedText translationKey="work.viewLive" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation entre projets */}
          <motion.div 
            variants={fadeIn} 
            custom={5} 
            className="border-t border-base-300/30 pt-8 flex justify-between items-center"
          >
            {projectId > 1 ? (
              <Link 
                href={`/work/${projectId - 1}`} 
                className="flex items-center text-base-content hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                <AnimatedText translationKey="work.projects" /> {t("navigation.previous")}
              </Link>
            ) : (
              <div></div>
            )}
            
            {projectId < projects.length ? (
              <Link 
                href={`/work/${projectId + 1}`} 
                className="flex items-center text-base-content hover:text-primary transition-colors"
              >
                <AnimatedText translationKey="work.projects" /> {t("navigation.next")}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </Link>
            ) : (
              <div></div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
