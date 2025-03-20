"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  return (
    <main className="min-h-screen bg-base-100 text-base-content overflow-hidden">
      <div className="fixed w-full min-h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 2xl:grid-cols-11 divide-x-2 divide-dashed divide-base pointer-events-none opacity-10">
        <div className=""></div>
        <div className="hidden sm:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <div className="hidden lg:block"></div>
        <div className="hidden lg:block"></div>
        <div className="hidden xl:block"></div>
        <div className="hidden xl:block"></div>
        <div className="hidden 2xl:block"></div>
        <div className="hidden 2xl:block"></div>
        <div className="hidden 2xl:block"></div>
      </div>
      {/* Hero Section */}
      <section className="hero min-h-screen relative overflow-hidden">
        {/* Background animated shapes */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [50, -50, 50],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [50, -50, 50],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="hero-content text-center flex flex-col max-w-3xl px-4 relative z-10 text-base-content">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            Développeur Web Créatif
          </motion.h1>

          <motion.p
            className="hero-subtitle text-xl mb-8 text-base-content/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            Je conçois et développe des expériences web uniques et mémorables.
            <br />
            Spécialisé en React, Next.js et animations web.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center hero-cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
          >
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir mes projets
            </motion.button>
            <motion.button
              className="btn btn-outline btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Me contacter
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-base-content/30 flex justify-center pt-1">
            <motion.div
              className="w-1 h-2 bg-primary rounded-full"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      <section id="projects" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Mes Projets Récents
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-12"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <motion.div
              className="project-card card bg-base-100 shadow-xl overflow-hidden text-base-content"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <figure className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 w-full h-full" />
                <div className="w-full h-full bg-neutral-content/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-base-content/70">
                    Image du projet
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-primary">
                  Portfolio E-commerce
                </h3>
                <p className="mb-4">
                  Une boutique moderne avec intégration de paiement et animation
                  des transitions de pages.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline badge-primary">
                    React
                  </span>
                  <span className="badge badge-outline badge-secondary">
                    Next.js
                  </span>
                  <span className="badge badge-outline">Tailwind</span>
                </div>
                <div className="card-actions justify-end">
                  <motion.button
                    className="btn btn-sm btn-outline btn-accent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Voir le projet
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="project-card card bg-base-100 shadow-xl overflow-hidden text-base-content"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <figure className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-secondary/20 w-full h-full" />
                <div className="w-full h-full bg-neutral-content/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-base-content/70">
                    Image du projet
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-secondary">
                  Dashboard Analytics
                </h3>
                <p className="mb-4">
                  Interface de visualisation de données avec animations et
                  filtres interactifs en temps réel.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline badge-primary">
                    React
                  </span>
                  <span className="badge badge-outline badge-secondary">
                    Typescript
                  </span>
                  <span className="badge badge-outline">D3.js</span>
                </div>
                <div className="card-actions justify-end">
                  <motion.button
                    className="btn btn-sm btn-outline btn-accent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Voir le projet
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="project-card card bg-base-100 shadow-xl overflow-hidden text-base-content"
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <figure className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 w-full h-full" />
                <div className="w-full h-full bg-neutral-content/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-base-content/70">
                    Image du projet
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-accent">Application Mobile</h3>
                <p className="mb-4">
                  App cross-platform avec animations fluides et transitions
                  contextuelles.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline badge-primary">
                    React Native
                  </span>
                  <span className="badge badge-outline badge-secondary">
                    Expo
                  </span>
                  <span className="badge badge-outline">Reanimated</span>
                </div>
                <div className="card-actions justify-end">
                  <motion.button
                    className="btn btn-sm btn-outline btn-accent"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Voir le projet
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Me Contacter
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto mb-12"></div>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div
              className="bg-base-100 rounded-box shadow-lg p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <form>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-base-content">Nom</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="input input-bordered w-full bg-base-200 text-base-content"
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-base-content">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="input input-bordered w-full bg-base-200 text-base-content"
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-base-content">
                      Message
                    </span>
                  </label>
                  <textarea
                    placeholder="Votre message"
                    className="textarea textarea-bordered h-32 w-full bg-base-200 text-base-content"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary w-full"
                >
                  Envoyer
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 text-base-content py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-6 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-primary mb-2">
                DevPortfolio
              </h2>
              <p className="text-base-content/70">
                Créateur d'expériences web uniques
              </p>
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              <motion.a
                className="btn btn-circle btn-outline"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-github"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </motion.a>
              <motion.a
                className="btn btn-circle btn-outline"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
              <motion.a
                className="btn btn-circle btn-outline"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-twitter"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </motion.a>
            </motion.div>
          </div>

          <div className="mt-8 pt-8 border-t border-base-content/10 text-center text-base-content/60 text-sm">
            © {new Date().getFullYear()} DevPortfolio. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  );
}
