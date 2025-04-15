"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./components/AnimatedText";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  hover: { 
    y: -12, 
    scale: 1.03, 
    boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3, ease: "easeInOut" } 
  }
};

export default function HomePage() {
  return (
    <main className="text-base-content relative">
      <HeroSection />
      <FeaturedProjects />
      <AboutPreview />
      <ContactSection />
    </main>
  );
}

const HeroSection = () => {
  return (
    <section className="min-h-screen min-w-screen flex flex-col justify-center  overflow-hidden">
      <div className="container ">
        <motion.div
          initial="hidden"
          animate="visible"
     
        >
          <motion.div 
            variants={fadeIn} 
            custom={0}
            className="inline-block px-5 py-2 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10 text-primary text-sm font-medium mb-2"
          >
            <AnimatedText translationKey="home.designer" animated={false} />
          </motion.div>
          
          <motion.h1
            variants={fadeIn}
            custom={1}
            className="text-6xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            <span className="block">
              <AnimatedText translationKey="home.creative" animated={true} />
            </span>
            <span className="block mt-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <AnimatedText translationKey="home.innovative" animated={true} />
            </span>
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            custom={2}
            className="text-xl md:text-2xl text-base-content/70 max-w-2xl mt-4 leading-relaxed"
          >
            <AnimatedText translationKey="home.intro" animated={false} />
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            custom={3}
            className="flex flex-wrap gap-5 pt-6"
          >
            <Link href="/work" className="group relative overflow-hidden btn border-0 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white btn-lg px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
              <span className="relative z-10"><AnimatedText translationKey="work.viewProject" animated={false} /></span>
              <motion.span 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link href="/contact" className="group relative btn btn-outline backdrop-blur-sm bg-white/5 border-primary/20 hover:border-primary/40 hover:bg-white/10 btn-lg px-8 rounded-full transition-all">
              <span className="relative z-10"><AnimatedText translationKey="contact.contactMe" animated={false} /></span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-base-content/60 mb-2">
          <AnimatedText translationKey="home.scroll" animated={false} />
        </span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-10 border-2 border-base-content/20 rounded-full flex justify-center pt-1"
        >
          <motion.div 
            animate={{ height: [5, 15, 5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 bg-gradient-to-b from-primary to-secondary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      titleKey: "projects.portfolio.title",
      descriptionKey: "projects.portfolio.description",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Three.js"],
      image: "/medias/project1.jpg"
    },
    {
      id: 2,
      titleKey: "projects.ecommerce.title",
      descriptionKey: "projects.ecommerce.description",
      tags: ["Vue.js", "Nuxt3", "Node.js", "Strapi"],
      image: "/medias/project2.jpg"
    },
    {
      id: 3,
      titleKey: "projects.dashboard.title",
      descriptionKey: "projects.dashboard.description",
      tags: ["React", "TypeScript", "Express", "SQL"],
      image: "/medias/project3.jpg"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10 bg-base-200/30 backdrop-blur-3xl">
        <div className="absolute top-40 left-20 w-72 h-72 rounded-full bg-primary/5 blur-[80px]"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-secondary/5 blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          <motion.div variants={fadeIn} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="inline-block px-5 py-2 rounded-full bg-secondary/5 backdrop-blur-sm border border-secondary/10 text-secondary text-sm font-medium mb-4">
                <AnimatedText translationKey="work.title" animated={false} />
              </span>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
                <AnimatedText translationKey="work.selectedWorks" animated={true} />
              </h2>
              <p className="text-base-content/70 mt-3 max-w-xl">
                <AnimatedText translationKey="work.discover" animated={false} />
              </p>
            </div>
            <Link href="/work" className="group text-primary flex items-center gap-2 font-medium relative">
              <span className="relative z-10"><AnimatedText translationKey="work.allProjects" animated={false} /></span>
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                whileHover={{ width: "100%" }}
              />
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </motion.svg>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeIn}
                custom={index}
                whileHover="hover"
                className="group"
              >
                <motion.div 
                  variants={cardVariants}
                  className="bg-base-100/80 backdrop-blur-md rounded-2xl overflow-hidden border border-base-300/50 h-full flex flex-col shadow-sm transition-all duration-300"
                >
                  <div className="h-56 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
                    {/* Image placeholder - remplacer par une vraie image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl font-bold bg-gradient-to-br from-white/10 to-white/5 bg-clip-text text-transparent group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
                        {project.id}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                      <AnimatedText translationKey={project.titleKey} animated={true} />
                    </h3>
                    <p className="text-base-content/70 text-base mb-5 flex-1 leading-relaxed">
                      <AnimatedText translationKey={project.descriptionKey} animated={false} />
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-base-200/50 backdrop-blur-sm text-xs rounded-full font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={`/work/${project.id}`} 
                      className="text-primary font-medium flex items-center gap-1 mt-auto group-hover:gap-2 transition-all duration-300 relative w-fit"
                    >
                      <span><AnimatedText translationKey="work.viewProject" animated={false} /></span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutPreview = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-20 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-secondary/5 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeIn} className="space-y-8 order-2 md:order-1">
            <span className="inline-block px-5 py-2 rounded-full bg-secondary/5 backdrop-blur-sm border border-secondary/10 text-secondary text-sm font-medium mb-2">
              <AnimatedText translationKey="about.about" animated={false} />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
              <AnimatedText translationKey="about.designer" animated={true} />
            </h2>
            <p className="text-base-content/70 text-lg leading-relaxed">
              <AnimatedText translationKey="about.intro" animated={false} />
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <motion.div 
                whileHover={{ y: -8, scale: 1.03 }}
                className="space-y-2 bg-base-100/80 backdrop-blur-md rounded-2xl p-6 border border-base-300/50 shadow-sm transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">4+</div>
                <div className="text-sm text-base-content/60">
                  <AnimatedText translationKey="about.years" animated={false} />
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -8, scale: 1.03 }}
                className="space-y-2 bg-base-100/80 backdrop-blur-md rounded-2xl p-6 border border-base-300/50 shadow-sm transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">25+</div>
                <div className="text-sm text-base-content/60">
                  <AnimatedText translationKey="about.projects" animated={false} />
                </div>
              </motion.div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.03, x: 5 }}
              className="inline-block"
            >
              <Link 
                href="/about" 
                className="group relative overflow-hidden inline-flex items-center gap-2 btn border-0 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white btn-lg px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              >
                <span className="relative z-10"><AnimatedText translationKey="about.learnMore" animated={false} /></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                <motion.span 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            custom={1}
            className="order-1 md:order-2"
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-md rounded-2xl relative overflow-hidden shadow-xl border border-white/10">
                {/* Placeholder pour une photo ou illustration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-8xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20 bg-clip-text text-transparent">ALXS</div>
                </div>
              </div>
              
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-xl -z-10 blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-xl -z-10 blur-sm"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10 bg-base-200/30 backdrop-blur-3xl">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-secondary/5 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeIn} custom={0} className="space-y-8">
            <span className="inline-block px-5 py-2 rounded-full bg-primary/5 backdrop-blur-sm border border-primary/10 text-primary text-sm font-medium">
              <AnimatedText translationKey="contact.collaborate" animated={false} />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
              <AnimatedText translationKey="contact.project" animated={true} />
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto leading-relaxed">
              <AnimatedText translationKey="contact.open" animated={false} />
            </p>
            
            <motion.div 
              className="pt-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href="/contact" 
                className="group relative overflow-hidden btn border-0 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white btn-lg px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              >
                <span className="relative z-10"><AnimatedText translationKey="contact.contactMe" animated={false} /></span>
                <motion.span 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            
            {/* Social links */}
            <div className="flex justify-center gap-6 pt-8">
              <motion.a 
                href="https://github.com/alexisg09" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-base-300/30 backdrop-blur-sm border border-base-300/50 flex items-center justify-center text-base-content/60 hover:bg-primary/10 hover:text-primary transition-all"
                aria-label="GitHub"
                whileHover={{ y: -8, scale: 1.1 }}
              >
                <span className="sr-only">GitHub</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/alexisgermain/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-base-300/30 backdrop-blur-sm border border-base-300/50 flex items-center justify-center text-base-content/60 hover:bg-primary/10 hover:text-primary transition-all"
                aria-label="LinkedIn"
                whileHover={{ y: -8, scale: 1.1 }}
              >
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
              <motion.a 
                href="https://alexis-germain.fr" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-base-300/30 backdrop-blur-sm border border-base-300/50 flex items-center justify-center text-base-content/60 hover:bg-primary/10 hover:text-primary transition-all"
                aria-label="Website"
                whileHover={{ y: -8, scale: 1.1 }}
              >
                <span className="sr-only">Website</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" x2="22" y1="12" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </motion.a>
              <motion.a 
                href="mailto:contact@alexis-germain.fr" 
                className="w-12 h-12 rounded-full bg-base-300/30 backdrop-blur-sm border border-base-300/50 flex items-center justify-center text-base-content/60 hover:bg-primary/10 hover:text-primary transition-all"
                aria-label="Email"
                whileHover={{ y: -8, scale: 1.1 }}
              >
                <span className="sr-only">Email</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
