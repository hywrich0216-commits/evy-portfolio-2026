/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from 'motion/react';
import { ArrowUpRight, ArrowLeft, Home, Phone, MessageCircle, Instagram, Sparkles } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 w-full h-[80px] z-[999] flex items-center justify-between px-12 transition-all duration-700 ease-in-out
      ${scrolled ? 'header-glass glass-morphism' : 'bg-transparent border-transparent'}`}>
      
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
  const tabs = ['PROJECT', 'ABOUT', 'CONTACT'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'CONTACT') {
      const contactSection = document.getElementById('contact-section');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'PROJECT') {
      const gallerySection = document.getElementById('gallery-section');
      gallerySection?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'ABOUT') {
      const heroSection = document.getElementById('hero-section');
      heroSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000]">
      <nav className="h-[56px] px-[6px] py-[4px] rounded-[30px] flex items-center gap-1 bg-[rgba(15,15,15,0.5)] backdrop-blur-[24px] saturate-[180%] -webkit-backdrop-blur-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_8px_16px_-4px_rgba(255,255,255,0.04),inset_0_-8px_16px_-4px_rgba(255,255,255,0.02)] border border-white/[0.03]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`relative h-full px-6 flex flex-col items-center justify-center transition-all duration-300 group ${
              activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white'
            }`}
          >
            {/* Active Background */}
            <AnimatePresence>
              {activeTab === tab && (
                <motion.div
                  layoutId="nav-active-bg"
                  className="absolute inset-0 bg-white/[0.08] rounded-[26px] -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            <div className="relative">
              <span className="text-[13px] font-medium font-sans tracking-[0.03em] uppercase">
                {tab}
              </span>

              {/* Active Spectrum Glow Dot (Top Right) */}
              <AnimatePresence>
                {activeTab === tab && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full blur-[1px]"
                    style={{
                      background: 'linear-gradient(135deg, #FF5032, #00FFFF, #0000FF)',
                      boxShadow: '0 0 8px rgba(0, 255, 255, 0.8)',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

const EmailModule = () => {
  const email = "hywrich0216@gmail.com";
  const [displayText, setDisplayText] = useState(email);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Text Decoding Effect
  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.";
      const interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split("").map((_, index) => {
            if (index < iteration) return email[index];
            return letters[Math.floor(Math.random() * letters.length)];
          }).join("")
        );
        
        if (iteration >= email.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayText(email);
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleClick = () => {
    navigator.clipboard.writeText(email);
    setIsClicked(true);
    setShowTooltip(true);
    setTimeout(() => {
      setIsClicked(false);
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-4 items-start cursor-none relative group w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none absolute z-50 w-8 h-8 border border-[#FFB347] rounded-full flex items-center justify-center"
        animate={{ 
          x: mousePos.x - 16, 
          y: mousePos.y - 16,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5
        }}
        transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: -40 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ left: mousePos.x }}
            className="absolute z-[1001] px-4 py-2 glass-morphism border border-[#FFB347]/20 rounded-lg whitespace-nowrap pointer-events-none"
          >
            <span className="text-[10px] text-white/60 font-sans tracking-widest uppercase">
              COPIED TO CLIPBOARD
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Label */}
      <div className="h-4 overflow-hidden">
        <motion.span 
          className="text-[12px] text-white/30 font-sans font-light tracking-[0.2em] uppercase block"
          animate={{ y: isHovered ? -20 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          EMAIL
        </motion.span>
        <motion.span 
          className="text-[12px] text-white/40 font-sans font-light tracking-[0.2em] uppercase block"
          animate={{ y: isHovered ? -20 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          CLICK TO COPY
        </motion.span>
      </div>

      {/* Email Address */}
      <div className="relative">
        <motion.span 
          className={`text-[14px] font-light font-sans transition-colors duration-300 ${
            isClicked ? 'text-white/80' : isHovered ? 'text-white/60' : 'text-white/40'
          }`}
        >
          {displayText}
        </motion.span>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<number | null>(null);

  const socialItems = [
    { 
      icon: <Phone strokeWidth={2} size={20} />, 
      label: "PHONE", 
      value: "13800000000"
    },
    { 
      icon: <MessageCircle strokeWidth={2} size={20} />, 
      label: "WECHAT", 
      value: "Evy_Design"
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M19.242667 401.066667h68.053333s-7.936 113.962667-10.026667 133.973333c-2.090667 20.053333-9.6 73.898667-39.253333 108.117333L3.370667 567.594667c0 0.042667 7.936-7.509333 15.872-166.528zM133.461333 310.656h68.437334v315.008s-13.909333 49.536-52.309334 48.981333h-36.736l-29.866666-59.349333h44.074666c4.736 0 4.608-6.528 4.608-4.778667 0.042667 3.882667 1.792-299.861333 1.792-299.861333zM476.288 307.84l-34.517333 77.909333s-6.101333 15.573333 3.882666 16.128c10.026667 0.554667 57.301333 0 57.301334 0l-47.872 107.392s-4.992 13.909333 4.437333 13.909334h35.626667l-23.722667 55.637333h-78.08s-33.962667-4.992-20.053333-35.626667 34.517333-79.018667 34.517333-79.018666l-35.072 0.554666s-31.701333-6.698667-16.128-38.954666c15.573333-32.298667 54.528-117.973333 54.528-117.973334h65.152zM247.552 400.256H314.88s8.917333 162.773333 16 163.370667l-34.389333 77.610666s-31.701333-23.936-40.064-120.490666c-6.869333-79.701333-8.874667-120.490667-8.874667-120.490667zM362.752 600.576s2.218667 6.101333 27.818667 6.101333h77.909333l-31.146667 67.328H354.389333s-24.192 0.554667-23.509333-7.253333l31.872-66.176zM679.424 333.44v67.370667h-42.325333v205.909333h65.706666v67.328h-225.408l29.482667-66.773333h57.898667l1.109333-207.018667-40.618667-0.554667-1.664-66.261333z" />
          <path d="M1024 615.04v-94.592c0-56.192-59.648-58.453333-59.648-58.453333h-17.237333V399.658667c0.554667-57.301333-68.992-66.218667-68.992-66.218667h-42.837334v-26.154667h-66.773333l1.109333 26.154667h-47.317333v66.218667h45.653333v62.890666H698.88v67.328l68.992 0.554667v143.573333h67.328V529.92h107.392c14.464 0 15.573333 14.464 15.573333 14.464s3.626667 39.381333 2.645334 56.192c-0.981333 16.682667-13.226667 15.573333-13.226667 15.573333h-55.637333l26.709333 57.898667h50.645333c59.050667 0 54.698667-59.008 54.698667-59.008z m-142.592-209.493333v55.637333H834.133333V400.512h40.362667c7.808 0 6.912 5.034667 6.912 5.034667z" />
          <path d="M992 398.549333H960v-32c0-17.578667 14.421333-32 32-32 17.621333 0 32 14.421333 32 32s-14.378667 32-32 32z" />
        </svg>
      ), 
      label: "XIAOHONGSHU",
      value: "Evy的交互实验室"
    },
    { 
      icon: <Instagram strokeWidth={2} size={20} />, 
      label: "INSTAGRAM",
      value: "evy_huang_design"
    }
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIcon(idx);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <section id="contact-section" className="pt-40 pb-48 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12 md:gap-24 items-start">
        {/* Left Side: Identity & CTA (7 Columns) */}
        <div className="col-span-12 md:col-span-7 flex flex-col">
          <div className="flex flex-col gap-10">
            <p className="text-[16px] font-[200] font-sans leading-[1.8] text-white/50 max-w-[480px]">
              Seeking deep collaboration in autonomous driving HMI or complex enterprise system design. 
              If you have intriguing ideas or business challenges, feel free to reach out anytime.
            </p>
            <p className="text-[11px] text-white/30 font-sans tracking-[0.3em] uppercase mt-2">
              © 2026 EVYHUANG. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>

        {/* Right Side: Refined List (5 Columns) */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-20 items-start">
          {/* Email Row */}
          <EmailModule />

          {/* Social Row */}
          <div className="flex flex-col gap-8 items-start">
            <span className="text-[12px] text-white/30 font-sans tracking-[0.2em] uppercase">SOCIAL</span>
            <div className="flex items-center gap-10">
              {socialItems.map((social, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredIcon === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          x: '-50%',
                          backgroundColor: copiedIcon === idx ? 'rgba(255, 179, 71, 0.2)' : 'rgba(255, 255, 255, 0.05)'
                        }}
                        exit={{ opacity: 0, y: 10, x: '-50%' }}
                        className="absolute bottom-full mb-3 left-1/2 z-[1000] px-3 py-1.5 rounded-[8px] backdrop-blur-[8px] border border-[#FFB347]/20 whitespace-nowrap pointer-events-none"
                      >
                        <span className="text-[11px] text-white/60 font-[400] font-sans tracking-[0.1em] uppercase">
                          {copiedIcon === idx ? "ID COPIED!" : social.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon Button */}
                  <motion.button 
                    onClick={() => handleCopy(social.value, idx)}
                    onMouseEnter={() => setHoveredIcon(idx)}
                    onMouseLeave={() => setHoveredIcon(null)}
                    whileHover={{ x: 4, y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`transition-colors duration-300 relative ${
                      hoveredIcon === idx ? 'text-white/60' : 'text-white/30'
                    }`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
      className="group w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-16 border-b border-white/5 last:border-none cursor-pointer"
    >
      {/* Left Side: Text Content (5 Columns) */}
      <div className="md:col-span-5 flex flex-col justify-center transition-transform duration-500 group-hover:-translate-y-2">
        <div className="flex flex-col gap-6">
          {/* Index */}
          <span className="text-[10px] font-mono text-[#49FFCC]/80 tracking-widest">
            {String(index + 1).padStart(2, '0')}/
          </span>

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
      {/* Fluid Spectrum Glow (Concentrated Cluster) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ isolation: 'isolate' }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Layer 1: Soft Orange-Red (Left-leaning) */}
          <motion.div 
            animate={{ 
              x: [-20, 10, -20],
              y: [-10, 10, -10],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 -translate-x-[380px] w-[400px] h-[300px] rounded-full bg-[#FF5032] opacity-60 blur-[80px] will-change-transform" 
            style={{ mixBlendMode: 'screen', transform: 'translateZ(0) translateX(-380px)' }}
          />
          
          {/* Layer 2: Bright Cyan (Center-focused) */}
          <motion.div 
            animate={{ 
              x: [10, -10, 10],
              y: [10, -10, 10],
              scale: [1.1, 0.9, 1.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 -translate-x-1/2 w-[450px] h-[320px] rounded-full bg-[#00FFFF] opacity-80 blur-[60px] will-change-transform" 
            style={{ mixBlendMode: 'screen', transform: 'translateZ(0) translateX(-50%)' }}
          />
          
          {/* Layer 3: Deep Blue (Right-leaning) */}
          <motion.div 
            animate={{ 
              x: [20, -10, 20],
              y: [-10, 15, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 translate-x-[160px] w-[400px] h-[300px] rounded-full bg-[#0000FF] opacity-50 blur-[50px] will-change-transform" 
            style={{ mixBlendMode: 'screen', transform: 'translateZ(0) translateX(160px)' }}
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
  const infoBlocks = [
    {
      zh: "我是一名致力于逻辑与创意工程的设计师。目前在小米汽车负责复杂仿真系统架构，并探索 AI 驱动的设计流。同时，我正在北京邮电大学 (BUPT) 攻读 MBA，致力于在复杂业务中实现体验与战略的平衡。",
      en: "I am a designer at the intersection of logic and creative engineering. Currently architecting complex simulation systems at Xiaomi Auto and pioneering AI-driven workflows. As an MBA candidate at BUPT, I bridge the gap between technology and business strategy to harmonize experience and value."
    }
  ];

  return (
    <section id="about-section" className="py-40 px-6 md:px-12 lg:px-24 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-12 md:gap-24 items-start">
        {/* Left Side: Image (3 Columns) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-3 flex justify-start items-start"
        >
          <div className="aspect-square w-full max-w-[180px] rounded-full border border-white/10 overflow-hidden bg-neutral-900/50 relative group">
            <img 
              src="/IMG_0127.JPG" 
              alt="Portrait" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right Side: Text Blocks (9 Columns) */}
        <div className="col-span-12 md:col-span-9 flex flex-col">
          <div className="flex flex-col gap-8">
            {infoBlocks.map((block, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onMouseEnter={() => setCursorType('inverted')}
                onMouseLeave={() => setCursorType('default')}
                className="cursor-none"
              >
                <div className="flex flex-col gap-3 pt-4 pb-2">
                  <p className="text-[12px] text-white/80 font-misans leading-relaxed">
                    {block.zh}
                  </p>
                  <p className="text-[12px] text-white/40 font-sans leading-relaxed">
                    {block.en}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-2"
            >
              <button 
                onMouseEnter={() => setCursorType('inverted')}
                onMouseLeave={() => setCursorType('default')}
                className="h-[36px] px-6 rounded-full border border-white/20 bg-transparent text-white/60 text-[11px] font-sans font-medium tracking-[0.15em] uppercase flex items-center gap-2 transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white cursor-none group"
              >
                VIEW FULL RESUME
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
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
      image: "/BrowserDesktop.png",
      video: "/Miviz可视化分析平台.mov",
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
      image: "/cover.png",
    },
    { 
      name: "小米汽车MiSim仿真平台", 
      enName: "Xiaomi MiSim Simulation Platform",
      tags: ["SYSTEM ARCHITECTURE", "HMI DESIGN"],
      zhDesc: "负责构建高精度的自动驾驶仿真界面，利用数据可视化技术解决复杂场景下的交互效率问题。",
      enDesc: "Architecting high-precision autonomous driving simulation interfaces, leveraging data visualization to solve complex interaction efficiency challenges.",
      image: "/misim仿真平台.png",
    },
    { 
      name: "清华国际艺术与设计展", 
      enName: "Tsinghua International Art & Design Exhibition",
      tags: ["IMMERSIVE EXHIBITION", "DIGITAL NARRATIVE"],
      zhDesc: "沉浸式线上展厅设计，探索数字化叙事在艺术展览中的应用。",
      enDesc: "Immersive online exhibition hall design, exploring the application of digital narrative in art exhibitions.",
      image: "https://picsum.photos/seed/tsinghua/1200/800",
      video: "/清华国际展录屏.mov",
    },
    { 
      name: "tappal社交软件", 
      enName: "tappal Social App",
      tags: ["SOCIAL INTERACTION", "EMOTIONAL CONNECTION"],
      zhDesc: "探索性社交交互设计，致力于提升用户间的情感连接与互动体验。",
      enDesc: "Exploratory social interaction design, dedicated to enhancing emotional connection and interaction experience among users.",
      image: "/host.png",
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
        
        {/* Background Image with Slow Zoom */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={project.image} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </motion.div>
      </section>

      {/* Section 1: Overview (Large Typography) */}
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-24">
        <div className="max-w-[1000px] w-full">
          <motion.div {...fadeInUp} className="mb-12">
            <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase">01/ Overview</span>
          </motion.div>
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
        </div>
      </section>

      {/* Section 2: Problem Definition (Typography as Visual) */}
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-24 bg-neutral-950/30">
        <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <motion.div {...fadeInUp}>
              <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase block mb-8">02/ Problem Definition</span>
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
      </section>

      {/* Section 3: Analysis Flow Comparison (Traditional vs. Optimized) */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 md:px-24 py-40">
        <motion.div {...fadeInUp} className="text-center mb-24">
          <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase block mb-4">03/ Analysis Flow Comparison</span>
          <h3 className="text-[2.5vw] font-light text-white font-misans">传统路径 vs 意图驱动路径</h3>
        </motion.div>
        
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
                    {step.ai && i === 1 && (
                      <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 hidden lg:block">
                        <div className="flex flex-col items-start gap-1 border-l border-[#49FFCC]/20 pl-4">
                          <span className="text-[9px] font-mono text-[#49FFCC]/40 uppercase tracking-tighter">AI Processing Layer</span>
                          <span className="text-[10px] font-mono text-[#49FFCC]/60 whitespace-nowrap">解析 → 调用 → 编排 → 输出</span>
                        </div>
                      </div>
                    )}
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 px-8 py-4 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm"
        >
          <p className="text-[12px] font-misans text-white/40 tracking-widest">
            分析路径由多步配置，简化为 <span className="text-[#49FFCC]">意图驱动</span>
          </p>
        </motion.div>
      </section>

      {/* Section 4: Design Strategy (Glassmorphism Cards) */}
      <section className="min-h-screen w-full flex items-center justify-center px-6 md:px-24 bg-neutral-950/30">
        <div className="max-w-[1200px] w-full">
          <motion.div {...fadeInUp} className="mb-24">
            <span className="text-[10px] font-mono text-[#49FFCC] tracking-widest uppercase block mb-4">04/ Design Strategy</span>
            <h3 className="text-[3vw] font-light text-white font-misans">从高频场景中提炼分析能力，构建可复用的AI Skill体系</h3>
          </motion.div>
          
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
        </div>
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
          } else if (id === 'contact-section') {
            setActiveTab('CONTACT');
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = ['hero-section', 'about-section', 'gallery-section', 'contact-section'];
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
      <ContactSection />
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
