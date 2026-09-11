import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate } from 'framer-motion';
import { Terminal, Shield, Code, Server, ExternalLink, Activity, Cpu, Network, X, FileText, Lock, LayoutDashboard, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

// --- DONNÉES ---
const portfolioData = {
  hero: {
    name: "Mattéo Cnudde",
    title: "Je construis, j'expérimente et je sécurise des systèmes.",
    description: "Étudiant en BTS CIEL, passionné par l'infrastructure, les réseaux et la cybersécurité. Mon approche est pratique : comprendre la mécanique interne pour mieux bâtir et protéger.",
  },
  socials: {
    github: "https://github.com/cnuddeMatteo",
    linkedin: "https://www.linkedin.com/in/mattéo-cnudde-71a7b5327/",
    email: "cnudde.matteo.59@gmail.com",
    googleDocElonet: "https://docs.google.com/document/d/1T9f7jsaHSbk0Q6yqd7iFHjCJDmpE9Drh2URZ_G4Vm2c/edit?usp=sharing",
    cv: "/CV_Matteo_Cnudde.pdf" 
  }
};

// Composant de fondu au scroll
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // État pour l'intro "MC"
  const [showIntro, setShowIntro] = useState(true);

  // Gérer l'intro et le blocage du scroll
  useEffect(() => {
    // Désactive l'intro après 2 secondes
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedProject || showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject, showIntro]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const background = useTransform(scrollYProgress, [0, 1], ["#05070D", "#020306"]);
  const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const filterTemplate = useMotionTemplate`hue-rotate(${hueRotate}deg)`;
  
  // Effets de profondeur (Parallax)
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <>
      {/* 0. INTRO CINÉMATIQUE "MC" */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070D]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-7xl font-display font-extrabold text-white tracking-[0.2em]"
            >
              MC
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div ref={containerRef} style={{ background }} className="min-h-screen text-text_main font-sans selection:bg-primary/30 selection:text-primary relative overflow-hidden transition-colors duration-700 ease-in-out">
        
        {/* 1. MESH GRADIENT AVEC EFFET DE PROFONDEUR (SCALE) */}
        <motion.div 
          className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          style={{ filter: filterTemplate, scale: bgScale }}
        >
          <motion.div 
            animate={{ x: [0, 150, -50, 0], y: [0, 100, -100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full opacity-60"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0) 60%)' }}
          />
          <motion.div 
            animate={{ x: [0, -100, 100, 0], y: [0, -150, 50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full opacity-50"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0) 60%)' }}
          />
          <motion.div 
            animate={{ x: [0, 50, -150, 0], y: [0, -50, 150, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0) 60%)' }}
          />
        </motion.div>

        {/* 2. TEXTURE GRAIN & GRILLE (AVEC PARALLAX Y) */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        <motion.div 
          style={{ y: gridY }}
          className="fixed inset-[-50%] z-0 pointer-events-none bg-grid opacity-[0.15]"
        />
        
        {/* NAVBAR FLOTTANTE */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-max"
        >
          <nav className="flex items-center justify-center gap-4 sm:gap-6 px-6 py-3 rounded-full bg-surface/60 backdrop-blur-md border border-white/5 shadow-2xl">
            <span className="font-display font-bold text-white pr-4 border-r border-white/10 hidden sm:block">MC</span>
            <a href="#about" className="text-sm font-medium text-text_muted hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-sm font-medium text-text_muted hover:text-white transition-colors">Projects</a>
            <a href="#certifications" className="text-sm font-medium text-text_muted hover:text-white transition-colors">Certifs</a>
            <a href="#lab" className="text-sm font-medium text-text_muted hover:text-white transition-colors">Lab</a>
          </nav>
        </motion.header>

        {/* --- MODALE PROJET --- */}
        <AnimatePresence>
          {selectedProject === 'elonet' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div 
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 20, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="bg-surface border border-border_subtle rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-surface/90 backdrop-blur-md border-b border-border_subtle p-6 flex justify-between items-center z-10">
                  <div className="flex items-center gap-4">
                    <Shield className="text-primary" size={28} />
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-white">Architecture Réseau & SDN <span className="text-text_muted text-lg font-normal hidden sm:inline">| Projet Elonet</span></h2>
                  </div>
                  <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-text_muted hover:text-white">
                    <X size={24} />
                  </button>
                </div>

                <div className="p-8 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-mono text-primary uppercase mb-3">Le Projet (Travail de groupe)</h3>
                      <p className="text-text_muted leading-relaxed text-lg">
                        Dans le cadre de mon BTS CIEL, nous avons conçu en équipe l'infrastructure complète d'un centre de formation et de coworking (TPE "Elonet"). Le défi : construire un réseau hautement disponible, centralisé et strictement cloisonné. 
                        En équipe, nous avons déployé un hyperviseur ESXi, des stockages RAID, un annuaire Samba AD (LDAP) automatisé en Python, et une commutation robuste avec agrégation de liens.
                      </p>
                    </div>
                    <div className="bg-[#05070d] p-6 rounded-xl border border-white/5">
                      <h4 className="text-white font-medium mb-4 flex items-center gap-2"><Server size={18} className="text-text_muted"/> Stack Globale</h4>
                      <ul className="space-y-2 text-sm font-mono text-text_muted">
                        <li>• Hyperviseur VMware ESXi</li>
                        <li>• Cisco Catalyst & Wi-Fi</li>
                        <li>• Debian / Samba AD</li>
                        <li>• pfSense & FreeRADIUS</li>
                        <li>• LAMP (Linux, Apache, MariaDB, PHP)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-12">
                    <h3 className="text-3xl font-display font-bold text-white mb-8">Ma contribution : Sécurité Périmétrale & Ingénierie Logicielle (SDN)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-6">
                          <Lock className="text-primary" size={24} />
                        </div>
                        <h4 className="text-xl font-medium text-white">Firewalling Zero Trust & Anti-Spoofing</h4>
                        <p className="text-text_muted leading-relaxed">
                          Conception du plan d'adressage (/20) et configuration intégrale du pare-feu pfSense. Implémentation d'une politique "Default Deny" stricte avec isolation des VLANs. Pour protéger le réseau d'administration, j'ai déployé un verrouillage de la couche liaison <strong>(Static ARP)</strong> empêchant toute attaque par usurpation d'adresse IP (IP Spoofing).
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20 mb-6">
                          <Network className="text-primary" size={24} />
                        </div>
                        <h4 className="text-xl font-medium text-white">Authentification Centralisée</h4>
                        <p className="text-text_muted leading-relaxed">
                          Mise en place d'un portail captif d'entreprise. Afin de garantir un SSO, j'ai interconnecté le serveur local FreeRADIUS avec l'annuaire Active Directory (Samba/Debian) de mon collègue via <strong>LDAP</strong>, incluant le dépannage des contraintes de chiffrement (Strong Authentication) exigées par les versions récentes de Samba.
                        </p>
                      </div>

                      <div className="md:col-span-2 space-y-4 bg-surface_hover p-8 rounded-xl border border-border_subtle mt-4">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                            <LayoutDashboard className="text-primary" size={24} />
                          </div>
                          <h4 className="text-xl font-medium text-white">Développement d'un Moteur SDN en PHP</h4>
                        </div>
                        <p className="text-text_muted leading-relaxed mb-6">
                          Au lieu de laisser les formateurs utiliser l'interface complexe de pfSense, j'ai développé un tableau de bord sur-mesure (Software-Defined Networking). Ce portail permet de <strong>couper l'accès internet d'une salle en un clic</strong>.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="p-4 bg-[#05070d] rounded-lg border border-white/5">
                            <strong className="text-white block mb-2">Sécurité Logicielle :</strong>
                            <span className="text-text_muted">Interactions BDD via PDO (requêtes préparées anti-injection SQL). Exécution des commandes réseau via SSH (clés asymétriques RSA) sans mots de passe en clair.</span>
                          </div>
                          <div className="p-4 bg-[#05070d] rounded-lg border border-white/5">
                            <strong className="text-white block mb-2">Traitement de Logs :</strong>
                            <span className="text-text_muted">Algorithme de parsing utilisant des Expressions Régulières (Regex) pour formater les logs syslog bruts, générer des alertes visuelles, et permettre des exports CSV conformes.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-12 flex flex-col items-center justify-center text-center">
                    <p className="text-text_muted mb-6">Envie d'entrer dans les détails techniques de l'infrastructure et du code ?</p>
                    <a 
                      href={portfolioData.socials.googleDocElonet} 
                      target="_blank" 
                      rel="noreferrer"
                      className="px-8 py-4 bg-primary text-[#05070D] font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-3 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
                    >
                      <FileText size={20} />
                      Consulter le Rapport de Projet Complet (Google Doc)
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ---------------------------------------------------- */}

        <main className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col gap-40">
          
          {/* 01 — HERO */}
          <section className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between gap-12 pt-12">
            <div className="flex-1">
              {/* Correction du bug visuel de surlignage : suppression du shadow sur le texte */}
              <FadeIn delay={2.3}>
                <div className="inline-flex items-center gap-3 mb-6 px-3 py-1.5 border border-primary/20 bg-primary/5 rounded-full backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-mono tracking-widest text-primary uppercase">
                    Cybersecurity • Systems • Networks
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay={2.5}>
                <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
                  {portfolioData.hero.name}
                </h1>
              </FadeIn>
              <FadeIn delay={2.7}>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-text_muted mb-6">
                  {portfolioData.hero.title}
                </h2>
              </FadeIn>
              <FadeIn delay={2.9}>
                <p className="max-w-xl text-lg text-text_muted leading-relaxed mb-10">
                  {portfolioData.hero.description}
                </p>
              </FadeIn>
              <FadeIn delay={3.1} className="flex flex-wrap gap-4">
                <a href="#projects" className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-lg">
                  Découvrir mon travail
                </a>
                <a href={portfolioData.socials.cv} target="_blank" rel="noreferrer" className="px-6 py-3 border border-primary/50 text-primary hover:bg-primary/10 rounded flex items-center gap-2 transition-colors font-medium bg-surface/30 backdrop-blur-sm">
                  <FileDown size={18} /> Télécharger mon CV
                </a>
                <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="px-6 py-3 border border-border_subtle hover:border-text_muted rounded text-white flex items-center gap-2 transition-colors bg-surface/50 backdrop-blur-sm">
                  <FaGithub size={18} /> GitHub
                </a>
              </FadeIn>
            </div>
            
            <FadeIn delay={3.3} className="flex-1 hidden lg:flex justify-end relative">
               <div className="w-[400px] h-[400px] relative border border-white/5 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-primary/20 rounded-full border-dashed"></motion.div>
                 <Network size={64} className="text-primary opacity-80" strokeWidth={1} />
                 <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-20 p-3 bg-surface/80 border border-white/10 rounded-lg shadow-lg"><Server size={20} className="text-text_muted"/></motion.div>
                 <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 right-10 p-3 bg-surface/80 border border-white/10 rounded-lg shadow-lg"><Shield size={20} className="text-primary"/></motion.div>
                 <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/2 -left-4 p-3 bg-surface/80 border border-white/10 rounded-lg shadow-lg"><Code size={20} className="text-text_muted"/></motion.div>
               </div>
            </FadeIn>
          </section>

          {/* 02 — ABOUT */}
          <section id="about" className="scroll-mt-32 relative z-10">
            <FadeIn>
              <h3 className="text-sm font-mono tracking-widest text-text_muted uppercase mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-border_subtle"></span> 01 — Background
              </h3>
            </FadeIn>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <FadeIn delay={0.1} className="lg:col-span-7">
                <h4 className="text-3xl md:text-4xl font-display font-semibold text-white leading-tight mb-6">
                  Comprendre comment les systèmes fonctionnent pour mieux les construire, les administrer et les sécuriser.
                </h4>
                <p className="text-text_muted leading-relaxed text-lg mb-8">
                  Mon approche de l'informatique repose sur la déconstruction. Plutôt que d'apprendre uniquement la théorie, je déploie mes propres environnements, configure mes réseaux et audite mes propres services.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {['Linux', 'Windows Server', 'Active Directory', 'pfSense', 'VLAN & Routage', 'Firewalling', 'Python', 'PHP', 'Docker', 'ESXi'].map(skill => (
                    <span key={skill} className="px-3 py-1 border border-border_subtle bg-surface/80 backdrop-blur-sm text-text_muted text-sm rounded-md shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="lg:col-span-4 lg:col-start-9 space-y-4">
                <div className="p-6 border border-border_subtle bg-surface/40 backdrop-blur-md rounded-xl shadow-lg">
                  <span className="text-xs font-mono text-primary mb-4 block">FORMATION</span>
                  
                  <div className="mb-5 pb-5 border-b border-white/5">
                    <h5 className="text-lg font-medium text-white">BTS CIEL</h5>
                    <p className="text-sm text-text_muted">Cybersécurité, Info & Réseaux<br/>2024 — 2026</p>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-medium text-white">Bac Général</h5>
                    <p className="text-sm text-text_muted">Spécialités NSI & Maths Expertes<br/>2024</p>
                  </div>
                </div>

                <div className="p-6 border border-border_subtle bg-surface/40 backdrop-blur-md rounded-xl shadow-lg">
                  <span className="text-xs font-mono text-primary mb-2 block">PHILOSOPHIE</span>
                  <h5 className="text-lg font-medium text-white">Autodidacte & Lab</h5>
                  <p className="text-sm text-text_muted">Apprentissage continu via CTFs, homelabs et documentation technique.</p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* 03 — PROJECTS */}
          <section id="projects" className="scroll-mt-32 relative z-10">
            <FadeIn className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-sm font-mono tracking-widest text-text_muted uppercase flex items-center gap-4">
                <span className="w-8 h-[1px] bg-border_subtle"></span> 02 — Projets & Ingénierie
              </h3>
              <a 
                href={portfolioData.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 text-xs font-mono text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full transition-colors border border-primary/20 w-max backdrop-blur-sm"
              >
                <FaGithub size={16} /> Explorer mon GitHub
              </a>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <FadeIn delay={0.1} className="md:col-span-2 group">
                <button 
                  onClick={() => setSelectedProject('elonet')}
                  className="w-full text-left relative overflow-hidden border border-border_subtle bg-surface/80 backdrop-blur-sm rounded-2xl flex flex-col md:flex-row hover:border-primary/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] transition-all cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <span className="bg-primary/20 text-primary px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2">
                      Lire le rapport <ExternalLink size={16} />
                    </span>
                  </div>

                  <div className="p-8 md:p-12 flex-1 flex flex-col justify-center z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="text-primary" size={24} />
                      <span className="text-xs font-mono text-primary uppercase">Featured • Infrastructure & SDN</span>
                    </div>
                    <h4 className="text-3xl font-display font-bold text-white mb-4">Architecture Réseau Sécurisée</h4>
                    <p className="text-text_muted mb-8 leading-relaxed">
                      Conception d'un réseau d'entreprise virtualisé "Zero Trust". Isolation par VLANs, portail captif RADIUS couplé à Active Directory, et développement d'un Dashboard d'administration SDN (PHP/SSH) pilotant le pare-feu.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {['pfSense', 'SDN', 'PHP (PDO)', 'Samba AD', 'VMware', 'Cisco'].map(t => (
                        <span key={t} className="px-2 py-1 bg-surface_hover text-xs font-mono text-text_muted rounded border border-border_subtle">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full md:w-[45%] bg-[#080d1a]/50 relative border-l border-border_subtle p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
                    <pre className="font-mono text-[10px] sm:text-xs text-primary/70 leading-relaxed z-10 relative">
{`INTERNET
  │
[ FIREWALL ] ── SDN (PHP)
  ├── VLAN 10 (ADMIN)
  ├── VLAN 20 (SERVERS)
  │    └─ AD / DNS
  ├── VLAN 30 (USERS)
  └── DMZ
       └─ WEB`}
                    </pre>
                  </div>
                </button>
              </FadeIn>

              <FadeIn delay={0.2} className="group cursor-pointer">
                <a href="https://github.com/cnuddeMatteo/cyber_nexus" target="_blank" rel="noreferrer" className="block h-full border border-border_subtle bg-surface/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-surface transition-colors relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                  <Terminal size={28} className="text-primary mb-6" />
                  <h4 className="text-2xl font-display font-bold text-white mb-3">Cyber_Nexus</h4>
                  <p className="text-text_muted mb-6">Environnement interactif autour de la cybersécurité. Exploration de concepts clés et documentation d'apprentissage technique.</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-mono text-text_muted">#Security</span>
                    <span className="text-xs font-mono text-text_muted">#Web</span>
                  </div>
                </a>
              </FadeIn>

              <FadeIn delay={0.3} className="group cursor-pointer">
                <a href="https://github.com/cnuddeMatteo/simulation_nexus" target="_blank" rel="noreferrer" className="block h-full border border-border_subtle bg-surface/60 backdrop-blur-sm rounded-2xl p-8 hover:bg-surface transition-colors relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={20} className="text-white" />
                  </div>
                  <Activity size={28} className="text-primary mb-6" />
                  <h4 className="text-2xl font-display font-bold text-white mb-3">Simulation_Nexus</h4>
                  <p className="text-text_muted mb-6">Moteur de simulations interactives (Jeu de la Vie, réaction-diffusion) pour comprendre l'algorithmique avancée.</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-mono text-text_muted">#Algorithmique</span>
                    <span className="text-xs font-mono text-text_muted">#JS</span>
                  </div>
                </a>
              </FadeIn>
            </div>
          </section>

          {/* 04 — CERTIFICATIONS & PLATEFORMES */}
          <section id="certifications" className="scroll-mt-32 relative z-10">
            <FadeIn>
              <h3 className="text-sm font-mono tracking-widest text-text_muted uppercase mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-border_subtle"></span> 03 — Certifications & Plateformes
              </h3>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeIn delay={0.1}>
                <div className="bg-surface/60 backdrop-blur-md border border-border_subtle rounded-2xl p-8 hover:border-[#00bceb]/50 transition-colors flex flex-col items-center text-center group h-full shadow-xl">
                  <div className="w-16 h-16 bg-[#00bceb]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Network className="text-[#00bceb]" size={32} />
                  </div>
                  <h4 className="text-white font-display font-bold text-xl mb-3">Cisco NetAcad</h4>
                  <p className="text-text_muted text-sm leading-relaxed">
                    Formation et validation des acquis en réseaux informatiques (Routing, Switching, sécurité fondamentale & administration matérielle).
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-surface/60 backdrop-blur-md border border-border_subtle rounded-2xl p-8 hover:border-white/50 transition-colors flex flex-col items-center text-center group h-full shadow-xl">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Terminal className="text-white" size={32} />
                  </div>
                  <h4 className="text-white font-display font-bold text-xl mb-3">TryHackMe</h4>
                  <p className="text-text_muted text-sm leading-relaxed">
                    Apprentissage continu via des laboratoires virtuels (fondamentaux Red Team, Blue Team, et exploitation de failles Web).
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="bg-surface/60 backdrop-blur-md border border-border_subtle rounded-2xl p-8 hover:border-yellow-500/50 transition-colors flex flex-col items-center text-center group h-full shadow-xl">
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="text-yellow-500" size={32} />
                  </div>
                  <h4 className="text-white font-display font-bold text-xl mb-3">Root-Me</h4>
                  <p className="text-text_muted text-sm leading-relaxed">
                    Pratique intensive de la cybersécurité (défis CTF, réseaux, web client/serveur) sur la plateforme d'entraînement francophone.
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* 05 — SECURITY LAB */}
          <section id="lab" className="scroll-mt-32 relative z-10">
            <FadeIn>
              <h3 className="text-sm font-mono tracking-widest text-text_muted uppercase mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-border_subtle"></span> 04 — Security Lab
              </h3>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-[#0c0c0c]/80 backdrop-blur-xl rounded-xl border border-gray-800 overflow-hidden shadow-2xl font-mono text-sm sm:text-base text-gray-300">
              <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500 border border-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500 border border-green-500/50"></div>
                 </div>
                 <span className="text-gray-400 text-xs mx-auto">matteo@sec-lab: ~</span>
              </div>
              
              <div className="p-6 md:p-8 space-y-6">
                 <div>
                    <span className="text-green-500 font-bold">matteo@sec-lab</span><span className="text-white">:</span><span className="text-blue-400 font-bold">~</span><span className="text-white">$</span> whoami
                    <br/>
                    <span className="text-gray-400 mt-2 block">
                      Étudiant en réseau & cybersécurité, sysadmin en devenir.
                    </span>
                 </div>

                 <div>
                    <span className="text-green-500 font-bold">matteo@sec-lab</span><span className="text-white">:</span><span className="text-blue-400 font-bold">~</span><span className="text-white">$</span> cat current_focus.txt
                    <br/>
                    <span className="text-gray-400 mt-2 block space-y-1">
                      {'>'} TryHackMe Practice  : <span className="text-green-400">[ACTIVE]</span><br/>
                      {'>'} Root-Me CTF         : <span className="text-green-400">[ONLINE]</span><br/>
                      {'>'} Local VM Lab (ESXi) : <span className="text-primary">[RUNNING]</span>
                    </span>
                 </div>

                 <div>
                    <span className="text-green-500 font-bold">matteo@sec-lab</span><span className="text-white">:</span><span className="text-blue-400 font-bold">~</span><span className="text-white">$</span> tail -n 4 /var/log/learning.log
                    <br/>
                    <span className="text-gray-400 mt-2 block space-y-1 text-xs md:text-sm">
                      [2026-09-11 08:22:10] [+] Deep dive into Active Directory security<br/>
                      [2026-09-11 09:14:05] [+] Wireshark pcap analysis completed<br/>
                      [2026-09-11 09:45:33] [+] Exploiting OWASP Top 10 vulnerabilities in lab<br/>
                      [2026-09-11 09:53:33] [+] Automating infrastructure tasks with Python...
                    </span>
                 </div>

                 <div className="flex items-center pt-2">
                    <span className="text-green-500 font-bold">matteo@sec-lab</span><span className="text-white">:</span><span className="text-blue-400 font-bold">~</span><span className="text-white">$</span>
                    <span className="w-2.5 h-5 bg-gray-300 ml-2 animate-pulse"></span>
                 </div>
              </div>
            </FadeIn>
          </section>

          {/* 06 — CONTACT & FOOTER */}
          <section className="pt-32 pb-12 border-t border-border_subtle flex flex-col items-center justify-center text-center relative z-10">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Prêt à échanger ?
              </h2>
              <p className="text-text_muted text-lg mb-10 max-w-lg mx-auto">
                Je recherche actuellement des opportunités (stage, alternance, premier emploi) dans les domaines des systèmes, réseaux et de la cybersécurité.
              </p>
              <a href={`mailto:${portfolioData.socials.email}`} className="px-8 py-4 bg-primary text-[#05070D] font-bold rounded-lg hover:bg-primary/90 transition-colors inline-block mb-16 shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)]">
                Me contacter par email
              </a>
            </FadeIn>

            <FadeIn delay={0.2} className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-12 text-text_muted text-sm">
              <p>© {new Date().getFullYear()} Mattéo Cnudde. Tous droits réservés.</p>
              <div className="flex gap-6">
                <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaGithub size={20} /></a>
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><FaLinkedin size={20} /></a>
              </div>
            </FadeIn>
          </section>

        </main>
      </motion.div>
    </>
  );
}