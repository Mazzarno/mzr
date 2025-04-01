"use client";
import { motion } from "framer-motion";

export default function page() {


  return (
    <main className="text-base-content relative">
        <SectionHero />
        <SectionProjects />
        <SectionContact />
    </main>
  );
}


const SectionHero = () => {
  return (
    <section className="h-screen">
      <div className="h-full text-center flex flex-col max-w-3xl px-4 relative text-base-content pt-32">
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
  About
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
  );
};
const SectionProjects = () => {
  return (
    <section id="projects" className="py-20 bg-base-200 min-h-screen">
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
            className="project-card card bg-base-100 shadow-xl text-base-content"
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <figure className="relative h-52 ">
              <div className="absolute inset-0 bg-primary/20 w-full h-full" />
              <div className="w-full h-full bg-neutral-content/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-base-content/70">
                  Image du projet
                </span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-primary">Portfolio E-commerce</h3>
              <p className="mb-4">
                Une boutique moderne avec intégration de paiement et animation
                des transitions de pages.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-outline badge-primary">React</span>
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
            className="project-card card bg-base-100 shadow-xl text-base-content"
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <figure className="relative h-52">
              <div className="absolute inset-0 bg-secondary/20 w-full h-full" />
              <div className="w-full h-full bg-neutral-content/10 flex items-center justify-center">
                <span className="text-xl font-semibold text-base-content/70">
                  Image du projet
                </span>
              </div>
            </figure>
            <div className="card-body">
              <h3 className="card-title text-secondary">Dashboard Analytics</h3>
              <p className="mb-4">
                Interface de visualisation de données avec animations et filtres
                interactifs en temps réel.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-outline badge-primary">React</span>
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
            className="project-card card bg-base-100 shadow-xl  text-base-content"
            whileHover={{
              y: -10,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <figure className="relative h-52">
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
  );
};
const SectionContact = () => {
  return (
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
                  <span className="label-text text-base-content">Message</span>
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
  );
};
