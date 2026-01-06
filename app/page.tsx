"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../components/core/AnimatedText";
import { useTranslations } from "next-intl";
import TextType from "../components/shared/TextType";
import BlurText from "../components/shared/BlurText";
import LogoLoop from "../components/shared/LogoLoop";
import { useAnimationContext } from "./ClientLayout";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,
  SiDaisyui,
  SiGreensock,
  SiGit,
  SiGithub,
  SiFigma,
  SiAdobephotoshop,
  SiBlender,
  SiMysql,
  SiGraphql,
  SiAngular,
  SiStrapi,
  SiWordpress,
} from "react-icons/si";
import CardSwap, { Card } from "../components/shared/CardSwap";
import ProjectInfo, { Project } from "../components/shared/ProjectInfo";
export default function HomePage() {
  return (
    <main className="text-base-content relative">
      <HeroSection />
      <QuickAbout />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactForm />
    </main>
  );
}

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

const listContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  hidden: {},
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.7 },
  },
};

const HeroSection = () => {
  const t = useTranslations("home");
  const { shapesReady } = useAnimationContext();
  const [showTextType, setShowTextType] = useState(false);
  const [canShowHero, setCanShowHero] = useState(false);

  // Show hero when shapes are ready OR after fallback timeout
  useEffect(() => {
    if (shapesReady) {
      setCanShowHero(true);
      return;
    }
    // Fallback: show hero after 2.5s even if shapesReady isn't triggered
    const fallbackTimer = setTimeout(() => {
      setCanShowHero(true);
    }, 2500);
    return () => clearTimeout(fallbackTimer);
  }, [shapesReady]);

  const handleBlurTextComplete = () => {
    setShowTextType(true);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="text-center z-10 relative">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="inline-block">
            <span className="relative inline-block">
              {canShowHero && (
                <BlurText
                  text={t("heroTitle")}
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="content-title"
                  onAnimationComplete={handleBlurTextComplete}
                />
              )}
            </span>
          </span>
        </h1>

        {showTextType && (
          <TextType
            translationKeys={[
              "home.phrases.0",
              "home.phrases.1",
              "home.phrases.2",
              "home.phrases.3",
              "home.phrases.4",
              "home.phrases.5",
              "home.phrases.6",
            ]}
            typingSpeed={50}
            pauseDuration={1000}
            showCursor={true}
            cursorCharacter="|"
          />
        )}
      </div>
    </section>
  );
};

