"use client";
import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./components/AnimatedText";
import { useTranslations } from "next-intl";

export default function HomePage() {
  return (
    <main className="text-base-content relative">
      <HeroSection />
      <QuickAbout />
      <SkillsSection />
      <ExperienceSection />
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

const ScrambleText = ({ text, speed = 40 }: { text: string; speed?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#";
    let scrambled = "";
    let localFrame = 0;
    if (intervalRef.current !== null) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      scrambled = text
        .split("")
        .map((char, i) => {
          if (i < localFrame) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      setDisplayed(scrambled);
      localFrame++;
      if (localFrame > text.length && intervalRef.current !== null) clearInterval(intervalRef.current);
    }, speed);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return (
    <span className="text-base-content font-mono block h-[1.5em] sm:h-[1.8em] md:h-[2em] lg:h-[2.2em] xl:h-[2.4em] 2xl:h-[2.6em] text-pretty" dangerouslySetInnerHTML={{ __html: displayed }} />
  );
};

const HeroSection = () => {
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const phrases = useMemo(
    () => [t("phrases.0"), t("phrases.1"), t("phrases.2"), t("phrases.3"), t("phrases.4"), t("phrases.5"), t("phrases.6")],
    [t]
  );

  useEffect(() => setCurrentPhrase(phrases[index]), [phrases, index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % phrases.length);
      setCurrentPhrase(phrases[(index + 1) % phrases.length]);
    }, 8000);
    return () => clearInterval(interval);
  }, [index, phrases]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
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
      <motion.div className="text-center z-10 relative" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="inline-block">
            <span className="relative inline-block">
              <AnimatedText translationKey="home.heroTitle" animated={true} />
            </span>
          </span>
        </motion.h1>
        <motion.div className="text-xl font-medium mb-14 max-w-2xl mx-auto" variants={itemVariants}>
          <div className="relative inline-block font-mono">
            <ScrambleText text={currentPhrase} speed={30} />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

const QuickAbout = () => {
  const t = useTranslations("home.about");
  return (
    <section className="py-16 sm:py-20 bg-base-200/40">
      <div className="container mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-20" variants={fadeIn} custom={0}>
            {t("title")}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg max-w-2xl mx-auto"
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
  const t = useTranslations("home.skills");
  const languagesObj = t.raw("languages.items") as Record<string, string>;
  const languages = Object.values(languagesObj);
  const frameworksObj = t.raw("frameworks.items") as Record<string, string>;
  const frameworks = Object.values(frameworksObj);

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={listContainerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-20" variants={listItemVariants}>
            {t("title")}
          </motion.h2>
          <motion.div className="grid md:grid-cols-2 gap-8" variants={listContainerVariants}>
            <motion.div variants={listItemVariants}>
              <h3 className="text-xl font-semibold mb-2">{t("languages.title")}</h3>
              <motion.ul className="list-disc list-inside space-y-2" variants={listContainerVariants}>
                {languages.map((item, index) => (
                  <motion.li key={index} variants={listItemVariants}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="text-xl font-semibold mb-2">{t("frameworks.title")}</h3>
              <motion.ul className="list-disc list-inside space-y-2" variants={listContainerVariants}>
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
    </section>
  );
};

const ExperienceSection = () => {
  const t = useTranslations("home.experience");
  return (
    <section className="py-16 sm:py-20 bg-base-200/40">
      <div className="container mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={listContainerVariants}>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-20" variants={listItemVariants}>
            {t("title")}
          </motion.h2>
          <motion.div className="space-y-20" variants={listContainerVariants}>
            <motion.div variants={listItemVariants}>
              <h3 className="text-xl font-semibold">{t("freelance.title")}</h3>
              <p className="text-base-content/70">{t("freelance.description")}</p>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="text-xl font-semibold">{t("asus.title")}</h3>
              <p className="text-base-content/70">{t("asus.description")}</p>
            </motion.div>
            <motion.div variants={listItemVariants}>
              <h3 className="text-xl font-semibold">{t("mgs.title")}</h3>
              <p className="text-base-content/70">{t("mgs.description")}</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const t = useTranslations();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<null | boolean>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section className="py-16 sm:py-24 border-t border-base-300/30">
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
                <label htmlFor="name" className="block text-sm font-medium">
                  <AnimatedText translationKey="contact.name" animated={false} />
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder={t("contact.name") + '...'}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  <AnimatedText translationKey="contact.email" animated={false} />
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder={t("contact.email") + '...'}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium">
                <AnimatedText translationKey="contact.subject" animated={false} />
              </label>
              <motion.select
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <option value="" disabled>{t("contact.subject")}</option>
                <option value="projet">{t("contact.project")}</option>
                <option value="collaboration">{t("contact.collaborate")}</option>
                <option value="question">{t("contact.question")}</option>
                <option value="autre">{t("contact.other")}</option>
              </motion.select>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium">
                <AnimatedText translationKey="contact.message" animated={false} />
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder={t("contact.message") + '...'}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              ></motion.textarea>
            </div>
            <div className="pt-2 flex flex-col items-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
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
              {submitSuccess === true && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-success/20 text-success rounded-lg"
                >
                  <AnimatedText translationKey="contact.success" animated={false} />
                </motion.div>
              )}
              {submitSuccess === false && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-error/20 text-error rounded-lg"
                >
                  <AnimatedText translationKey="contact.error" animated={false} />
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

