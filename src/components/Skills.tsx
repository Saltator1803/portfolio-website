"use client";

import React from "react";
import { motion } from "framer-motion";
import WavyTicker from "./WavyTicker";
import { 
  Sparkles, 
  Target, 
  Wrench, 
  Briefcase,
  TrendingUp,
  Search,
  Users,
  Map,
  FileText,
  ClipboardList,
  Megaphone,
  Activity,
  Handshake,
  CheckCircle,
  FlaskConical,
  RotateCw,
  Lightbulb,
  Rocket,
  UserCheck,
  Layers,
  GitBranch,
  Network
} from "lucide-react";

// ============================================================================
// BRAND ICONS CUSTOM INLINE SVGS
// ============================================================================

const GoogleAnalyticsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <rect x="4" y="14" width="3" height="6" rx="1" fill="#F9AB00" />
    <rect x="10" y="8" width="3" height="12" rx="1" fill="#F25C05" />
    <rect x="16" y="4" width="3" height="16" rx="1" fill="#E37400" />
  </svg>
);

const MixpanelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none">
    <circle cx="6" cy="12" r="3.5" fill="#7856FF" />
    <circle cx="12.5" cy="8" r="2.5" fill="#A088FF" />
    <circle cx="17.5" cy="15" r="2" fill="#D3C9FF" />
  </svg>
);

const AmplitudeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none" stroke="#2285FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l5.5-9.5 4.5 7.5 3-5 5 7" />
  </svg>
);

const SqlIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none" stroke="#33B3FF" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="7" ry="2.5" />
    <path d="M5 5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" />
    <path d="M5 10v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
    <path d="M5 15v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5v-5" />
  </svg>
);

const TableauIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none" strokeWidth="2.2" strokeLinecap="round">
    <path d="M12 7v10M7 12h10" stroke="#E15759" />
    <path d="M5 10v4M3 12h4" stroke="#4E79A7" strokeWidth="1.4" />
    <path d="M19 10v4M17 12h4" stroke="#76B7B2" strokeWidth="1.4" />
    <path d="M12 3v4M10 5h4" stroke="#59A14F" strokeWidth="1.4" />
    <path d="M12 17v4M10 19h4" stroke="#EDC948" strokeWidth="1.4" />
  </svg>
);

const PowerBiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <rect x="4" y="12" width="4" height="8" rx="0.5" fill="#F2C811" />
    <rect x="10" y="7" width="4" height="13" rx="0.5" fill="#F29F05" />
    <rect x="16" y="2" width="4" height="18" rx="0.5" fill="#D97904" />
  </svg>
);

const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 text-white" fill="currentColor">
    <path d="M4 3h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm2.5 3v12H9l6-7.5V18h2.5V6H15L9 13.5V6H6.5z"/>
  </svg>
);

const GoogleSheetsIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#0F9D58" />
    <path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h10v2H7z" fill="white" />
  </svg>
);

const JiraIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="#0052CC">
    <path d="M11.6 2.1l-9 9c-.8.8-.8 2 0 2.8l2 2c.8.8 2 .8 2.8 0l9-9c.8-.8.8-2 0-2.8l-2-2c-.8-.8-2-.8-2.8 0zm6 6l-6 6c-.8.8-.8 2 0 2.8l2 2c.8.8 2 .8 2.8 0l6-6c.8-.8.8-2 0-2.8l-2-2c-.8-.8-2-.8-2.8 0z" />
  </svg>
);

const ConfluenceIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="#0052CC">
    <path d="M12 2l10 10-10 10-1.4-1.4L19.2 12 10.6 3.4 12 2zm-6 0l10 10-10 10-1.4-1.4L13.2 12 4.6 3.4 6 2z" />
  </svg>
);

const MiroIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <rect width="24" height="24" rx="5" fill="#FFD000" />
    <path d="M5 8h2v8H5V8zm4 0h2v8H9V8zm4 0h2v8h-2V8zm4 0h2v8h-2V8z" fill="#050038" />
  </svg>
);

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <circle cx="6" cy="10" r="2" fill="#36C5F0" />
    <rect x="8" y="8" width="4" height="4" rx="2" fill="#36C5F0" />
    <circle cx="14" cy="6" r="2" fill="#E01E5A" />
    <rect x="12" y="8" width="4" height="4" rx="2" fill="#E01E5A" />
    <circle cx="18" cy="14" r="2" fill="#ECB22E" />
    <rect x="12" y="12" width="4" height="4" rx="2" fill="#ECB22E" />
    <circle cx="10" cy="18" r="2" fill="#2EB67D" />
    <rect x="8" y="12" width="4" height="4" rx="2" fill="#2EB67D" />
  </svg>
);

const AntygravityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none" stroke="#D4AF37" strokeWidth="2.2">
    <path d="M12 2L2 20h20L12 2zm0 4.5l6 11.5H6L12 6.5z" />
    <circle cx="12" cy="13" r="2.2" fill="#D4AF37" />
  </svg>
);

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <path d="M8 2h4v8H8a4 4 0 1 1 0-8z" fill="#F24E1E" />
    <path d="M12 2h4a4 4 0 0 1 0 8h-4V2z" fill="#FF7262" />
    <path d="M8 10h4v4H8a4 4 0 1 1 0-4z" fill="#A259FF" />
    <circle cx="14" cy="12" r="2" fill="#18A0FB" />
    <path d="M8 14h4v4a4 4 0 1 1-4-4z" fill="#1ABC9C" />
  </svg>
);

const CanvaIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <circle cx="12" cy="12" r="10" fill="url(#canva-grad-wavy-stacked-final-tight)" />
    <text x="12" y="15.5" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" fill="white" textAnchor="middle">C</text>
    <defs>
      <linearGradient id="canva-grad-wavy-stacked-final-tight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00C4CC" />
        <stop offset="100%" stopColor="#7D2AE8" />
      </linearGradient>
    </defs>
  </svg>
);

const BalsamiqIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="none" stroke="#CC0000" strokeWidth="2.5">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9 10.5h.01M15 10.5h.01M9 14.5c1.5 1.8 4.5 1.8 6 0" strokeLinecap="round" />
  </svg>
);

const GoogleAiStudioIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="#4285F4">
    <path d="M12 2l2.2 7 7 2.2-7 2.2-2.2 7-2.2-7-7-2.2 7-2.2z" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="white">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.08-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.18 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
  </svg>
);

const PostmanIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <circle cx="12" cy="12" r="10" fill="#FF6C37" />
    <path d="M12 6c-1.8 1.8-2.5 4.5-2.5 6.5h5c0-2-.7-4.7-2.5-6.5zm-2 8.5h4l0.8 1.5H9.2l0.8-1.5z" fill="white" />
  </svg>
);

const VsCodeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="#007ACC">
    <path d="M19.5 4.5L14 3v18l5.5-1.5V4.5zM12 7.5L5.5 12 12 16.5v-9zM3 9.5l3 2.5-3 2.5v-5z"/>
  </svg>
);

const ChatGptIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5" fill="#10A37F">
    <path d="M19 12a7 7 0 1 1-7-7c.4 0 .7.1 1 .2v2.1c-.3-.2-.6-.3-1-.3a5 5 0 1 0 5 5h2z" />
    <circle cx="12" cy="12" r="2.5" fill="#10A37F" />
  </svg>
);

const GeminiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
    <path d="M12 2C12 2 12 8 8 12C12 16 12 22 12 22C12 22 12 16 16 12C12 8 12 2 12 2Z" fill="url(#gemini-grad-wavy-stacked-skills-final-tight)" />
    <defs>
      <linearGradient id="gemini-grad-wavy-stacked-skills-final-tight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="100%" stopColor="#9B72CB" />
      </linearGradient>
    </defs>
  </svg>
);

// ============================================================================
// COMPONENT MAIN
// ============================================================================

