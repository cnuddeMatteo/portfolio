export const portfolioData = {
  hero: {
    name: "Mattéo Cnudde",
    title: "Étudiant en informatique & cybersécurité",
    subtitle: "Je construis, j'expérimente et je sécurise des systèmes.",
    description: "Actuellement en BTS CIEL, je suis passionné par l'infrastructure, les réseaux et le développement. Mon approche est avant tout pratique : j'apprends en montant des labs, en configurant des serveurs et en explorant les failles pour mieux m'en protéger.",
  },
  socials: {
    github: "https://github.com/cnuddeMatteo",
    linkedin: "https://www.linkedin.com/in/mattéo-cnudde-71a7b5327/", 
    email: "cnudde.matteo.59@gmail.com"
  },
  skills: [
    { category: "Cybersécurité", items: [{name: "Fondamentaux & OSINT", level: "Bonne maîtrise"}, {name: "Sécurité réseau", level: "Opérationnel"}, {name: "Blue Team / SOC (Notions)", level: "En apprentissage"}, {name: "CTF", level: "En apprentissage"}] },
    { category: "Réseaux", items: [{name: "TCP/IP, VLAN, Routage", level: "Bonne maîtrise"}, {name: "Firewall / ACL", level: "Opérationnel"}, {name: "DNS, DHCP, VPN", level: "Opérationnel"}] },
    { category: "Systèmes", items: [{name: "Linux (Debian/Ubuntu)", level: "Bonne maîtrise"}, {name: "Windows / Active Directory", level: "Opérationnel"}, {name: "Virtualisation (ESXi)", level: "Opérationnel"}] },
    { category: "Développement", items: [{name: "Python / Bash", level: "Opérationnel"}, {name: "JavaScript / HTML / CSS", level: "Opérationnel"}, {name: "C#", level: "En apprentissage"}] },
  ],
  projects: [
    {
      title: "Cyber_Nexus",
      description: "Environnement interactif autour de la cybersécurité. Exploration de concepts clés et documentation d'apprentissage technique.",
      tags: ["Cybersécurité", "Développement", "Documentation"],
      github: "https://github.com/cnuddeMatteo/cyber_nexus"
    },
    {
      title: "Simulation_Nexus",
      description: "Collection de simulations interactives (Jeu de la Vie, réaction-diffusion) pour comprendre les systèmes complexes et l'algorithmique.",
      tags: ["JavaScript", "Algorithmique", "Systèmes complexes"],
      github: "https://github.com/cnuddeMatteo/simulation_nexus"
    },
    {
      title: "Network Topology Builder",
      description: "Outil permettant de construire et visualiser des topologies réseau dynamiquement via une interface web.",
      tags: ["JavaScript", "Réseaux", "UI/UX"],
      github: "https://github.com/cnuddeMatteo/network-topology-builder"
    }
  ]
};