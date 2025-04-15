    /* @ts-expect-error Server Component 
    import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";

export default function CV() {
  return {

    <div className=" bg-base-200/70 text-base-content min-h-screen p-8 mx-auto py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-base-content">Alexis GERMAIN, Développeur Web.</h1>
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-sm mb-1">
              <span>27/12/1994</span>
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-sm mb-1">
              <span>Bruyères-sur-Oise, 95820</span>
              <MapPin className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-sm mb-1">
              <span>06.08.53.52.80</span>
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-sm mb-1">
              <span>alexis-germain.fr</span>
              <Globe className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-sm mb-1">
              <span>contact@alexis-germain.fr</span>
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-sm mb-1">
              <span>github.com/Mazzarno</span>
              <Github className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-end gap-2 text-sm mb-1">
              <span>in/alexis-germain</span>
              <Linkedin className="w-4 h-4" />
            </div>
          </div>
        </div>

        <main>
          <section className="mb-8">
            <h2 className="text-xl text-base-content font-normal mb-4">Experience</h2>
            
            <div className="mb-6">
              <div className="mb-1">
                <div>
                  <h3 className="text-base font-semibold inline">Auto-Entreprise</h3>
                  <span className="text-gray-500 ml-1">• Développeur Web Freelance</span>
                </div>
                <div className="text-gray-500 text-sm">2019 - 2022 | 2022 - Aujourdhui</div>
              </div>
              <div className="text-sm space-y-1">
                <p>Conception et développement de sites vitrines.</p>
                <p>Maintenance et optimisation de sites existants.</p>
                <p>Intégration de solutions personnalisées pour répondre à des besoins spécifiques.</p>
                <p>Support technique et formation pour garantir l'autonomie des clients.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="mb-1">
                <div>
                  <h3 className="text-base font-semibold inline">ASUS France</h3>
                  <span className="text-gray-500 ml-1">• Webmaster</span>
                </div>
                <div className="text-gray-500 text-sm">Mai 2022 - Août 2022</div>
              </div>
              <div className="text-sm space-y-1">
                <p>Conception, développement, gestion et maintenance des sites web français.</p>
                <p>Collaboration internationale : coordination avec ASUS Europe et application des correctifs techniques via Jira, en lien avec Taiwan.</p>
                <p>Support et traduction : adaptation des contenus marketing en français et assistance technique pour les campagnes européennes.</p>
                <p>Participation aux réunions marketing : contribution aux stratégies digitales et intégration des initiatives marketing sur les plateformes web.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="mb-1">
                <div>
                  <h3 className="text-base font-semibold inline">MGS Informatique</h3>
                  <span className="text-gray-500 ml-1">• Développeur Web Junior</span>
                </div>
                <div className="text-gray-500 text-sm">Septembre 2018 - Février 2019</div>
              </div>
              <div className="text-sm space-y-1">
                <p>Conception, développement, gestion et maintenance des sites web.</p>
                <p>Formation de l'équipe sur HTML, CSS et WordPress.</p>
                <p>Consultation et analyse des besoins de l'entreprise cliente.</p>
              </div>
            </div>
          </section>

     
          <section className="mb-8">
            <h2 className="text-xl text-base-content font-normal mb-4">Education</h2>
            
            <div className="mb-6">
              <div className="mb-1">
                <div>
                  <h3 className="text-base font-semibold inline">IFOCOP</h3>
                  <span className="text-gray-500 ml-1">• Formation développeur intégrateur Web</span>
                </div>
                <div className="text-gray-500 text-sm">Septembre 2018 - Février 2019</div>
              </div>
              <div className="text-sm space-y-1">
                <p>HTML 5 / CSS 3 / JavaScript ES6</p>
                <p>CMS WordPress / Drupal</p>
                <p>Intégration et gestion MySQL BDD</p>
              </div>
            </div>
          </section>

  
          <div className="flex flex-col md:flex-row gap-8">
            <section className="w-full md:w-1/2">
              <h2 className="text-xl text-base-content font-normal mb-4">Soft Skills & Skills</h2>
              <div className="text-sm space-y-2">
                <p>Empathique, Autonome, Coopératif, Créatif</p>
                <p>Idéation, Brainstorming, Design, Maquettage, Prototypage</p>
                <p>Conception, Développement, Optimisation, Support technique</p>
              </div>
            </section>

            <section className="w-full md:w-1/2">
              <h2 className="text-xl text-base-content font-normal mb-4">Tools</h2>
              
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-semibold">My Framework</span>
                  <span className="text-gray-500 ml-1">• Vue/Nuxt3, React/Next, AngularJs</span>
                </div>
                
                <div>
                  <span className="font-semibold">Data</span>
                  <span className="text-gray-500 ml-1">• SQL, GraphQL</span>
                </div>
                
                <div>
                  <span className="font-semibold">Back-end</span>
                  <span className="text-gray-500 ml-1">• Node.Js, Express</span>
                </div>
                
                <div>
                  <span className="font-semibold">Design</span>
                  <span className="text-gray-500 ml-1">• Figma, PhotoShop</span>
                </div>
                
                <div>
                  <span className="font-semibold">Management</span>
                  <span className="text-gray-500 ml-1">• JIRA, Trello</span>
                </div>
                
                <div>
                  <span className="font-semibold">Animation</span>
                  <span className="text-gray-500 ml-1">• GSAP, Motion</span>
                </div>
                
                <div>
                  <span className="font-semibold">WebGL</span>
                  <span className="text-gray-500 ml-1">• Three, Tres, Fiber</span>
                </div>
                
                <div>
                  <span className="font-semibold">CMS</span>
                  <span className="text-gray-500 ml-1">• Strapi</span>
                </div>
                
                <div>
                  <span className="font-semibold">3D</span>
                  <span className="text-gray-500 ml-1">• Blender</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div >
      */
  };
}