export default function Skills() {
  const productStrategy = [
    { title: "Market Research", icon: <TrendingUp className="w-5.5 h-5.5 text-blue-400" /> },
    { title: "Product Discovery", icon: <Search className="w-5.5 h-5.5 text-purple-400" /> },
    { title: "User Research", icon: <Users className="w-5.5 h-5.5 text-green-400" /> },
    { title: "Product Roadmapping", icon: <Map className="w-5.5 h-5.5 text-orange-400" /> },
    { title: "PRD Writing", icon: <FileText className="w-5.5 h-5.5 text-yellow-400" /> },
    { title: "RICE Prioritization", icon: <ClipboardList className="w-5.5 h-5.5 text-pink-400" /> },
    { title: "GTM Strategy", icon: <Megaphone className="w-5.5 h-5.5 text-teal-400" /> },
    { title: "Product Metrics & Analytics", icon: <Activity className="w-5.5 h-5.5 text-sky-400" /> },
    { title: "Stakeholder Management", icon: <Handshake className="w-5.5 h-5.5 text-rose-400" /> },
    { title: "A/B Testing", icon: <CheckCircle className="w-5.5 h-5.5 text-emerald-400" /> },
    { title: "Experimentation & Optimization", icon: <FlaskConical className="w-5.5 h-5.5 text-violet-400" /> }
  ];

  const methodologies = [
    { title: "Agile & Scrum", icon: <RotateCw className="w-5.5 h-5.5 text-green-400" /> },
    { title: "Design Thinking", icon: <Lightbulb className="w-5.5 h-5.5 text-yellow-400" /> },
    { title: "Lean Startup", icon: <Rocket className="w-5.5 h-5.5 text-blue-400" /> },
    { title: "Jobs-to-be-Done (JTBD)", icon: <UserCheck className="w-5.5 h-5.5 text-indigo-400" /> },
    { title: "DMAIC", icon: <Layers className="w-5.5 h-5.5 text-emerald-400" /> },
    { title: "Opportunity Tree", icon: <GitBranch className="w-5.5 h-5.5 text-cyan-400" /> },
    { title: "Impact Mapping", icon: <Network className="w-5.5 h-5.5 text-pink-400" /> }
  ];

  const toolsList1 = [
    { name: "Confluence", icon: <ConfluenceIcon /> },
    { name: "Miro", icon: <MiroIcon /> },
    { name: "Slack", icon: <SlackIcon /> },
    { name: "Jira", icon: <JiraIcon /> },
    { name: "Notion", icon: <NotionIcon /> },
    { name: "Google Sheets", icon: <GoogleSheetsIcon /> },
    { name: "Google Analytics", icon: <GoogleAnalyticsIcon /> },
    { name: "SQL", icon: <SqlIcon /> },
    { name: "Tableau", icon: <TableauIcon /> },
    { name: "Power BI", icon: <PowerBiIcon /> }
  ];

  const toolsList2 = [
    { name: "Figma", icon: <FigmaIcon /> },
    { name: "Canva", icon: <CanvaIcon /> },
    { name: "Postman", icon: <PostmanIcon /> },
    { name: "VS Code", icon: <VsCodeIcon /> },
    { name: "Antygravity", icon: <AntygravityIcon /> },
    { name: "Google AI Studio", icon: <GoogleAiStudioIcon /> },
    { name: "ChatGPT", icon: <ChatGptIcon /> },
    { name: "Gemini", icon: <GeminiIcon /> },
    { name: "GitHub", icon: <GithubIcon /> }
  ];

  // ============================================================================
  // CARD RENDERERS
  // ============================================================================

  // Card Type 1: Square card for Product Strategy (w-24 h-24 / 96px)
  const renderSquareCard = (title: string, icon: React.ReactNode) => (
    <div className="flex flex-col items-center justify-center gap-2 w-24 h-24 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 p-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="flex-shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[9.5px] font-mono font-medium text-white/90 text-center leading-tight tracking-normal w-full px-1 break-words select-none">
        {title}
      </span>
    </div>
  );

  // Card Type 2: Horizontal rectangular card for Frameworks (w-[170px] h-14 / 170px)
  const renderHorizontalCard = (title: string, icon: React.ReactNode) => (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 w-[170px] h-14 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="flex-shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[10px] font-mono font-medium text-white/90 text-left leading-tight truncate max-w-full select-none">
        {title}
      </span>
    </div>
  );

  // Card Type 3: Vertical rectangular card for Tools (w-22 h-24 / 88px)
  const renderToolCard = (name: string, icon: React.ReactNode) => (
    <div className="flex flex-col items-center justify-center gap-2 w-22 h-24 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 p-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shadow-md">
        {icon}
      </div>
      <span className="text-[9.5px] font-mono text-luxuryMuted text-center truncate max-w-full leading-tight select-none">
        {name}
      </span>
    </div>
  );

  const productStrategyItems = productStrategy.map(item => 
    renderSquareCard(item.title, item.icon)
  );

  const methodologyItems = methodologies.map(item => 
    renderHorizontalCard(item.title, item.icon)
  );

  const track1Tools = toolsList1.map(tool => 
    renderToolCard(tool.name, tool.icon)
  );

  const track2Tools = toolsList2.map(tool => 
    renderToolCard(tool.name, tool.icon)
  );

  return (
    <section id="skills" className="relative py-16 bg-background border-b border-luxuryBorder z-20 flex flex-col items-center overflow-hidden">
      
      {/* Decorative ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-luxuryGold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-luxuryGold/5 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl w-full px-8 md:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 relative">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs tracking-ultraWide text-luxuryGold uppercase font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-luxuryGold" />
              / 02.8 — CORE CAPABILITIES
            </h2>
            <span className="text-3xl md:text-4xl font-light text-white tracking-widest uppercase block">
              SKILLS <span className="text-white">&</span> <span className="text-luxuryGold font-medium">TOOLKIT</span>
            </span>
          </div>
        </div>

        {/* Glowing Separator Line with Flare */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-luxuryBorder to-transparent relative my-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-luxuryGold blur-[6px] opacity-75" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-[1.5px] bg-white blur-[2px] opacity-85" />
        </div>

        {/* Tight vertical marquee flow without any card containers */}
        <div className="flex flex-col gap-9 w-full">
          
          {/* SECTION 1: PRODUCT STRATEGY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-luxuryGold" />
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase font-mono">
                  Product Strategy
                </h3>
              </div>
              <span className="text-[9px] text-luxuryMuted font-mono uppercase tracking-wider flex items-center gap-1.5">
                11 strategy tracks · ➔
              </span>
            </div>

            {/* Straight Ticker with 0 padding */}
            <WavyTicker 
              items={productStrategyItems} 
              direction="left" 
              speed={34} 
              waveAmplitude={0}
              itemWidth={96}
              gap={14}
              padding={0}
            />
          </motion.div>

          {/* SECTION 2: FRAMEWORKS & METHODOLOGIES */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="w-full flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-luxuryGold" />
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase font-mono">
                  Frameworks & Methodologies
                </h3>
              </div>
              <span className="text-[9px] text-luxuryMuted font-mono uppercase tracking-wider flex items-center gap-1.5">
                7 methodology slots · ➔
              </span>
            </div>

            {/* Straight Ticker with 0 padding */}
            <WavyTicker 
              items={methodologyItems} 
              direction="right" 
              speed={34} 
              waveAmplitude={0}
              itemWidth={170}
              gap={14}
              padding={0}
            />
          </motion.div>

          {/* SECTION 3: TOOLS & PLATFORMS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-luxuryGold" />
                <h3 className="text-xs font-semibold tracking-widest text-white uppercase font-mono">
                  Tools & Platforms
                </h3>
              </div>
              <span className="text-[9px] text-luxuryMuted font-mono uppercase tracking-wider flex items-center gap-1.5">
                21 brands auto-waving · ➔
              </span>
            </div>

            {/* Double-row Tool Tickers with 0 padding */}
            <div className="flex flex-col gap-3">
              <WavyTicker 
                items={track1Tools} 
                direction="left" 
                speed={36} 
                waveAmplitude={0}
                itemWidth={88}
                gap={14}
                padding={0}
              />
              <WavyTicker 
                items={track2Tools} 
                direction="right" 
                speed={36} 
                waveAmplitude={0}
                itemWidth={88}
                gap={14}
                padding={0}
              />
            </div>
          </motion.div>

        </div>

        <div className="text-center pointer-events-none mt-8">
          <span className="text-[9px] uppercase font-mono tracking-superWide text-luxuryMuted/70">
            Hover tickers to slow down auto-scrolling track
          </span>
        </div>

      </div>
    </section>
  );
}