const QuickAbout = () => {
  const t = useTranslations("home.about");
  return (
    <section className="py-16 sm:py-20 glass overflow-hidden flex justify-center items-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <motion.h2
            className="content-title mb-10"
            variants={fadeIn}
            custom={0}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            className="content-text"
            variants={fadeIn}
            custom={1}
            dangerouslySetInnerHTML={{ __html: t.raw("text") as string }}
          ></motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const techLogo1 = [
    { node: <SiHtml5 />, title: "HTML5", href: "https://html.com" },
    { node: <SiCss3 />, title: "CSS3", href: "https://css.com" },
    {
      node: <SiJavascript />,
      title: "JavaScript",
      href: "https://javascript.com",
    },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    { node: <SiGraphql />, title: "GraphQL", href: "https://graphql.org" },
    {
      node: <SiMysql />,
      title: "MySQL",
      href: "https://www.mysql.com",
    },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
    { node: <SiBlender />, title: "Blender", href: "https://www.blender.org" },
    {
      node: <SiAdobephotoshop />,
      title: "Adobe Photoshop",
      href: "https://www.adobe.com/products/photoshop.html",
    },
  ];
  const techLogo2 = [
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    { node: <SiVuedotjs />, title: "Vue.js", href: "https://vuejs.org" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNuxtdotjs />, title: "Nuxt.js", href: "https://nuxtjs.org" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiAngular />, title: "Angular", href: "https://angular.io" },
    { node: <SiStrapi />, title: "Strapi", href: "https://strapi.io" },
    { node: <SiThreedotjs />, title: "Three.js", href: "https://threejs.org" },
    { node: <SiDaisyui />, title: "DaisyUI", href: "https://daisyui.com" },
    { node: <SiGreensock />, title: "GSAP", href: "https://greensock.com" },
    { node: <SiFramer />, title: "Framer Motion", href: "https://framer.com" },
  ];
  const t = useTranslations("home.skills");
  const languagesObj = t.raw("languages.items") as Record<string, string>;
  const languages = Object.values(languagesObj);
  const frameworksObj = t.raw("frameworks.items") as Record<string, string>;
  const frameworks = Object.values(frameworksObj);

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={listContainerVariants}
        >
          <motion.h2
            className="content-title mb-10"
            variants={listItemVariants}
          >
            {t("title")}
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto text-left pretty-text"
            variants={listContainerVariants}
          >
            <motion.div variants={listItemVariants}>
              <h3 className="content-text font-semibold mb-4">
                {t("languages.title")}
              </h3>
              <motion.ul
                className="list-disc list-inside space-y-2 text-pretty text-base sm:text-lg md:text-lg lg:text-xl leading-6 text-base-content/90"
                variants={listContainerVariants}
              >
                {languages.map((item, index) => (
                  <motion.li key={index} variants={listItemVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="content-text font-semibold mb-4">
                {t("frameworks.title")}
              </h3>
              <motion.ul
                className="list-disc list-inside space-y-2 text-pretty text-base sm:text-lg md:text-lg lg:text-xl leading-6 text-base-content/90"
                variants={listContainerVariants}
              >
                {frameworks.map((item, index) => (
                  <motion.li key={index} variants={listItemVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-16 sm:mt-20">
        <LogoLoop
          className="gradient-text mb-4"
          logos={techLogo1}
          speed={50}
          direction="right"
          logoHeight={60}
          gap={120}
          pauseOnHover
          scaleOnHover
          ariaLabel="Skills Logo Loop"
        />

        <LogoLoop
          className="gradient-text"
          logos={techLogo2}
          speed={50}
          direction="left"
          logoHeight={60}
          gap={120}
          pauseOnHover
          scaleOnHover
          ariaLabel="Skills Logo Loop"
        />
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const t = useTranslations("home.experience");
  return (
    <section className="py-16 sm:py-20 glass overflow-hidden flex justify-center items-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={listContainerVariants}
        >
          <motion.h2
            className="content-title mb-10"
            variants={listItemVariants}
          >
            {t("title")}
          </motion.h2>
          <motion.div
            className="space-y-8 max-w-3xl mx-auto text-left pretty-text"
            variants={listContainerVariants}
          >
            <motion.div variants={listItemVariants}>
              <h3 className="content-text font-semibold mb-2">{t("freelance.title")}</h3>
              <p className="content-text text-base-content/70">
                {t("freelance.description")}
              </p>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="content-text font-semibold mb-2">{t("asus.title")}</h3>
              <p className="content-text text-base-content/70">{t("asus.description")}</p>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="content-text font-semibold mb-2">{t("mgs.title")}</h3>
              <p className="content-text text-base-content/70">{t("mgs.description")}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
const projects: Project[] = [
  {
    id: "pba",
    title: "Asus - Pro Business Alliance",
    description:
      "Site vitrine pour la gamme Pro Business ASUS. Développement d'une interface moderne avec animations fluides et design responsive pour mettre en valeur les produits professionnels.",
    technologies: [
      { icon: <SiReact />, name: "React" },
      { icon: <SiNextdotjs />, name: "Next.js" },
      { icon: <SiTailwindcss />, name: "Tailwind" },
      { icon: <SiFramer />, name: "Framer Motion" },
    ],
    headerTitle: "Asus - PBA",
    headerLogoSrc: "/favpba.png",
    imageSrc: "/pba.png",
  },
  {
    id: "maximecaro",
    title: "Maxime Caro - Portfolio",
    description:
      "Portfolio créatif pour un artiste audiovisuel. Design immersif avec intégration de galeries médias et animations sur-mesure pour une expérience utilisateur unique.",
    technologies: [
      { icon: <SiVuedotjs />, name: "Vue.js" },
      { icon: <SiNuxtdotjs />, name: "Nuxt.js" },
      { icon: <SiGreensock />, name: "GSAP" },
      { icon: <SiTailwindcss />, name: "Tailwind" },
    ],
    headerTitle: "Maxime Caro",
    headerLogoSrc: "/favmax.png",
    imageSrc: "/maximecaro.png",
  },
  {
    id: "asuszen",
    title: "Asus - Zenphone 10",
    description:
      "Landing page produit pour le lancement du Zenphone 10. Animations 3D interactives et scroll-based storytelling pour présenter les fonctionnalités du smartphone.",
    technologies: [
      { icon: <SiReact />, name: "React" },
      { icon: <SiThreedotjs />, name: "Three.js" },
      { icon: <SiGreensock />, name: "GSAP" },
    ],
    headerTitle: "Asus - Zenphone 10",
    headerLogoSrc: "/favasus.png",
    imageSrc: "/asuszen.png",
  },
  {
    id: "barbincps",
    title: "Barbin CPS",
    description:
      "Site institutionnel pour une entreprise de services. Interface claire et professionnelle avec formulaire de contact et présentation des services.",
    technologies: [
      { icon: <SiWordpress />, name: "WordPress" },
      { icon: <SiCss3 />, name: "CSS3" },
      { icon: <SiJavascript />, name: "JavaScript" },
    ],
    headerTitle: "Barbin CPS",
    headerLogoSrc: "/favcps.png",
    imageSrc: "/barbncps.png",
  },
  {
    id: "gamins",
    title: "Les Gamins du Marais",
    description:
      "Site vitrine pour une association locale. Design chaleureux et accessible avec galerie photos et informations pratiques pour les familles.",
    technologies: [
      { icon: <SiWordpress />, name: "WordPress" },
      { icon: <SiCss3 />, name: "CSS3" },
      { icon: <SiJavascript />, name: "JavaScript" },
    ],
    headerTitle: "Les Gamins Marais",
    headerLogoSrc: "/favgamins.png",
    imageSrc: "/gamins.jpg",
  },
];

const ProjectsSection = () => {
  const t = useTranslations("work");
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={listContainerVariants}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h2
            className="content-title mb-4 md:mb-6"
            variants={listItemVariants}
          >
            {t("selectedWorks")}
          </motion.h2>
          <motion.p className="content-text" variants={listItemVariants}>
            {t("discover")}
          </motion.p>
        </motion.div>

        {/* Layout: Mobile (cards top, text bottom) | Desktop (text left, cards right) */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Block - Left on desktop */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0 order-2 md:order-1">
            <ProjectInfo project={projects[activeIndex]} />
          </div>

          {/* Cards Block - Right on desktop */}
          <div className="w-full md:w-1/2 relative h-[380px] sm:h-[450px] md:h-[550px] flex justify-center items-center order-1 md:order-2">
            <CardSwap
              width={450}
              height={340}
              placement="center"
              cardDistance={60}
              verticalDistance={50}
              delay={5000}
              pauseOnHover={true}
              onActiveIndexChange={setActiveIndex}
            >
              {projects.map((p) => (
                <Card
                  key={p.id}
                  headerTitle={p.headerTitle}
                  headerLogoSrc={p.headerLogoSrc}
                  imageSrc={p.imageSrc}
                />
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};
const ContactForm = () => {
  const t = useTranslations();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-2xl mx-auto"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
            variants={fadeIn}
            custom={0}
          >
            <AnimatedText translationKey="home.ctaTitle" animated={true} />
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mt-4 mb-8 text-center"
            variants={fadeIn}
            custom={1}
          >
            <AnimatedText translationKey="home.ctaText" animated={false} />
          </motion.p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="label">
                  <span className="label-text">
                    <AnimatedText
                      translationKey="contact.name"
                      animated={false}
                    />
                  </span>
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder={t("contact.name") + "..."}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="label">
                  <span className="label-text">
                    <AnimatedText
                      translationKey="contact.email"
                      animated={false}
                    />
                  </span>
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                  placeholder={t("contact.email") + "..."}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="label">
                <span className="label-text">
                  <AnimatedText
                    translationKey="contact.subject"
                    animated={false}
                  />
                </span>
              </label>
              <motion.select
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="select select-bordered w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <option value="" disabled>
                  {t("contact.subject")}
                </option>
                <option value="projet">{t("contact.project")}</option>
                <option value="collaboration">
                  {t("contact.collaborate")}
                </option>
                <option value="question">{t("contact.question")}</option>
                <option value="autre">{t("contact.other")}</option>
              </motion.select>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="label">
                <span className="label-text">
                  <AnimatedText
                    translationKey="contact.message"
                    animated={false}
                  />
                </span>
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={6}
                className="textarea textarea-bordered w-full"
                placeholder={t("contact.message") + "..."}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              ></motion.textarea>
            </div>
            <div className="pt-2 flex flex-col items-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg px-8 rounded-full shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    {t("contact.sending")}
                  </>
                ) : (
                  <AnimatedText
                    translationKey="contact.send"
                    animated={false}
                  />
                )}
              </motion.button>

              {submitSuccess === true && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 alert alert-success max-w-lg"
                >
                  <span>
                    <AnimatedText
                      translationKey="contact.success"
                      animated={false}
                    />
                  </span>
                </motion.div>
              )}
              {submitSuccess === false && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 alert alert-error max-w-lg"
                >
                  <span>
                    <AnimatedText
                      translationKey="contact.error"
                      animated={false}
                    />
                  </span>
                </motion.div>
              )}
            </div>
          </form>
          <p className="text-xl text-base-content text-center mt-8 pt-6">
            {t("contact.socialHint")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
