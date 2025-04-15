"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedText from "./components/AnimatedText";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function HomePage() {
  return (
    <main className="text-base-content relative">
      <HeroSection />
      <QuickAbout />
      <FeaturedProjects />
      <ContactCTA />
    </main>
  );
}

const HeroSection = () => (
  <section className="min-h-screen flex flex-col justify-center items-center text-center py-24">
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <motion.h1
        className="text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-4"
        variants={fadeIn}
        custom={0}
      >
        <AnimatedText translationKey="home.heroTitle" animated={true} />
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-base-content/70 max-w-2xl mx-auto mb-8"
        variants={fadeIn}
        custom={1}
      >
        <AnimatedText translationKey="home.heroSubtitle" animated={false} />
      </motion.p>
      <motion.div className="flex flex-wrap gap-5 justify-center" variants={fadeIn} custom={2}>
        <Link href="/work" className="btn btn-primary btn-lg rounded-full px-8">
          <AnimatedText translationKey="home.seeProjects" animated={false} />
        </Link>
        <Link href="/contact" className="btn btn-outline btn-lg rounded-full px-8">
          <AnimatedText translationKey="home.contactMe" animated={false} />
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

const QuickAbout = () => (
  <section className="py-16 bg-base-200/40">
    <div className="container mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={fadeIn} custom={0}>
          <AnimatedText translationKey="home.quickAboutTitle" animated={true} />
        </motion.h2>
        <motion.p className="text-lg text-base-content/70 max-w-2xl mx-auto" variants={fadeIn} custom={1}>
          <AnimatedText translationKey="home.quickAboutText" animated={false} />
        </motion.p>
      </motion.div>
    </div>
  </section>
);

const FeaturedProjects = () => (
  <section className="py-20">
    <div className="container mx-auto px-6">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" variants={fadeIn} custom={0}>
          <AnimatedText translationKey="home.featuredProjects" animated={true} />
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Exemple de 3 projets en vedette, à adapter dynamiquement si besoin */}
          <ProjectCard index={0} translationKeyPrefix="home.project1" />
          <ProjectCard index={1} translationKeyPrefix="home.project2" />
          <ProjectCard index={2} translationKeyPrefix="home.project3" />
        </div>
        <div className="flex justify-center mt-10">
          <Link href="/work" className="btn btn-primary btn-lg rounded-full px-8">
            <AnimatedText translationKey="home.allProjects" animated={false} />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ index, translationKeyPrefix }: { index: number; translationKeyPrefix: string }) => (
  <motion.div
    className="bg-base-100 rounded-xl shadow-md p-6 border border-base-300 flex flex-col gap-4"
    variants={fadeIn}
    custom={index}
    whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.10)" }}
  >
    <div className="h-40 w-full bg-base-200 rounded-lg mb-4 flex items-center justify-center">
      {/* Image ou icône du projet */}
      <span className="text-5xl">🚀</span>
    </div>
    <h3 className="text-xl font-bold">
      <AnimatedText translationKey={`${translationKeyPrefix}.title`} animated={false} />
    </h3>
    <p className="text-base-content/70 text-base mb-2">
      <AnimatedText translationKey={`${translationKeyPrefix}.desc`} animated={false} />
    </p>
    <div className="flex flex-wrap gap-2 mb-2">
      <span className="badge badge-outline">
        <AnimatedText translationKey={`${translationKeyPrefix}.stack`} animated={false} />
      </span>
    </div>
    <Link href="/work" className="text-primary font-medium flex items-center gap-1 mt-auto group-hover:gap-3 transition-all duration-300 py-2">
      <AnimatedText translationKey="home.seeDetails" animated={false} />
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
    </Link>
  </motion.div>
);

const ContactCTA = () => (
  <section className="py-24 bg-base-200/50 border-t border-base-300/30">
    <div className="container mx-auto px-6 text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={fadeIn} custom={0}>
          <AnimatedText translationKey="home.ctaTitle" animated={true} />
        </motion.h2>
        <motion.p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-8" variants={fadeIn} custom={1}>
          <AnimatedText translationKey="home.ctaText" animated={false} />
        </motion.p>
        <Link href="/contact" className="btn btn-primary btn-lg rounded-full px-8">
          <AnimatedText translationKey="home.contactMe" animated={false} />
        </Link>
      </motion.div>
    </div>
  </section>
);
