"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation'; 
import Link from 'next/link';
import { motion, useMotionValue, animate } from "framer-motion";
import { useTranslations } from "next-intl";
import ThemeSwitcher from "./ThemeSwitch";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { Github, Linkedin, Mail } from "lucide-react";
import Background from "./background";
import AnimatedText from "./AnimatedText";
import Loading from "./Loading";

interface ClientLayoutProps { 
  children: React.ReactNode;
}

// Fonction throttle typée correctement
const throttle = <T extends (...args: unknown[]) => unknown>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(this, args);
        timeout = null;
      }, delay);
    }
  };
};

// Configuration centralisée des animations
const animationConfig = {
  // Délais entre les animations (en ms)
  delays: {
    initialDelay: 100,       // Délai avant le début de la séquence
    loadingDuration: 3000,    // Durée du loading
    interfaceDelay: 0,      // Délai avant l'apparition de l'interface
    contentDelay: 300,        // Délai avant l'apparition du contenu
    navbarDelay: 200,         // Délai avant l'apparition des liens de navigation
    backgroundDelay: 500      // Délai avant l'apparition du background 3D
  },
  
  // Durées des animations (en secondes)
  durations: {
    interfaceAnimation: 3,  // Durée de l'animation d'ouverture de l'interface
    contentAnimation: 1,    // Durée de l'animation du contenu
    navbarAnimation: 0.3,     // Durée de l'animation de la navbar
    backgroundAnimation: 1  // Durée de l'animation du background
  },
  
  // Courbes d'accélération
  easings: {
    interface: [0.22, 1, 0.36, 1],
    content: [0.16, 1, 0.3, 1],
    navbar: "easeOut",
    background: "easeOut"
  }
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  // États pour contrôler les animations
  const [loading, setLoading] = useState(true); 
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [interfaceVisible, setInterfaceVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [animationSequenceComplete, setAnimationSequenceComplete] = useState(false);
  const [startLoading, setStartLoading] = useState(false); 
  
  // Autres états
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const t = useTranslations();

  // Détection du mode mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
  
    const handleResize = throttle(() => {
      checkIfMobile();
    }, 200);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Séquence d'animations
  useEffect(() => {
    // Réinitialiser la séquence d'animation si nécessaire
    if (!animationSequenceComplete) {
      // Étape 1: Délai initial avant de commencer les animations
      const initialTimer = setTimeout(() => {
        // Étape 2: Afficher l'interface avec le loading à l'intérieur
        setInterfaceVisible(true);
        
        // Attendre que l'animation de l'interface soit terminée avant de démarrer le loading
        const interfaceAnimationTimer = setTimeout(() => {
          // Démarrer le loading une fois que l'interface est complètement visible
          setStartLoading(true);
        }, animationConfig.durations.interfaceAnimation * 1000); 
        
        return () => clearTimeout(interfaceAnimationTimer);
      }, animationConfig.delays.initialDelay);
      
      return () => clearTimeout(initialTimer);
    }
  }, [animationSequenceComplete]);

  const getTitleInfo = (path: string): { title: string; expressions: string[] } => {
    if (path === '/') {
      return { 
        title: t("home.title"), 
        expressions: [t("home.welcome"), t("home.portfolio"), "ALXS GRMN"] 
      };
    }

    const segments = path.split('/').filter(Boolean); 
    const potentialTitle = segments[0]; 

    if (path === '/404') { 
      return { 
        title: t("notFound.title"), 
        expressions: [t("notFound.page"), t("notFound.not"), t("notFound.found")] 
      };
    }
    
    switch (potentialTitle) {
      case 'work':
        return { 
          title: t("work.title"), 
          expressions: [t("work.projects"), t("work.realizations"), t("work.experiences")] 
        };
      case 'about':
        return { 
          title: t("about.title"), 
          expressions: [t("about.about"), t("about.journey"), t("about.skills")] 
        };
      case 'contact':
        return { 
          title: t("contact.title"), 
          expressions: [t("contact.letsChat"), t("contact.collaborate"), t("contact.contactMe")] 
        };
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

  const checkIfDraggable = (element: HTMLElement | null): boolean => {
    if (!element) return false;
    
    if (element.classList && element.classList.contains('draggable')) {
      return true;
    }
    
    return checkIfDraggable(element.parentElement);
  };

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return; 
    
    const target = e.target as HTMLElement;
    const isDraggableElement = checkIfDraggable(target);
    
    if (!isDraggableElement) {
      e.stopPropagation();
    } else {
      setIsDragging(true);
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour gérer la fin du chargement
  const handleLoadComplete = () => {
    // Au lieu d'ajouter un délai, on fait disparaître immédiatement le loading
    // et on anime simultanément le contenu vers le bas
    setLoading(false);
    
    // Afficher immédiatement le contenu pour que son animation se synchronise
    // avec la disparition du loading
    setContentVisible(true);
    
    // Afficher les liens de navigation après un délai
    setTimeout(() => {
      setShowNavLinks(true);
      
      // Afficher le background 3D en dernier
      setTimeout(() => {
        setBackgroundVisible(true);
        setAnimationSequenceComplete(true);
      }, animationConfig.delays.backgroundDelay);
      
    }, animationConfig.delays.navbarDelay);
  };

  const handleInterfaceAnimationComplete = () => {
    // Démarrer le loading une fois que l'interface est complètement visible
    setStartLoading(true);
  };

  const navLinkVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.05 * i,
        duration: animationConfig.durations.navbarAnimation,
        ease: animationConfig.easings.navbar
      }
    })
  };

  const indicatorVariants = {
    initial: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    active: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const interfaceVariants = {
    hidden: { 
      opacity: 0, 
      scaleY: 0.1,
      scaleX: 0.3,
      transformOrigin: "center center"
    },
    visible: { 
      opacity: 1, 
      scaleY: 1,
      scaleX: 1,
      transition: {
        duration: animationConfig.durations.interfaceAnimation,
        ease: animationConfig.easings.interface,
        scaleY: { 
          duration: animationConfig.durations.interfaceAnimation * 0.6, 
          ease: animationConfig.easings.content
        },
        scaleX: { 
          duration: animationConfig.durations.interfaceAnimation * 0.6, 
          delay: animationConfig.durations.interfaceAnimation * 0.3,
          ease: animationConfig.easings.content
        },
        opacity: { duration: animationConfig.durations.interfaceAnimation * 0.8 }
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: -30 // Commencer au-dessus de sa position finale
    },
    visible: { 
      opacity: 1, 
      y: 0,  
      transition: {
        duration: 0.8, 
        ease: animationConfig.easings.content
      }
    }
  };

  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      y: -200
    },
    visible: { 
      opacity: 1,
      y: 0, 
      transition: {
        duration: animationConfig.durations.backgroundAnimation,
        ease: animationConfig.easings.background
      }
    }
  };

  const loadingExitVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      y: 100, // Descendre vers le bas lors de la sortie
      transition: {
        duration: 0.8, // Augmenter la durée pour qu'elle corresponde à l'animation du contenu
        ease: animationConfig.easings.content // Utiliser la même courbe d'accélération que le contenu
      }
    }
  };

  const mobileMenuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05
      }
    }
  };

  const mobileMenuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const navLinks = [
    { href: "/work", labelKey: "navigation.work" },
    { href: "/about", labelKey: "navigation.about" },
    { href: "/contact", labelKey: "navigation.contact" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-bl from-content-200 to-content-100" ref={constraintsRef}> 
      <motion.div 
        className='absolute h-screen w-screen pointer-events-none z-10'
        variants={backgroundVariants}
        initial="hidden"
        animate={backgroundVisible ? "visible" : "hidden"}
      >   
        <Background />
      </motion.div>

      <div className="fixed inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 divide-x-2 divide-dashed divide-neutral-content pointer-events-none opacity-30">
        {[...Array(11)].map((_, i) => (
          <div key={i} className={`
            ${i >= 2 ? 'hidden sm:block' : ''}
            ${i >= 3 ? 'hidden md:block' : ''}
            ${i >= 5 ? 'hidden lg:block' : ''}
            ${i >= 7 ? 'hidden xl:block' : ''}
            ${i >= 9 ? 'hidden 2xl:block' : ''}
          `}></div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {interfaceVisible && (
          <motion.div 
            className={`relative overflow-hidden z-10 backdrop-blur-md scrollbar-hide shadow-[0px_0px_10px_6px_rgba(0,_0,_0,_0.1)] rounded-2xl
                        ${isMobile ? 'w-[95vw] h-[95vh]' : 'w-[90vw]  h-[90vh]'}`}
            id="interface"
            drag={isDragging && !isMobile}
            dragElastic={0.9}
            whileDrag={{ scale: 1 }}
            style={{ x, y }}
            onPointerDownCapture={handleDragStart}
            dragConstraints={constraintsRef}
            dragMomentum={false}
            variants={interfaceVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={handleInterfaceAnimationComplete}
            onDragEnd={() => {
              setIsDragging(false);
              animate(x, 0, { type: "spring", stiffness: 100, damping: 15 });
              animate(y, 0, { type: "spring", stiffness: 100, damping: 15 });
            }}
            layoutId="interface"
            layout="position"
          >
            <div className="absolute w-full h-3 bottom-0 bg-neutral z-70 draggable link" />
            <div className="absolute h-full w-3 right-0 bg-neutral z-70 draggable link" />
            <div className="absolute h-full w-3 left-0 bg-neutral z-70 draggable link" />
            <div className="absolute w-full h-3 top-0 bg-neutral z-70 draggable link" />
     
            {!isMobile && (
              <div className="absolute top-0 left-0 w-auto h-14 flex items-center justify-between text-sm text-neutral-content bg-neutral py-2 px-4 shadow-[1px_1px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-br-3xl z-60 backdrop-blur-sm">
                <div className="flex items-center space-x-4 pr-4">
                  <Logo />  
                  <Link href="/" className="flex items-center space-x-1 group">
                    <span className={`font-bold text-base text-neutral-content transition-colors duration-200 ${isActive('/') ? 'text-neutral-content' : 'text-base-100'}`}>ALXS</span>
                    <span className={`font-bold text-base text-neutral-content transition-colors duration-200 ${isActive('/') ? 'text-neutral-content' : 'text-base-100'}`}>GRMN</span>
                  </Link>
                </div>
         
                <div className="flex items-center">
                  <AnimatePresence mode="wait">
                    {showNavLinks && (
                      <div className="flex items-center space-x-4">
                        {navLinks.map((link, index) => (
                          <motion.div
                            key={link.href}
                            custom={index}
                            variants={navLinkVariants}
                            initial="hidden"
                            animate="visible"
                            className="relative h-8 flex items-center"
                          >
                              <Link
                                href={link.href}
                                className={`block px-1 text-neutral-content text-sm transition-all duration-200 ${
                                  isActive(link.href)
                                    ? 'font-semibold text-neutral-content'
                                    : 'text-neutral-content'
                                }`}
                              >
                                <div className="w-[70px] text-center">
                                  {link.labelKey ? (
                                    <AnimatedText translationKey={link.labelKey} className="inline-block" />
                                  ) : (
                                    <AnimatedText text={link.labelKey || ""} className="inline-block" />
                                  )}
                                </div>
                              </Link>
                              <motion.div
                                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full"
                                variants={indicatorVariants}
                                initial="initial"
                                animate={isActive(link.href) ? "active" : "initial"}
                              />
                          </motion.div>
                        ))}
                        <motion.div
                          custom={3}
                          variants={navLinkVariants}
                          initial="hidden"
                          animate="visible"
                          className=" flex justify-center"
                        >
                          <LanguageSwitcher />
                        </motion.div>
                        <motion.div
                          custom={4}
                          variants={navLinkVariants}
                          initial="hidden"
                          animate="visible"
                          className=" flex justify-center"
                        >
                          <a className="text-base-content">
                            <ThemeSwitcher />
                          </a>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
            
  
            {isMobile && (
              <>
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between text-sm text-neutral-content bg-neutral py-3 px-4 shadow-[0px_1px_10px_0px_rgba(0,_0,_0,_0.1)] z-60 backdrop-blur-sm ">
                  <div className="flex items-center space-x-2">
                    <Logo />  
                    <Link href="/" className="flex items-center space-x-0.5 group">
                      <span className={`font-bold text-sm text-neutral-content transition-colors duration-200`}>ALXS</span>
                      <span className={`font-bold text-sm text-neutral-content transition-colors duration-200`}>GRMN</span>
                    </Link>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    
                    {showNavLinks && (
                      <button 
                        onClick={toggleMobileMenu} 
                        className="p-1 rounded-md focus:outline-none"
                        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6 text-neutral-content" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          )}
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Menu mobile déroulant */}
                <AnimatePresence mode="wait">
                  {showNavLinks && isMenuOpen && (
                    <motion.div 
                      className="absolute top-full left-0 right-0 bg-neutral shadow-lg rounded-b-lg overflow-hidden z-50"
                      variants={mobileMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <div className="p-4 flex flex-col space-y-3">
                        {navLinks.map((link) => (
                          <motion.div
                            key={link.href}
                            variants={mobileMenuItemVariants}
                            className="relative"
                          >
                            <Link
                              href={link.href}
                              className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                                isActive(link.href)
                                  ? 'bg-neutral-focus text-neutral-content font-medium'
                                  : 'text-neutral-content hover:bg-neutral-focus'
                              }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {link.labelKey ? (
                                <AnimatedText translationKey={link.labelKey} />
                              ) : (
                                <AnimatedText text={link.labelKey || ""} />
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            
            {/* Écran de chargement intégré à l'interface */}
            <AnimatePresence mode="wait">
              {loading && startLoading && (
                <motion.div 
                  className="absolute inset-0 z-50 bg-base-100 flex items-center justify-center"
                  initial="initial"
                  exit="exit"
                  variants={loadingExitVariants}
                >
                  <Loading 
                    duration={animationConfig.delays.loadingDuration / 1000} 
                    onLoadComplete={handleLoadComplete} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className={`w-full h-full overflow-auto scrollbar-hide z-0`}
              variants={contentVariants}
              initial="hidden"
              animate={contentVisible ? "visible" : "hidden"}
            >
                <AnimatePresence mode="wait">
                  <div key={pathname}>
                    {children}
                  </div>
                </AnimatePresence>
            </motion.div>
            
            {/* Barre d'information en bas - Adaptée pour mobile et desktop */}
            <div className={`absolute bottom-0 right-0 w-auto h-14 flex items-center space-x-2 text-neutral-content bg-neutral py-3 px-4 shadow-[-1px_-1px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-tl-3xl z-60 backdrop-blur-sm  ${isMobile ? 'text-xs' : ''}`}>
              <span className={`font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>{title}</span>
              {expressions.length > 0 && !isMobile && <span className="text-sm text-neutral-content">—</span>}
              {!isMobile && (
                <div className="flex items-center space-x-3 ml-2">
                  <a href="https://github.com/alxsgrmn" target="_blank" rel="noopener noreferrer" className="text-neutral-content hover:text-primary transition-colors">
                    <Github size={16} />
                  </a>
                  <a href="https://linkedin.com/in/alxsgrmn" target="_blank" rel="noopener noreferrer" className="text-neutral-content hover:text-primary transition-colors">
                    <Linkedin size={16} />
                  </a>
                  <a href="mailto:contact@alxsgrmn.com" target="_blank" rel="noopener noreferrer" className="text-neutral-content hover:text-primary transition-colors">
                    <Mail size={16} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
