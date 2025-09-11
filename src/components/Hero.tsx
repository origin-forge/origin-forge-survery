"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-black to-slate-800 overflow-hidden">
      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        {/* Section Tag */}
        <motion.div
          className="mb-8 relative inline-block group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-amber-500/40 to-yellow-600/30 rounded-2xl blur-sm group-hover:blur-lg group-hover:scale-110 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/30 to-pink-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          
          {/* Main container */}
          <div className="relative px-8 py-4 rounded-2xl border-2 border-yellow-400/60 group-hover:border-yellow-300/80 backdrop-blur-sm bg-black/95 shadow-lg shadow-yellow-400/30 group-hover:shadow-yellow-400/60 transition-all duration-500">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex items-center justify-center relative z-10">
              <motion.div
                className="mr-3"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Users className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
              </motion.div>
              
              <motion.span 
                className="text-sm font-bold tracking-[0.25em] font-mono uppercase bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-amber-200 group-hover:to-yellow-400 transition-all duration-500"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ 
                  backgroundSize: "200% 200%",
                  textShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                }}
              >
                ⚡ GAMING IDENTITY SURVEY PORTAL ⚡
              </motion.span>
            </div>
          </div>
          
          {/* Floating particles effect */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-300 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-500 transition-opacity duration-300"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-700 transition-opacity duration-300"></div>
        </motion.div>        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-gaming font-bold mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const rotateX = (mouseY - centerY) / 20;
            const rotateY = (mouseX - centerX) / 20;
            
            e.currentTarget.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
          }}
          style={{ transition: 'transform 0.3s ease-out' }}
        >
          <motion.span
            className="gradient-text inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 2, 
              delay: 0.3,
              ease: "easeOut"
            }}
          >
            ORIGINFORGE
          </motion.span>
          <br />
          <motion.span
            className="text-white inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 2, 
              delay: 0.6,
              ease: "easeOut"
            }}
          >
            SURVEY
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl leading-relaxed italic text-center mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Shape the future of gaming identity
        </motion.p>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-yellow-400/40 border border-transparent group-hover:border-yellow-400/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 group-hover:h-2 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-transparent to-amber-500/0 group-hover:from-yellow-400/10 group-hover:to-amber-500/10 transition-all duration-500"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="absolute inset-1 bg-black rounded-full"></div>
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-gaming font-black text-yellow-400 mb-2 tracking-tight group-hover:text-4xl transition-all duration-300">
                    <Users className="w-8 h-8 inline-block" />
                  </div>
                  <div className="text-sm font-bold text-gray-300 uppercase tracking-[0.15em] leading-tight group-hover:text-yellow-200 transition-colors duration-300">COMMUNITY<br/>DRIVEN</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-yellow-400/40 border border-transparent group-hover:border-yellow-400/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 group-hover:h-2 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-transparent to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="absolute inset-1 bg-black rounded-full"></div>
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-gaming font-black text-yellow-400 mb-2 tracking-tight group-hover:text-4xl transition-all duration-300">
                    <Target className="w-8 h-8 inline-block" />
                  </div>
                  <div className="text-sm font-bold text-gray-300 uppercase tracking-[0.15em] leading-tight group-hover:text-yellow-200 transition-colors duration-300">PRIVACY<br/>FIRST</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black p-6 rounded-2xl transform group-hover:-translate-y-2 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-yellow-400/40 border border-transparent group-hover:border-yellow-400/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-400 group-hover:h-2 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 via-transparent to-yellow-400/0 group-hover:from-yellow-600/10 group-hover:to-yellow-400/10 transition-all duration-500"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="absolute inset-1 bg-black rounded-full"></div>
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-gaming font-black text-yellow-400 mb-2 tracking-tight group-hover:text-4xl transition-all duration-300">
                    <Target className="w-8 h-8 inline-block" />
                  </div>
                  <div className="text-sm font-bold text-gray-300 uppercase tracking-[0.15em] leading-tight group-hover:text-yellow-200 transition-colors duration-300">INNOVATION<br/>FOCUS</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
