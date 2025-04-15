"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import AnimatedText from "@/app/components/AnimatedText";

interface SkillCategory {
  title: string;
  skills: string[];
}

interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

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

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <main className="text-base-content relative">
      <AboutHeader />
      <div className="container mx-auto px-6">
        <AboutBio />
        <AboutSkills />
        <AboutExperience />
        <AboutEducation />
      </div>
      <AboutContact />
    </main>
  );
}

function AboutHeader() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.span 
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 backdrop-blur-sm"
            variants={fadeIn}
            custom={0}
          >
            <AnimatedText translationKey="about.title" animated={false} />
          </motion.span>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
            variants={fadeIn}
            custom={1}
          >
            <AnimatedText translationKey="about.about" animated={true} />
          </motion.h1>
          
          <motion.p 
            className="text-xl text-base-content/70 max-w-3xl"
            variants={fadeIn}
            custom={2}
          >
            <AnimatedText translationKey="about.intro" animated={false} />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function AboutBio() {
  return (
    <motion.section 
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <motion.div className="max-w-4xl mx-auto">
        <motion.span 
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
          variants={fadeIn}
        >
          <AnimatedText translationKey="about.journey" animated={false} />
        </motion.span>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          variants={fadeIn}
          custom={1}
        >
          Mon parcours
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={fadeIn}
          custom={2}
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-base-content/80 text-lg leading-relaxed">
              Passionate about digital creation since my early years, I&apos;ve developed a deep understanding of both design principles and technical implementation. My journey began with simple HTML websites and evolved into complex web applications with modern frameworks.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-base-content/80 text-lg leading-relaxed">
              I believe in creating websites that not only look beautiful but also provide intuitive user experiences. Every project is an opportunity to blend creativity with technical precision, resulting in digital experiences that leave a lasting impression.
            </p>
          </div>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 bg-base-200/50 rounded-2xl p-8 border border-base-300"
          variants={fadeIn}
          custom={3}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">5+</div>
            <div className="text-sm text-base-content/60">
              <AnimatedText translationKey="about.years" animated={false} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">30+</div>
            <div className="text-sm text-base-content/60">
              <AnimatedText translationKey="about.projects" animated={false} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">15+</div>
            <div className="text-sm text-base-content/60">
              <AnimatedText translationKey="about.clients" animated={false} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-1">3</div>
            <div className="text-sm text-base-content/60">
              Récompenses
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function AboutSkills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      skills: ["Vue/Nuxt3", "React/Next", "AngularJs", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "Design",
      skills: ["Figma", "PhotoShop", "UI/UX Design", "Prototypage", "Maquettage"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "SQL", "GraphQL", "Strapi"]
    },
    {
      title: "Other",
      skills: ["Three.js", "Tresjs", "Fiber", "GSAP", "Motion", "Blender"]
    }
  ];
  
  return (
    <motion.section 
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <motion.div className="max-w-4xl mx-auto">
        <motion.span 
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
          variants={fadeIn}
        >
          <AnimatedText translationKey="about.skills" animated={false} />
        </motion.span>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          variants={fadeIn}
          custom={1}
        >
          <AnimatedText translationKey="about.skills" animated={true} />
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={fadeIn}
          custom={2}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-base-100 rounded-xl p-6 border border-base-300 shadow-sm transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-primary mb-4">
                <AnimatedText translationKey={`about.${category.title.toLowerCase()}`} animated={false} />
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                    <span className="text-base-content/80">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function AboutExperience() {
  const experiences: Experience[] = [
    {
      position: "Développeur Web Freelance",
      company: "Auto-Entreprise",
      period: "2019 - 2022 | 2022 - Aujourd'hui",
      description: "Conception et développement de sites web modernes. Optimisation des performances et de l'expérience utilisateur. Intégration de solutions sur mesure pour répondre aux besoins clients. Formation et support technique."
    },
    {
      position: "Webmaster",
      company: "ASUS France",
      period: "Mai 2022 - Août 2022",
      description: "Gestion et maintenance des sites web français. Coordination avec les équipes internationales. Adaptation des contenus marketing et support technique pour les campagnes européennes."
    },
    {
      position: "Développeur Web Junior",
      company: "MGS Informatique",
      period: "Septembre 2018 - Février 2019",
      description: "Développement et maintenance de sites web. Formation de l'équipe aux technologies web. Analyse des besoins clients et implémentation de solutions."
    }
  ];
  
  return (
    <motion.section 
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <motion.div className="max-w-4xl mx-auto">
        <motion.span 
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
          variants={fadeIn}
        >
          <AnimatedText translationKey="about.experience" animated={false} />
        </motion.span>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          variants={fadeIn}
          custom={1}
        >
          <AnimatedText translationKey="about.experience" animated={true} />
        </motion.h2>
        
        <motion.div 
          className="space-y-6"
          variants={fadeIn}
          custom={2}
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-base-100 rounded-xl p-6 border border-base-300 shadow-sm transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-bold text-primary">{exp.position}</h3>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full font-medium mt-2 md:mt-0">{exp.period}</span>
              </div>
              <h4 className="text-lg font-medium text-base-content/80 mb-3">{exp.company}</h4>
              <p className="text-base-content/70 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function AboutEducation() {
  const education: Education[] = [
    {
      degree: "Formation développeur intégrateur Web",
      school: "IFOCOP",
      period: "Septembre 2018 - Février 2019",
      description: "HTML 5 / CSS 3 / JavaScript ES6, CMS Wordpress / Drupal, Intégration et gestion MySQL BDD"
    }
  ];
  
  return (
    <motion.section 
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <motion.div className="max-w-4xl mx-auto">
        <motion.span 
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
          variants={fadeIn}
        >
          <AnimatedText translationKey="about.education" animated={false} />
        </motion.span>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          variants={fadeIn}
          custom={1}
        >
          <AnimatedText translationKey="about.education" animated={true} />
        </motion.h2>
        
        <motion.div 
          className="space-y-6"
          variants={fadeIn}
          custom={2}
        >
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-base-100 rounded-xl p-6 border border-base-300 shadow-sm transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-bold text-primary">{edu.degree}</h3>
                <span className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full font-medium mt-2 md:mt-0">{edu.period}</span>
              </div>
              <h4 className="text-lg font-medium text-base-content/80 mb-3">{edu.school}</h4>
              <p className="text-base-content/70 leading-relaxed">{edu.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function AboutContact() {
  return (
    <section className="py-24 bg-base-200/30 relative overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto"
          variants={sectionVariants}
        >
          <motion.div variants={fadeIn} custom={0} className="space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <AnimatedText translationKey="contact.collaborate" animated={false} />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              <AnimatedText translationKey="contact.project" animated={true} />
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              <AnimatedText translationKey="contact.open" animated={false} />
            </p>
            
            <motion.div 
              className="pt-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href="/contact" 
                className="btn btn-primary btn-lg px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              >
                <AnimatedText translationKey="contact.contactMe" animated={false} />
              </Link>
            </motion.div>
            
            {/* CV Download */}
            <div className="pt-8">
              <Link 
                href="#" 
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <AnimatedText translationKey="about.downloadCV" animated={false} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
