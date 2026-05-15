/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from 'motion/react';
import { ArrowUpRight, ArrowLeft, Home, Phone, MessageCircle, Instagram, Sparkles, ChevronRight, Layers, Box, Settings, Search, CheckCircle2, AlertCircle, Info, Filter, MoreHorizontal, MapPin, Mail, Globe } from 'lucide-react';

// --- Components ---

const Header = ({ scrolled }: { scrolled: boolean }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <header 
      className={`fixed top-0 left-0 w-full h-[80px] z-[999] flex items-center justify-between px-12 transition-all duration-700 ease-in-out`}
      style={{
        background: scrolled ? 'rgba(187, 187, 188, 0.12)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        border: 'none',
        boxShadow: 'none'
      }}
    >
      
      <div className="text-white font-sans text-sm tracking-[0.2em] flex items-center">
        EVY® <span className="mx-4 opacity-20">/</span> <span className="opacity-60">INTERACTION DESIGNER</span>
      </div>
      
      <div className="text-white/40 font-sans text-[10px] tracking-[0.3em]">
        {formattedTime}
      </div>
    </header>
  );
};

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = ['PROJECT', 'ABOUT'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'PROJECT') {
      const gallerySection = document.getElementById('gallery-section');
      gallerySection?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'ABOUT') {
      const heroSection = document.getElementById('hero-section');
      heroSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">      <nav 
        className="relative flex items-center justify-center gap-[3px] w-[220px] h-[36px] p-[3px] rounded-full overflow-hidden"
        style={{
          '--dock-glass': 'rgb(187, 187, 188)',
          '--dock-light': 'rgb(255, 255, 255)',
          '--dock-dark': 'rgb(0, 0, 0)',
          '--dock-reflex-light': '1',
          '--dock-reflex-dark': '1',
          background: 'rgba(187, 187, 188, 0.12)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          boxShadow: `
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 2px 3px 0 -2px rgba(255, 255, 255, 0.4),
            inset -2px -2px 0 -2px rgba(255, 255, 255, 0.3),
            inset -3px -8px 1px -6px rgba(255, 255, 255, 0.2),
            inset -0.3px -1px 4px 0 rgba(0, 0, 0, 0.15),
            inset -1.5px 2.5px 0 -2px rgba(0, 0, 0, 0.2),
            inset 0 3px 4px -2px rgba(0, 0, 0, 0.2),
            0 1px 4px rgba(0, 0, 0, 0.2),
            0 8px 24px rgba(0, 0, 0, 0.3)
          `
        } as React.CSSProperties}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`relative flex-1 h-full flex flex-col items-center justify-center transition-all duration-300 group ${
              activeTab === tab ? 'text-white' : 'text-[#777777] hover:text-white/60'
            }`}
          >
            {/* Active Background */}
            {activeTab === tab && (
              <motion.div
                layoutId="nav-active-bg"
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  borderRadius: '99em',
                  backgroundColor: 'color-mix(in srgb, var(--dock-glass) 36%, transparent)',
                  boxShadow: `
                    inset 0 0 0 1px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 10%), transparent),
                    inset 2px 1px 0 -1px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 90%), transparent),
                    inset -1.5px -1px 0 -1px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 80%), transparent),
                    inset -2px -6px 1px -5px color-mix(in srgb, var(--dock-light) calc(var(--dock-reflex-light) * 60%), transparent),
                    inset -1px 2px 3px -1px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 20%), transparent),
                    inset 0 -4px 1px -2px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 10%), transparent),
                    0 3px 6px color-mix(in srgb, var(--dock-dark) calc(var(--dock-reflex-dark) * 8%), transparent)
                  `,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
                transition={{ 
                  type: "tween",
                  ease: [1, 0, 0.4, 1],
                  duration: 0.4
                }}
              />
            )}

            <div className="relative">
              <span className="text-[10px] font-medium font-misans tracking-[0.03em] uppercase">
                {tab}
              </span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

interface ProjectCardProps {
  index: number;
  name: string;
  enName: string;
  description?: string;
  image: string;
  video?: string;
  tags?: string[];
  zhDesc?: string;
  enDesc?: string;
  onClick?: () => void;
  key?: React.Key;
}

const ProjectCard = ({ index, name, enName, tags, zhDesc, enDesc, image, video, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 cursor-pointer"
    >
      {/* Left Side: Text Content (5 Columns) */}
      <div className="md:col-span-5 flex flex-col justify-center transition-transform duration-500 group-hover:-translate-y-2">
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-medium text-white font-misans tracking-tight leading-tight">
              {name}
            </h3>
            <p className="text-[14px] font-normal text-white/60 font-sans tracking-wide">
              {enName}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags?.map((tag, i) => (
              <span key={i} className="text-[9px] px-2 py-1 rounded-sm border border-white/10 text-white/40 font-mono tracking-tighter uppercase">
                [ {tag} ]
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3 mt-4 max-w-[90%]">
            <p className="text-[12px] text-white/80 font-misans leading-relaxed">
              {zhDesc}
            </p>
            <p className="text-[12px] text-white/40 font-sans leading-relaxed">
              {enDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Card side (7 Columns) */}
      <div className="md:col-span-7 relative group/card">
        <div className="relative overflow-hidden rounded-[40px] bg-white/10 transition-all duration-700">
          {/* Animated Border Glow (Background) */}
          <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,#FF5032,#00FFFF,#0000FF,#FF5032)] opacity-60"
            />
          </div>

          {/* Inner Card Content (1px smaller to reveal the animated border) */}
          <div className="relative m-[1px] overflow-hidden rounded-[39px] bg-[#0A0A0A] transition-all duration-700">
            <div className="aspect-[16/10] w-full relative">
              {video ? (
                <video 
                  src={video} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
              ) : (
                <img
                  src={image}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Typewriter = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "INTERACTION DESIGNER",
    "AI-AUGMENTED CREATIVE",
    "MBA CANDIDATE",
    "HMI EXPERT"
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullPhrase = phrases[i];

      if (isDeleting) {
        setText(fullPhrase.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullPhrase.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === fullPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-[14px] text-white font-sans font-[200] tracking-[0.15em] uppercase drop-shadow-sm whitespace-pre">
        HELLO. I AM AN <span className="text-white">{text}</span>
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[1px] h-[14px] bg-[#FFB347] ml-1 align-middle"
        />
      </h1>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="hero-section" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Fluid Spectrum Glow (复刻图二效果) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ isolation: 'isolate' }}>
        <div className="relative w-full h-full flex items-center justify-center">

          {/* 我们用最保守的内联 filter: blur() 强行渲染，确保 100% 生效 */}
          {/* 层 1：左侧柔和的橙红 */}
          <div
            className="absolute left-1/2 -translate-x-[420px] w-[400px] h-[300px] rounded-full bg-[#FF5032] opacity-60 will-change-transform"
            style={{ mixBlendMode: 'screen', filter: 'blur(80px)', transform: 'translateZ(0) translateX(-420px)' }}
          />

          {/* 层 2：中心明亮的青色 (核心) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[450px] h-[320px] rounded-full bg-[#00FFFF] opacity-80 will-change-transform"
            style={{ mixBlendMode: 'screen', filter: 'blur(60px)', transform: 'translateZ(0) translateX(-50%)' }}
          />

          {/* 层 3：右侧深邃的蓝色 */}
          <div
            className="absolute left-1/2 translate-x-[160px] w-[400px] h-[300px] rounded-full bg-[#0000FF] opacity-50 will-change-transform"
            style={{ mixBlendMode: 'screen', filter: 'blur(50px)', transform: 'translateZ(0) translateX(160px)' }}
          />

        </div>
      </div>

      {/* Hero Text */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 text-center px-6"
      >
        <Typewriter />
      </motion.div>
    </section>
  );
};

const TextGlowWrapper = ({ children }: { children: React.ReactNode }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 40);
      mouseY.set(e.clientY - rect.top - 30);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Concentrated Spectrum Glow Blob */}
      <motion.div
        className="pointer-events-none absolute z-0 w-[80px] h-[60px] rounded-full blur-[15px] will-change-transform"
        style={{
          x: springX,
          y: springY,
          opacity: isHovered ? 0.6 : 0,
          background: 'linear-gradient(135deg, #FF5032 0%, #00FFFF 50%, #0000FF 100%)',
          mixBlendMode: 'screen',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const AboutSection = ({ setCursorType }: { setCursorType: (type: string) => void }) => {
  return (
    <section id="about-section" className="py-40 px-6 md:px-12 lg:px-32 bg-[#0A0A0A] text-white" style={{ fontFamily: '"Avenir Next", "Avenir", "Avenir-Light", "Helvetica Neue", Arial, sans-serif' }}>
      <div className="max-w-[1200px] mx-auto">
        
        {/* Layout inspired by reference image */}
        <div className="grid grid-cols-12 gap-8 md:gap-24 mb-20 items-start">
          
          {/* Left Column: Text Content */}
          <div className="col-span-12 md:col-span-6 space-y-16">
            <div className="space-y-4">
              <h1 className="text-[64px] font-normal tracking-tight leading-none">Me.</h1>
              <p className="text-[18px] text-white/30 font-light">(In short)</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[18px] font-medium tracking-wide">
                  Yinwei Huang <span className="text-white/20 font-normal mx-2">/</span> <span className="text-white/30 font-normal">UI / UX Designer</span>
                </h2>
                <p className="text-[14px] text-white/60 leading-[2.2] font-normal max-w-[500px]">
                  我是一名拥有 8 年互联网设计经验的 UI/UX 设计师，长期专注于复杂 B 端系统、自动驾驶研发工具链与 AI 辅助设计体验。擅长将复杂业务流程转化为清晰、可执行、易协作的产品体验，并推动设计方案在产品、研发 and 业务团队中落地。
                </p>
              </div>

              {/* Contact Information with Icons */}
              <div className="space-y-6 pt-12">
                <div className="flex items-center gap-6 group">
                  <div className="w-5 h-8 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white/40" />
                  </div>
                  <span className="text-[14px] text-white/60">+86 16619782808</span>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-5 h-8 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white/40" />
                  </div>
                  <span className="text-[14px] text-white/60">Beijing, China</span>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-5 h-8 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white/40" />
                  </div>
                  <span className="text-[14px] text-white/60">hywrich0216@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait */}
          <div className="col-span-12 md:col-span-6 relative">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/5 bg-neutral-900 group">
              <img 
                src="https://github.com/hywrich0216-commits/evy-portfolio-2026/blob/main/images/IMG_1274.JPG?raw=true" 
                alt="黄尹薇" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto">

        {/* Experience Section */}
        <div className="grid grid-cols-12 gap-8 mb-24 border-t border-white/10 pt-8">
          <div className="col-span-12 md:col-span-3">
            <h2 className="text-[14px] text-white/40 uppercase tracking-[0.3em] font-normal">Experience</h2>
          </div>
          <div className="col-span-12 md:col-span-9 space-y-20">
            {/* Main Role */}
            <div className="space-y-2">
              <p className="text-[14px] text-white font-medium">
                小米汽车 - 自动驾驶部门 
                <span className="text-white/20 font-normal mx-2">/</span> 
                <span className="text-white/40 font-normal">Beijing, China / 2023 – Present</span>
              </p>
              <div className="text-[14px] text-white/60 space-y-1.5 leading-relaxed font-normal">
                <p>负责 MiSim 仿真平台、Miviz Studio 可视化工具等内部研发平台 design</p>
                <p>优化任务创建、结果分析、对比诊断、场景管理等核心链路</p>
                <p>探索 AI Agent 与 platform 能力结合，提升研发工具使用效率</p>
              </div>
            </div>

            {/* Past Projects */}
            <div className="space-y-8 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                {[
                  { title: "海外社交 Web 产品", role: "Product Design", desc: "主导产品 0-1 的交互与视觉体系构建" },
                  { title: "清华国际展视觉设计", role: "Visual System", desc: "负责展会全案视觉落地与物料设计" },
                  { title: "聆心智能小程序 / App", role: "UX/UI Design", desc: "优化 AI 聊天产品的移动端交互体验" },
                  { title: "天格计划品牌设计", role: "Identity", desc: "科学实验项目的品牌规范与视觉传达" }
                ].map((proj, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-[14px] text-white font-medium">{proj.title} <span className="text-white/20 font-normal mx-2">/</span> <span className="text-white/40 font-normal">{proj.role}</span></p>
                    <p className="text-[14px] text-white/60 leading-relaxed">{proj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-12 gap-8 mb-24 border-t border-white/10 pt-2">
          <div className="col-span-12 md:col-span-3">
            <h2 className="text-[14px] text-white/40 uppercase tracking-[0.3em] font-normal">Skills</h2>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="text-[14px] text-white/40 font-normal">Design Expertise</h3>
                <div className="flex flex-col gap-y-3">
                  {[
                    "Complex Workflow Design",
                    "Enterprise UX Platforms",
                    "AI-native Interaction",
                    "Data Visualization",
                    "Cross-functional Collaboration"
                  ].map((s, i) => (
                    <span key={i} className="text-[14px] text-white/60 font-normal">{s}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-[14px] text-white/40 font-normal">Creative Toolchain</h3>
                <div className="flex flex-col gap-y-3">
                  {[
                    "Figma",
                    "Cursor",
                    "Claude",
                    "AI Studio",
                    "Vercel",
                    "GitHub",
                    "After Effects"
                  ].map((s, i) => (
                    <span key={i} className="text-[14px] text-white/60 font-normal">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Gallery = ({ onProjectSelect }: { onProjectSelect: (project: any) => void }) => {
  const projects = [
    { 
      name: "小米汽车—Miviz可视化分析平台", 
      enName: "Xiaomi EV - Miviz Visual Analysis Platform",
      tags: ["DATA VISUALIZATION", "B-END TOOL"],
      zhDesc: "负责车辆感知数据可视化与 B 端工具链设计，解决海量数据下的实时渲染与分析效率问题。",
      enDesc: "Responsible for vehicle perception data visualization and B-end toolchain design, solving real-time rendering and analysis efficiency issues under massive data.",
      image: "https://github.com/hywrich0216-commits/evy-portfolio-2026/blob/main/images/%E5%8F%AF%E8%A7%86%E5%8C%96-cover.png?raw=true",
    },
    { 
      name: "清华天格计划项目", 
      enName: "Tsinghua GRID Project",
      tags: ["SCIENTIFIC MONITORING", "CROSS-DISCIPLINARY"],
      zhDesc: "科学卫星数据监测看板设计，致力于在复杂业务中实现体验与战略的平衡。",
      enDesc: "Scientific satellite data monitoring dashboard design, dedicated to balancing experience and strategy in complex business.",
      image: "/主页.png",
    },
    { 
      name: "MIcar-B Design System", 
      enName: "MIcar-B Design System",
      tags: ["DESIGN SYSTEM", "COMPONENT LIBRARY"],
      zhDesc: "小米汽车 B 端组件库设计系统，构建统一的设计语言与工程化规范。",
      enDesc: "Xiaomi EV B-end component library design system, building a unified design language and engineering specifications.",
      image: "https://github.com/hywrich0216-commits/evy-portfolio-2026/blob/main/images/%E6%B1%BD%E8%BD%A6B%E7%AB%AF%E8%AE%BE%E8%AE%A1%E7%B3%BB%E7%BB%9Fcover.png?raw=true",
    },
    { 
      name: "小米汽车MiSim仿真平台", 
      enName: "Xiaomi MiSim Simulation Platform",
      tags: ["SYSTEM ARCHITECTURE", "HMI DESIGN"],
      zhDesc: "负责构建高精度的自动驾驶仿真界面，利用数据可视化技术解决复杂场景下的交互效率问题。",
      enDesc: "Architecting high-precision autonomous driving simulation interfaces, leveraging data visualization to solve complex interaction efficiency challenges.",
      image: "https://github.com/hywrich0216-commits/evy-portfolio-2026/blob/main/images/%E4%BB%BF%E7%9C%9F-cover.png?raw=true",
    },
    { 
      name: "清华国际艺术与设计展", 
      enName: "Tsinghua International Art & Design Exhibition",
      tags: ["IMMERSIVE EXHIBITION", "DIGITAL NARRATIVE"],
      zhDesc: "沉浸式线上展厅设计，探索数字化叙事在艺术展览中的应用。",
      enDesc: "Immersive online exhibition hall design, exploring the application of digital narrative in art exhibitions.",
      image: "https://picsum.photos/seed/tsinghua/1200/800",
      video: "https://github.com/hywrich0216-commits/evy-portfolio-2026/raw/refs/heads/main/images/%E6%B8%85%E5%8D%8E%E5%9B%BD%E9%99%85%E5%B1%95.mov",
    },
    { 
      name: "Tappal社交软件", 
      enName: "tappal Social App",
      tags: ["SOCIAL INTERACTION", "EMOTIONAL CONNECTION"],
      zhDesc: "探索性社交交互设计，致力于提升用户间的情感连接与互动体验。",
      enDesc: "Exploratory social interaction design, dedicated to enhancing emotional connection and interaction experience among users.",
      image: "https://github.com/hywrich0216-commits/evy-portfolio-2026/blob/main/images/tappal%E9%A6%96%E9%A1%B5.png?raw=true",
    },
  ];

  return (
    <main id="gallery-section" className="pt-20 pb-[200px] px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto flex flex-col">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            {...project}
            onClick={() => onProjectSelect(project)}
          />
        ))}
        <div className="mt-12 flex justify-end">
          <p className="text-[11px] text-white/20 font-sans tracking-wider">
            部分项目详情页持续更新中，面试时可展示完整版本
          </p>
        </div>
      </div>
    </main>
  );
};

const ProjectDetail = ({ project, onBack }: { project: any, onBack: () => void }) => {
  const { scrollYProgress } = useScroll();
  const isGridProject = project.name === "清华天格计划项目";
  const isDesignSystem = project.name === "MIcar-B Design System";

  // Data for GRID project simulation
  const [coords, setCoords] = useState({ lat: 39.9042, lng: 116.4074 });
  
  useEffect(() => {
    if (isGridProject) {
      const interval = setInterval(() => {
        setCoords(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.01,
          lng: prev.lng + (Math.random() - 0.5) * 0.01
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isGridProject]);
  
  // Fade-in-up variant
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <div className="fixed inset-0 z-[1001] bg-[#0A0A0A] overflow-y-auto overflow-x-hidden selection:bg-white selection:text-black scroll-smooth">
      {/* Back Button / Home Interaction Hint */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-10 left-10 z-[1102] flex items-center gap-6"
      >
        <button
          onClick={onBack}
          className="group flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl hover:border-[#49FFCC]/50 hover:bg-[#49FFCC]/5 transition-all duration-500 shadow-2xl"
        >
          <ArrowLeft size={18} className="text-white group-hover:text-[#49FFCC] transition-colors group-hover:-translate-x-1 transition-transform" />
          <span className="text-[12px] font-mono text-white group-hover:text-[#49FFCC] tracking-[0.2em] uppercase font-medium">BACK</span>
        </button>

        <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

        <div className="hidden md:flex flex-col">
          <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase mb-0.5">Navigation</span>
          <button 
            onClick={onBack}
            className="text-[11px] font-mono text-white/60 hover:text-white tracking-[0.2em] uppercase transition-colors text-left"
          >
            Back to Home
          </button>
        </div>

        {/* Keyboard Hint */}
        <div className="hidden lg:flex items-center gap-2 ml-4 px-2 py-1 rounded border border-white/5 bg-white/[0.02]">
          <span className="text-[9px] font-mono text-white/20 uppercase">ESC</span>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {isGridProject ? (
          <div className="relative w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center z-10 text-center">
            {/* Centered Content */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 items-center"
            >
              <div className="flex flex-col items-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[12px] font-mono text-[#49FFCC] tracking-[0.6em] uppercase mb-4"
                >
                  Project Reference 02
                </motion.span>
                <h1 className="text-[12vw] md:text-[8vw] font-light text-white font-misans tracking-tighter leading-none">
                  GRID
                </h1>
                <p className="text-[14px] md:text-[18px] text-white/40 font-sans tracking-[0.2em] uppercase mt-2">
                  Gamma-ray Burst Polarimeter
                </p>
              </div>

              {/* Real-time Data Display */}
              <div className="mt-12 flex flex-col gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md w-fit">
                <div className="flex items-center gap-10">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Longitude</span>
                    <span className="text-[14px] font-mono text-[#49FFCC]">
                      {coords.lng.toFixed(4)}° E
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">Latitude</span>
                    <span className="text-[14px] font-mono text-[#49FFCC]">
                      {coords.lat.toFixed(4)}° N
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#49FFCC] animate-pulse" />
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Signal Receiving...</span>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            className="text-center z-10 px-6"
          >
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[10px] font-mono text-[#49FFCC] tracking-[0.4em] uppercase mb-6 block"
            >
              Project Case Study
            </motion.span>
            <h1 className="text-[6vw] md:text-[5vw] font-light text-white font-misans tracking-tighter leading-none mb-6">
              {project.name}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-[14px] text-white font-sans tracking-[0.2em] uppercase"
            >
              {project.enName}
            </motion.p>
          </motion.div>
        )}
        
        {/* Background Image with Slow Zoom */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={isGridProject ? "/卫星图.png" : project.image} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </motion.div>
      </section>

      {/* Section 1: Overview & Strategy */}
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-24">
        <div className="max-w-[1000px] w-full">
          <motion.div {...fadeInUp} className="mb-12">
            <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase">01/ Overview & Strategy</span>
          </motion.div>
          
          {isDesignSystem ? (
            <>
              <motion.h2 
                {...fadeInUp}
                className="text-[4vw] md:text-[2.5vw] font-light text-white font-misans leading-tight mb-12"
              >
                MIcar-B Design System 是小米汽车内部 B 端仿真与工具平台的设计基础设施。我们不仅仅是在做“视觉美化”，而是在构建一套能够应对<span className="text-[#49FFCC]">业务高复杂度</span>与<span className="text-[#49FFCC]">大规模团队协作</span>的界面底座。
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div {...fadeInUp} className="space-y-4">
                  <h4 className="text-[14px] font-mono text-[#49FFCC] tracking-widest uppercase">核心痛点</h4>
                  <p className="text-[14px] text-white/50 leading-relaxed">
                    随着业务快速扩张，不同模块间风格失控，研发与设计的协作模式存在断层，复杂仿真场景下缺乏可复用的高质量资产。
                  </p>
                </motion.div>
                <motion.div {...fadeInUp} className="space-y-4">
                  <h4 className="text-[14px] font-mono text-[#49FFCC] tracking-widest uppercase">设计目标</h4>
                  <p className="text-[14px] text-white/50 leading-relaxed">
                    建立统一度极高的<strong>原子化设计</strong>体系，通过严格的<strong>状态机定义</strong>降低用户的认知负载，确保在高密度信息展示下的极致专业感。
                  </p>
                </motion.div>
              </div>
            </>
          ) : (
            <>
              <motion.h2 
                {...fadeInUp}
                className="text-[4vw] md:text-[3vw] font-light text-white font-misans leading-tight mb-12"
              >
                {project.zhDesc}
              </motion.h2>
              <motion.p 
                {...fadeInUp}
                className="text-[16px] text-white/40 font-sans leading-relaxed max-w-[800px]"
              >
                {project.enDesc}
              </motion.p>
            </>
          )}
        </div>
      </section>

      {/* Section 2: Architecture / 组件库架构 */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 bg-neutral-950/30 py-40">
        <motion.div {...fadeInUp} className="max-w-[1200px] w-full text-center mb-24">
          <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase block mb-4">02/ Component Architecture</span>
          <h3 className="text-[3vw] md:text-[2.5vw] font-light text-white font-misans">
            {isDesignSystem ? "基于原子化理念的阶梯式架构" : "如何在复杂仿真系统中，降低用户的成本？"}
          </h3>
        </motion.div>

        {isDesignSystem ? (
          <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                level: "Foundation", 
                zh: "基础层", 
                items: ["颜色 (Colors)", "字体 (Typography)", "间距 (Spacing)", "栅格 (Grid)"],
                icon: <Sparkles className="w-5 h-5 text-[#49FFCC]" />
              },
              { 
                level: "Components", 
                zh: "原子组件层", 
                items: ["Button", "Input", "Table", "Pagination", "Select"],
                icon: <Box className="w-5 h-5 text-[#49FFCC]" />
              },
              { 
                level: "Patterns", 
                zh: "模式层", 
                items: ["筛选区 (Filter Bar)", "详情页结构", "批量操作区"],
                icon: <Layers className="w-5 h-5 text-[#49FFCC]" />
              },
              { 
                level: "Rules", 
                zh: "规则层", 
                items: ["交互反馈 (Feedback)", "响应式策略", "状态机定义"],
                icon: <Settings className="w-5 h-5 text-[#49FFCC]" />
              }
            ].map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl group hover:bg-white/[0.05] transition-all"
              >
                <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  {layer.icon}
                </div>
                <h4 className="text-[11px] font-mono text-[#49FFCC] tracking-widest uppercase mb-2">{layer.level}</h4>
                <h5 className="text-[18px] text-white font-misans mb-6">{layer.zh}</h5>
                <ul className="space-y-3">
                  {layer.items.map((item, idx) => (
                    <li key={idx} className="text-[12px] text-white/30 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#49FFCC]/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <motion.div {...fadeInUp}>
                <h3 className="text-[3vw] font-light text-white font-misans leading-tight mb-8">
                  如何在复杂仿真系统中，<br/>
                  <span className="text-[#49FFCC]">降低用户的理解与使用成本？</span>
                </h3>
                <p className="text-[14px] text-white/50 font-sans leading-relaxed">
                  In complex simulation systems, how to reduce the understanding and usage costs for users?
                </p>
              </motion.div>
            </div>
            <div className="flex flex-col gap-12">
              {[
                { title: "数据分散", desc: "分析入口多，起点不统一" },
                { title: "路径冗长", desc: "依赖手动配置分析环境" },
                { title: "认知负担高", desc: "功能按结构组织，难以理解" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-start gap-6 group"
                >
                  <span className="text-[12px] font-mono text-[#49FFCC]/50 group-hover:text-[#49FFCC] transition-colors">0{i+1}</span>
                  <div>
                    <h4 className="text-[18px] text-white font-misans mb-1">{item.title}</h4>
                    <p className="text-[12px] text-white/40 font-sans leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section 3: Core Component Depth (Table) */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 py-40">
        <motion.div {...fadeInUp} className="max-w-[1200px] w-full text-center mb-24">
          <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase block mb-4">03/ Core Component Deep Dive</span>
          <h3 className="text-[3vw] md:text-[2.5vw] font-light text-white font-misans">
            {isDesignSystem ? "以 Table 为例：高密度数据治理" : "传统路径 vs 意图驱动路径"}
          </h3>
        </motion.div>

        {isDesignSystem ? (
          <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4 space-y-12">
              <motion.div {...fadeInUp} className="space-y-4">
                <h4 className="text-[14px] text-white font-misans flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-[#49FFCC]" />
                   组件目标
                </h4>
                <p className="text-[12px] text-white/40 leading-relaxed">
                  解决海量、动态、高维度数据的清晰呈现。在最小的空间内提供最高效率的阅读体验与操作响应。
                </p>
              </motion.div>
              <motion.div {...fadeInUp} className="space-y-4">
                <h4 className="text-[14px] text-white font-misans flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-[#49FFCC]" />
                   结构拆分
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {["表头 (Header)", "数据区 (Body)", "操作列", "统计汇总"].map((t) => (
                    <div key={t} className="px-3 py-2 border border-white/10 rounded-lg text-[11px] text-white/30 text-center">
                      {t}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeInUp} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                <h4 className="text-[13px] text-[#49FFCC] font-mono tracking-widest uppercase">研发建议</h4>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  • 使用 Flex 布局确保列宽自适应<br/>
                  • 万级以上数据建议引入虚拟列表 (Virtual List)<br/>
                  • 结合 CSS transform 提升 Hover 行的性能
                </p>
              </motion.div>
            </div>

            <div className="md:col-span-8">
              <motion.div 
                {...fadeInUp}
                className="p-1 rounded-3xl border border-white/10 bg-neutral-900/40 relative group overflow-hidden"
              >
                <div className="p-10 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[13px] text-white/80 font-misans">交互状态定义 / Interaction States</h4>
                      <div className="flex gap-2">
                        <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-white/40">Default</div>
                        <div className="px-2 py-1 bg-[#49FFCC]/10 border border-[#49FFCC]/20 rounded text-[9px] text-[#49FFCC]">Active</div>
                      </div>
                    </div>
                    <div className="w-full border border-white/5 rounded-xl overflow-hidden text-[11px]">
                      <div className="grid grid-cols-4 bg-white/5 border-b border-white/5 p-3 text-white/40 uppercase tracking-widest">
                        <span>Metric</span>
                        <span>Value</span>
                        <span>Delta</span>
                        <span>Action</span>
                      </div>
                      {[1, 2, 3].map((row) => (
                        <div key={row} className="grid grid-cols-4 p-3 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors">
                          <span className="text-white/60">Throttle Pos</span>
                          <span className="font-mono text-white/80">85.4%</span>
                          <span className="text-[#49FFCC]/60">+2.1%</span>
                          <div className="flex gap-2">
                             <MoreHorizontal size={14} className="text-white/20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="space-y-4">
                      <h5 className="text-[11px] text-[#49FFCC] uppercase tracking-widest opacity-60">业务模式：处理机制</h5>
                      <div className="space-y-2">
                        <div className="text-[11px] text-white/30">• 长文本溢出：省略号 + Tooltip 提示</div>
                        <div className="text-[11px] text-white/30">• 加载中：局部 Skeleton 或者 全局 Loading</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h5 className="text-[11px] text-[#49FFCC] uppercase tracking-widest opacity-60">筛选与反馈</h5>
                      <div className="space-y-2">
                        <div className="text-[11px] text-white/30">• 排序按钮状态即时反馈</div>
                        <div className="text-[11px] text-white/30">• 空状态：明确的占位说明与操作入口</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />

            {/* Left: Traditional Flow */}
            <div className="flex flex-col items-center px-4 md:px-12">
              <motion.h4 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                className="text-[14px] font-mono tracking-[0.3em] uppercase mb-12 text-white"
              >
                Traditional Flow
              </motion.h4>
              
              <div className="flex flex-col items-center gap-4 w-full">
                {[
                  "用户打开数据",
                  "理解数据结构 (Channel/Topic)",
                  "手动创建 Layout",
                  "添加多个 Panel",
                  "手动调整参数",
                  "开始分析"
                ].map((step, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center"
                    >
                      <span className="text-[13px] text-white/40 font-misans">{step}</span>
                    </motion.div>
                    {i < 5 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.2 }}
                        className="h-4 w-[1px] bg-white" 
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-12 pt-8 border-t border-white/5 w-full text-center"
              >
                <ul className="text-[11px] font-mono text-white/20 space-y-2 uppercase tracking-widest">
                  <li>• 步骤繁琐 / Complex Steps</li>
                  <li>• 学习成本高 / High Learning Cost</li>
                  <li>• 依赖经验 / Experience Dependent</li>
                </ul>
              </motion.div>
            </div>

            {/* Right: Optimized Flow */}
            <div className="flex flex-col items-center px-4 md:px-12">
              <motion.h4 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[14px] font-mono tracking-[0.3em] uppercase mb-12 text-[#49FFCC]"
              >
                Optimized Flow
              </motion.h4>
              
              <div className="flex flex-col items-center gap-4 w-full relative">
                {[
                  { text: "用户输入意图 (User Intent)", highlight: true },
                  { text: "AI 解析分析需求", ai: true },
                  { text: "调用 Skill 能力", ai: true },
                  { text: "自动生成 Layout", highlight: true },
                  { text: "自动配置 Panel", highlight: true },
                  { text: "输出分析结果", highlight: true }
                ].map((step, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`w-full p-5 rounded-2xl border backdrop-blur-md transition-all duration-500 ${
                        step.ai 
                          ? "border-[#49FFCC]/30 bg-[#49FFCC]/5 shadow-[0_0_20px_rgba(73,255,204,0.05)]" 
                          : "border-white/10 bg-white/5"
                      } text-center group hover:border-[#49FFCC]/50`}
                    >
                      <span className={`text-[14px] font-misans ${step.ai ? "text-[#49FFCC]" : "text-white/90"}`}>
                        {step.text}
                      </span>
                    </motion.div>
                    {i < 5 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        className="h-4 w-[1px] bg-[#49FFCC]/30" 
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-12 pt-8 border-t border-[#49FFCC]/10 w-full text-center"
              >
                <ul className="text-[11px] font-mono text-[#49FFCC]/60 space-y-2 uppercase tracking-widest">
                  <li>• 极简路径 / Minimal Path</li>
                  <li>• 零门槛 / Zero Barrier</li>
                  <li>• 意图驱动 / Intent Driven</li>
                </ul>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      {/* Section 4: Design Strategy / Prototype */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 bg-neutral-950/30 py-40">
        <motion.div {...fadeInUp} className="max-w-[1200px] w-full text-center mb-24">
          <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase block mb-4">04/ Standard Layout Prototype</span>
          <h3 className="text-[3vw] md:text-[2.5vw] font-light text-white font-misans">
            {isDesignSystem ? "筛选查询型页面原型" : "从高频场景中提炼分析能力"}
          </h3>
        </motion.div>
        
        {isDesignSystem ? (
          <motion.div 
            {...fadeInUp}
            className="w-full max-w-6xl rounded-[40px] border border-white/10 bg-[#111] overflow-hidden shadow-2xl relative"
          >
             {/* Admin Mockup */}
             <div className="flex h-[600px]">
                <div className="w-20 border-r border-white/5 flex flex-col items-center py-10 gap-8 opacity-40">
                   <div className="w-10 h-10 rounded-xl bg-white/10" />
                   <div className="w-8 h-8 rounded-lg bg-white/5" />
                   <div className="w-8 h-8 rounded-lg bg-white/5" />
                </div>
                <div className="flex-1 flex flex-col">
                   <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase tracking-[0.2em] mb-2">
                           <span>Simulation</span>
                           <ChevronRight size={10} />
                           <span className="text-white/40">Cloud Manager</span>
                        </div>
                        <h2 className="text-[22px] text-white font-misans">仿真任务管理 / Simulation Manager</h2>
                      </div>
                      <button className="px-4 py-2 bg-[#49FFCC] text-black text-[12px] font-bold rounded-lg">+ 新建任务</button>
                   </div>
                   <div className="px-10 py-6 border-b border-white/5 bg-white/[0.01] flex items-center gap-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-lg text-[11px] text-white/40 bg-white/[0.02]">
                         <Filter size={12} /> 状态: 全部
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-lg text-[11px] text-white/40 bg-white/[0.02]">
                         创建人: Evy
                      </div>
                      <div className="flex-1" />
                      <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
                         <input readOnly placeholder="搜索..." className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-[11px] text-white/40 w-48" />
                      </div>
                   </div>
                   <div className="flex-1 p-8">
                      <div className="w-full h-full border border-white/5 rounded-2xl bg-neutral-900/20 overflow-hidden">
                         <div className="grid grid-cols-5 bg-white/5 p-4 text-[10px] text-white/20 uppercase tracking-widest font-bold">
                            <span>Task ID</span>
                            <span>Name</span>
                            <span>Status</span>
                            <span>Progress</span>
                            <span className="text-right">Actions</span>
                         </div>
                         {[1, 2, 3].map(i => (
                            <div key={i} className="grid grid-cols-5 p-4 border-b border-white/5 items-center text-[12px]">
                               <span className="font-mono text-white/20">SIM-2024-0{i}</span>
                               <span className="text-white/80">SU7_Urban_Test_0{i}</span>
                               <span><div className="inline-block px-2 py-0.5 rounded-full bg-[#49FFCC]/10 text-[#49FFCC] text-[10px]">Running</div></span>
                               <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden"><div className="w-2/3 h-full bg-[#49FFCC]" /></div>
                               <div className="text-right text-white/20">Edit / More</div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#49FFCC]/5 blur-[150px] -z-10" />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "从“功能集合”到“能力体系”", desc: "将分散的工具功能抽象为可复用的分析能力（Skill），降低用户理解成本。", en: "From Functions to Capabilities" },
              { title: "从“手动配置”到“直接调用”", desc: "通过百宝箱与 AI 能力，让用户跳过 Layout 与 Panel 配置，直接进入分析过程。", en: "From Manual to Direct Access" },
              { title: "从“工具操作”到“意图驱动”", desc: "引入自然语言交互，将复杂操作转化为用户意图表达，缩短分析路径。", en: "From Operation to Intent-Driven" }
            ].map((strategy, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[32px] bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#49FFCC]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="text-[#49FFCC] font-mono text-[14px]">0{i+1}</span>
                </div>
                <h4 className="text-[20px] text-white font-misans mb-4">{strategy.title}</h4>
                <p className="text-[12px] text-white/40 font-sans leading-relaxed mb-6">{strategy.desc}</p>
                <span className="text-[10px] font-mono text-white/20 tracking-widest uppercase">{strategy.en}</span>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Section 5: Key Design (Sticky Layout) */}
      <section className="relative min-h-[200vh] w-full px-6 md:px-24 py-40">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-24">
          {/* Left: Sticky Text */}
          <div className="md:col-span-5 md:sticky md:top-40 h-fit">
            <motion.div {...fadeInUp}>
              <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase block mb-8">05/ Key Design</span>
              <h3 className="text-[3vw] font-light text-white font-misans leading-tight mb-8">
                关键页面设计<br/>
                <span className="text-white/40">与视觉呈现</span>
              </h3>
              <div className="flex flex-col gap-6">
                <p className="text-[16px] text-[#49FFCC] font-misans tracking-widest uppercase">
                  提升效率与理解速度
                </p>
                <p className="text-[14px] text-white/60 font-misans leading-relaxed">
                  对核心页面进行统一设计与视觉优化
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right: Scrolling Images */}
          <div className="md:col-span-7 flex flex-col gap-40">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="rounded-[40px] overflow-hidden border border-white/5 bg-neutral-900/50"
            >
              <img src="/555.png" alt="Design 1" className="w-full h-auto transition-all duration-1000" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="rounded-[40px] overflow-hidden border border-white/5 bg-neutral-900/50"
            >
              <img src="/777.png" alt="Design 2" className="w-full h-auto transition-all duration-1000" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-40 flex flex-col items-center justify-center border-t border-white/5">
        <motion.p {...fadeInUp} className="text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase mb-8">End of Case Study</motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="text-white text-[18px] font-misans border-b border-[#49FFCC] pb-2"
        >
          Back to Gallery
        </motion.button>
      </section>
    </div>
  );
};

const Hotspot = ({ x, y, title, desc }: { x: string, y: string, title: string, desc: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div 
      className="absolute z-20" 
      style={{ left: x, top: y }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative flex items-center justify-center">
        {/* Breathing Animation */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-8 h-8 rounded-full bg-[#49FFCC]"
        />
        <div className="relative w-3 h-3 rounded-full bg-[#49FFCC] border-2 border-white shadow-[0_0_10px_rgba(73,255,204,1)] cursor-pointer" />
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-[220px] p-4 rounded-xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl shadow-2xl pointer-events-none"
            >
              <h4 className="text-[13px] font-misans text-[#49FFCC] mb-1 uppercase tracking-wider">{title}</h4>
              <p className="text-[11px] text-white/60 font-sans leading-relaxed">{desc}</p>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#0A0A0A]/90" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('ABOUT');
  const [cursorType, setCursorType] = useState('default');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorSize = useSpring(useMotionValue(0), { damping: 25, stiffness: 250 });

  useEffect(() => {
    // Disable body scroll when project is selected
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (cursorType === 'inverted') {
      cursorSize.set(60);
    } else {
      cursorSize.set(0);
    }
  }, [cursorType, cursorSize]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'hero-section' || id === 'about-section') {
            setActiveTab('ABOUT');
          } else if (id === 'gallery-section') {
            setActiveTab('PROJECT');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ['hero-section', 'about-section', 'gallery-section'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] selection:bg-white selection:text-black overflow-x-hidden">
      {/* Custom Inverted Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-white/30 backdrop-invert"
          style={{
            width: cursorSize,
            height: cursorSize,
          }}
        />
      </motion.div>

      {!selectedProject && <Header scrolled={scrolled} />}
      <Hero />
      <AboutSection setCursorType={setCursorType} />
      <Gallery onProjectSelect={setSelectedProject} />
      {!selectedProject && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />}

      {/* Project Detail View Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[2000]"
          >
            <ProjectDetail 
              project={selectedProject} 
              onBack={() => setSelectedProject(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}