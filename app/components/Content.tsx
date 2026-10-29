/* ==========================================================================
   MODERN4LABS — SHARED CONTENT
   Used by the homepage and /about so team details and results stay in sync.
   ========================================================================== */

export const RESULTS = [
  { value: "+45%", label: "Increase in qualified leads", client: "Sunblock Property" },
  { value: "3.2x", label: "Return on ad spend", client: "The Search Bar" },
  { value: "975K+", label: "Revenue generated for clients", client: "Across client campaigns" },
];

/* Add portraits to /public/team (e.g. /team/eshan.jpg) and set `photo`.
   Without a photo the card shows initials. */
export type Member = {
  name: string;
  title: string; // short title under the portrait
  role: string; // full role in the panel
  qualification: string;
  experience: string;
  bio: string;
  focus: string[];
  photo?: string;
};

export const TEAM: Member[] = [
  {
    name: "Eshan Madushka",
    photo: "/team/profileeshan.jpg",
    title: "Creative Director",
    role: "Co-Founder, Creative Director & Content Strategist",
    qualification: "BBA (Hons) in Marketing Management",
    experience: "5+ years",
    bio: "Leads creative direction, video editing, content production and social media strategy. Focused on compelling creative concepts, strong brand identities and content strategies that drive audience engagement and brand growth.",
    focus: ["Creative direction", "Video editing", "Content production", "Social media strategy", "Brand identity"],
  },
  {
    name: "Oneth Meraj",
    photo: "/team/profileoneth.jpg",
    title: "Technology & Growth",
    role: "Co-Founder, Technology & Growth Strategist",
    qualification: "BSc (Hons) in Software Engineering",
    experience: "4+ years",
    bio: "Full-stack engineer and tech lead specialising in technology development, backend systems, AI-driven solutions and business growth strategy. Focused on building scalable digital solutions that drive business growth.",
    focus: ["Full-stack development", "Backend systems", "AI solutions", "Growth strategy", "Client management"],
  },
  {
    name: "Riftha",
    photo: "/team/profileriftha.jpg",
    title: "Head of Operations",
    role: "Head of Operations",
    qualification: "BBA (Hons) in Marketing Management",
    experience: "4+ years",
    bio: "Runs day-to-day operations, team coordination, workflow management and project delivery, making sure every project is executed smoothly from start to finish.",
    focus: ["Operations", "Team coordination", "Workflow management", "Project delivery"],
  },
];