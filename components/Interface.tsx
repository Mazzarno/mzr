"use client";

import { ReactNode } from "react";
import Link from 'next/link'; 

import ThemeSwitcher from "@/components/ThemeSwitch";
import Logo from "@/components/Logo";
import { motion, useMotionValue, animate } from "framer-motion";

interface InterfaceProps {
  children: ReactNode;
  pathname: string; 
}

export default function Interface({ children, pathname }: InterfaceProps) {

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const getTitleInfo = (path: string): { title: string; expressions: string[] } => {

     if (path === '/') {
       return { title: "ACCUEIL", expressions: ["Bienvenue", "Portfolio", "ALXS GRMN"] };
     }

    const segments = path.split('/').filter(Boolean); 
    const potentialTitle = segments[0]; 

    if (path === '/404') { 
        return { title: "404", expressions: ["Page", "Non", "Trouvée"] };
    }
    switch (potentialTitle) {
        case 'work':
            return { title: "WORK", expressions: ["Projets", "Réalisations", "Expériences"] };
        case 'about':
            return { title: "ABOUT", expressions: ["À Propos", "Parcours", "Compétences"] };
        case 'contact':
            return { title: "CONTACT", expressions: ["Échangeons", "Collaborons", "Contactez-moi"] };
        default:
            return { title: "Page", expressions: ["Contenu", "Actuel", path] };
    }
  };

  const { title, expressions } = getTitleInfo(pathname);

  const isActive = (href: string) => {
      if (href === '/') {
          return pathname === '/';
      }
      return pathname.startsWith(href);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-content-200 to-content-100"> 
      <div className="fixed inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 divide-x-2 divide-dashed divide-neutral-content pointer-events-none opacity-30">
     
        {[...Array(11)].map((_, i) => (
          <div key={i} className={
            `
            ${i >= 2 ? 'hidden sm:block' : ''}
            ${i >= 3 ? 'hidden md:block' : ''}
            ${i >= 5 ? 'hidden lg:block' : ''}
            ${i >= 7 ? 'hidden xl:block' : ''}
            ${i >= 9 ? 'hidden 2xl:block' : ''}
            `
          }></div>
        ))}
      </div>

      <motion.div className="relative w-[90vw] h-[90vh] rounded-2xl shadow-[0px_0px_10px_6px_rgba(0,_0,_0,_0.1)] overflow-hidden z-10 backdrop-blur-md "
              drag
              dragElastic={0.5}
              whileDrag={{ scale: 1 }}
              style={{ x, y }}
              onDragEnd={() => {
                animate(x, 0, { type: "spring", stiffness: 150, damping: 15 });
                animate(y, 0, { type: "spring", stiffness: 150, damping: 15 });
              }}
      >
        <div className="absolute w-full h-3 bottom-0 bg-neutral z-20" />
        <div className="absolute h-full w-3 right-0 bg-neutral z-20" />
        <div className="absolute h-full w-3 left-0 bg-neutral z-20" />
        <div className="absolute w-full h-3 top-0 bg-neutral z-20" />

        <div className="absolute top-0 left-0 flex items-center space-x-4 text-sm text-neutral-content bg-neutral py-3 px-5 shadow-[1px_1px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-br-3xl z-30 backdrop-blur-sm">
          {/* Logo/Nom */}
          <Logo />  
          <Link href="/" className="flex items-center space-x-0.5 group">
             <span className={`font-bold text-base text-neutral-content transition-colors duration-200 ${isActive('/') ? 'text-neutral-content' : 'text-base-100'}`}>ALXS</span>
             <span className={`font-bold text-base text-neutral-content transition-colors duration-200 ${isActive('/') ? 'text-neutral-content' : 'text-base-100'}`}>GRMN</span>
          </Link>
   
          {[
            { href: "/work", label: "Work" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline text-neutral-content text-base transition-all duration-200 link ${
                isActive(link.href)
                  ? 'font-semibold text-neutral-content underline underline-offset-4'
                  : 'text-base hover:text-neutral-content'
              }`}
            >
              {link.label}
            </Link>
          ))}        
                    <a className="text-base-content">
                  <ThemeSwitcher />
                </a>
       
        </div>

        <div className="w-full h-full overflow-auto pt-20 pb-16 px-8 md:px-12 lg:px-16 z-0">
          {children}
        </div>

        <div className="absolute bottom-0 right-0 flex items-center space-x-2 text-sm text-neutral-content bg-neutral py-3 px-5 shadow-[-1px_-1px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-tl-3xl z-30 backdrop-blur-sm">
          <span className="font-bold text-base">{title}</span>
           {expressions.length > 0 && <span className="text-base text-neutral-content">—</span>}
    
          {expressions.map((exp, index) => (
            <span key={index} className="text-base text-neutral-content">{exp}</span>
          ))}
        </div>
      </motion.div> 
    </div> 
  );
}
