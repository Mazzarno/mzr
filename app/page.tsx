"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import AnimatedText from "../components/core/AnimatedText";
import { useTranslations } from "next-intl";
import TextType from "../components/shared/TextType";
import BlurText from "../components/shared/BlurText";
import LogoLoop from "../components/shared/LogoLoop";
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
} from "react-icons/si";
//import CardSwap, { Card } from "../components/shared/CardSwap";
export default function HomePage() {
  return (
    <main className="text-base-content relative">
      <HeroSection />
      <QuickAbout />
      <SkillsSection />
      <ExperienceSection />
      {/* ProjectsSection */}
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
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <div className="text-center z-10 relative">
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="inline-block">
            <span className="relative inline-block">
              <BlurText
                text={t("heroTitle")}
                delay={500}
                animateBy="words"
                direction="top"
                className="content-title"
              />
            </span>
          </span>
        </motion.h1>

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
              <h3 className="content-text font-semibold mb-2">
                {t("freelance.title")}
              </h3>
              <p className="content-text text-base-content/70">
                {t("freelance.description")}
              </p>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="content-text font-semibold mb-2">
                {t("asus.title")}
              </h3>
              <p className="content-text text-base-content/70">
                {t("asus.description")}
              </p>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="content-text font-semibold mb-2">
                {t("mgs.title")}
              </h3>
              <p className="content-text text-base-content/70">
                {t("mgs.description")}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
/*
const ProjectsSection = () => {
  const t = useTranslations("work");
  return (
    <section className="pt-16 md:pt-20 pb-0 md:pb-0">
      <div className="container px-5 mx-auto">
        <motion.h2 className="content-title mb-12" variants={listItemVariants}>
          {t("selectedWorks")}
        </motion.h2>
        <div className="flex flex-wrap -mx-4 text-center">
          <div className="sm:w-1/2 px-4 text-center">
            <motion.p className="content-text" variants={listItemVariants}>
              {t("discover")}
            </motion.p>
          </div>
          <div className="sm:w-1/2 px-4 relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]">
            <CardSwap
              placement="center"
              cardDistance={100}
              verticalDistance={80}
              delay={5000}
              pauseOnHover={true}
            >
              <Card
                headerTitle="Asus - PBA"
                headerLogoSrc="/favpba.png"
                imageSrc="/pba.png"
              />
              <Card
                headerTitle="Maxime Caro"
                headerLogoSrc="/favmax.png"
                imageSrc="/maximecaro.png"
              />
              <Card
                headerTitle="Asus - Zenphone 10"
                headerLogoSrc="/favasus.png"
                imageSrc="/asuszen.png"
              />
              <Card
                headerTitle="Barbin CPS"
                headerLogoSrc="/favcps.png"
                imageSrc="/barbncps.png"
              />

              <Card
                headerTitle="Les Gamins Marais"
                headerLogoSrc="/favgamins.png"
                imageSrc="/gamins.jpg"
              />
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};
*/
const ContactForm = () => {
  const t = useTranslations();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    messageKey: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (data: typeof formState) => {
    const nextErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!data.name.trim()) {
      nextErrors.name = t("contact.validation.nameRequired");
    } else if (data.name.trim().length < 2) {
      nextErrors.name = t("contact.validation.nameMin");
    }

    if (!data.email.trim()) {
      nextErrors.email = t("contact.validation.emailRequired");
    } else if (!emailRegex.test(data.email.trim())) {
      nextErrors.email = t("contact.validation.emailInvalid");
    }

    if (!data.subject) {
      nextErrors.subject = t("contact.validation.subjectRequired");
    }

    if (!data.message.trim()) {
      nextErrors.message = t("contact.validation.messageRequired");
    } else if (data.message.trim().length < 10) {
      nextErrors.message = t("contact.validation.messageMin");
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);
    const validation = validate(formState);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setIsSubmitting(false);
      setToast({ type: "error", messageKey: "contact.validation.formInvalid" });
      return;
    }

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/79c57c4cb9aa04a9834c34585be7a6d6",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (response.ok) {
        setFormState({ name: "", email: "", subject: "", message: "" });
        setToast({ type: "success", messageKey: "contact.success" });
        setSubmitted(true);
      } else {
        setToast({ type: "error", messageKey: "contact.error" });
      }
    } catch {
      setToast({ type: "error", messageKey: "contact.error" });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold mb-6 text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  custom={0}
                >
                  <AnimatedText translationKey="home.ctaTitle" animated />
                </motion.h2>

                <motion.p
                  className="text-base sm:text-lg md:text-xl text-base-content/70 mb-10 text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  custom={1}
                >
                  <AnimatedText
                    translationKey="home.ctaText"
                    animated={false}
                  />
                </motion.p>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={listContainerVariants}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      variants={listItemVariants}
                    >
                      <label htmlFor="name" className="label">
                        <span className="label-text">{t("contact.name")}</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        type="text"
                        className={`input input-bordered w-full ${submitted ? "opacity-60" : ""}`}
                        placeholder={t("contact.name") + "..."}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        disabled={submitted}
                      />
                      {errors.name && (
                        <span id="name-error" className="label-text-alt text-error mt-1 inline-block">
                          {errors.name}
                        </span>
                      )}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      variants={listItemVariants}
                    >
                      <label htmlFor="email" className="label">
                        <span className="label-text">{t("contact.email")}</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        type="email"
                        className={`input input-bordered w-full ${submitted ? "opacity-60" : ""}`}
                        placeholder={t("contact.email") + "..."}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        disabled={submitted}
                      />
                      {errors.email && (
                        <span id="email-error" className="label-text-alt text-error mt-1 inline-block">
                          {errors.email}
                        </span>
                      )}
                    </motion.div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="subject" className="label">
                      <span className="label-text">{t("contact.subject")}</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      type="text"
                      className={`input input-bordered w-full ${submitted ? "opacity-60" : ""}`}
                      placeholder={t("contact.subject") + "..."}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      disabled={submitted}
                    />
                    {errors.subject && (
                      <span id="subject-error" className="label-text-alt text-error mt-1 inline-block">
                        {errors.subject}
                      </span>
                    )}
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="message" className="label">
                      <span className="label-text">{t("contact.message")}</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`textarea textarea-bordered w-full ${submitted ? "opacity-60" : ""}`}
                      placeholder={t("contact.message") + "..."}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      disabled={submitted}
                    ></textarea>
                    {errors.message && (
                      <span id="message-error" className="label-text-alt text-error mt-1 inline-block">
                        {errors.message}
                      </span>
                    )}
                  </motion.div>

                  <div className="pt-2 flex justify-center">
                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-base-content/80"
                      >
                        {t("contact.thanksMessage")}
                      </motion.div>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary btn-lg rounded-full shadow-lg px-8"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        variants={listItemVariants}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="loading loading-spinner loading-sm mr-2"></span>
                            {t("contact.sending")}
                          </>
                        ) : (
                          <AnimatedText translationKey="contact.send" animated={false} />
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.form>
              </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="toast toast-end toast-bottom z-50 mb-14 mr-6"
          >
            <div
              className={`alert ${
                toast.type === "success" ? "alert-success" : "alert-error"
              } shadow-lg relative pr-10`}
            >
              <span className="text-white">{t(toast.messageKey)}</span>
              <button
                type="button"
                aria-label={t("contact.close") ?? "Close"}
                className="absolute top-2 right-2 p-1 rounded-full text-white/90 hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                onClick={() => setToast(null)}
              >
                <RxCross2 size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
