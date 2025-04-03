"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import AnimatedText from "@/app/components/AnimatedText";

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

// Animation pour les sections
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

// Types pour le formulaire
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  return (
    <main className="text-base-content relative">
      <ContactHeader />
      <div className="container mx-auto px-6">
        <ContactForm />
      </div>
      <ContactInfo />
    </main>
  );
}

const ContactHeader: React.FC = () => {
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
          initial="hidden"
          animate="visible"
          className="space-y-8 max-w-4xl"
        >
          <motion.div 
            variants={fadeIn} 
            custom={0}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 backdrop-blur-sm"
          >
            <AnimatedText translationKey="contact.title" />
          </motion.div>
          
          <motion.h1
            variants={fadeIn}
            custom={1}
            className="text-5xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            <AnimatedText translationKey="contact.letsChat" />
          </motion.h1>
          
          <motion.p
            variants={fadeIn}
            custom={2}
            className="text-xl text-base-content/70 max-w-2xl mt-4"
          >
            <AnimatedText translationKey="contact.open" />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi de formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Réinitialiser le formulaire après 3 secondes
      setTimeout(() => {
        setSubmitSuccess(null);
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <motion.div variants={fadeIn} className="lg:col-span-1">
            <h2 className="text-3xl font-bold mb-6">
              <AnimatedText translationKey="contact.contactMe" />
            </h2>
            <p className="text-base-content/70 text-lg mb-8">
              <AnimatedText translationKey="contact.project" />
            </p>
            
            {/* Contact information preview */}
            <div className="space-y-6">
              <motion.div 
                whileHover={{ y: -3, x: 3 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Email</h3>
                  <a href="mailto:contact@alexis-germain.fr" className="text-primary hover:underline transition-all">
                    <AnimatedText translationKey="contact.email_address" />
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -3, x: 3 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Téléphone</h3>
                  <p className="text-base-content/70">
                    <AnimatedText translationKey="contact.phone" />
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, x: 3 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">Adresse</h3>
                  <p className="text-base-content/70">
                    <AnimatedText translationKey="contact.address" />
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeIn} className="lg:col-span-2">
            <motion.div 
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              className="bg-base-100 rounded-2xl p-8 border border-base-300 shadow-sm transition-all duration-300"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      <AnimatedText translationKey="contact.name" />
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      <AnimatedText translationKey="contact.email" />
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium">
                    <AnimatedText translationKey="contact.subject" />
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="projet">Nouveau projet</option>
                    <option value="collaboration">Proposition de collaboration</option>
                    <option value="question">Question générale</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    <AnimatedText translationKey="contact.message" />
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-base-300 bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Décrivez votre projet ou votre question..."
                  ></textarea>
                </div>
                
                <div className="pt-2">
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
                        Envoi en cours...
                      </>
                    ) : (
                      <AnimatedText translationKey="contact.send" />
                    )}
                  </motion.button>
                  
                  {submitSuccess === true && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-success/20 text-success rounded-lg"
                    >
                      <AnimatedText translationKey="contact.success" />
                    </motion.div>
                  )}
                  
                  {submitSuccess === false && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-error/20 text-error rounded-lg"
                    >
                      <AnimatedText translationKey="contact.error" />
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const ContactInfo: React.FC = () => {
  const contactMethods = [
    {
      title: "Email",
      value: "contact@alexis-germain.fr",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      )
    },
    {
      title: "Site Web",
      value: "alexis-germain.fr",
      link: "https://alexis-germain.fr",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" x2="22" y1="12" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
    {
      title: "Téléphone",
      value: "06.08.53.52.80",
      link: "tel:+33608535280",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    },
    {
      title: "Adresse",
      value: "Bruyères-sur-Oise, 95820",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      )
    }
  ];

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
          variants={sectionVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <AnimatedText translationKey="contact.social" />
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <AnimatedText translationKey="contact.follow" />
            </h2>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Retrouvez-moi sur les réseaux sociaux pour suivre mes dernières réalisations et actualités.
            </p>
          </motion.div>
          
          <motion.div variants={fadeIn} custom={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-base-100 rounded-xl p-6 border border-base-300 shadow-sm transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{method.title}</h3>
                  {method.link ? (
                    <a 
                      href={method.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-base-content/70 hover:text-primary transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-base-content/70">{method.value}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Map or location */}
          <motion.div 
            variants={fadeIn} 
            custom={2}
            className="mt-16 bg-base-100 rounded-2xl p-4 border border-base-300 shadow-sm overflow-hidden h-80 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
              <div className="text-center">
                <span className="text-4xl font-bold text-base-content/20">CARTE</span>
                <p className="text-base-content/40">Emplacement de la carte</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
