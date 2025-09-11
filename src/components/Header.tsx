"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-black/20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image 
              src="/OriginForgeLogo (1).svg" 
              alt="OriginForge" 
              width={40}
              height={40}
              className="object-contain rounded-lg bg-slate-800 p-1 group-hover:bg-slate-700 transition-all duration-700 ease-in-out"
            />
            <span className="text-xl font-gaming font-black text-white tracking-wider transition-all duration-600 ease-in-out group-hover:scale-105">
              <span className="transition-all duration-600 ease-in-out">ORIGIN</span><span className="gradient-text transition-all duration-600 ease-in-out">FORGE</span>
            </span>
            <div className="ml-2">
              <p className="text-xs text-gray-400 font-medium">Survey Portal</p>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="hidden lg:flex items-center space-x-3 relative group">
              {/* Premium domain badge - matching main site aesthetic */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-amber-500/10 to-yellow-400/10 rounded-lg"></div>
                <div className="relative px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-yellow-400/30 group-hover:border-yellow-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 rounded flex items-center justify-center">
                      <Globe className="w-3 h-3 text-black" />
                    </div>
                    <span className="text-sm font-gaming font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-200 tracking-wide">
                      survey.originforge.games
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.a
              href="https://originforge.games"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-500/30 to-yellow-600/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              
              {/* Main Button */}
              <div className="relative px-6 py-3 rounded-xl border-2 border-yellow-400/60 backdrop-blur-sm bg-black/90 shadow-lg shadow-yellow-400/20 group-hover:border-yellow-400 group-hover:shadow-yellow-400/40 transition-all duration-300">
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                
                <div className="relative flex items-center space-x-3">
                  {/* Icon container */}
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <ArrowLeft className="w-4 h-4 text-black group-hover:-translate-x-0.5 transition-transform duration-300" />
                  </div>
                  
                  {/* Text */}
                  <div className="flex flex-col">
                    <span className="text-xs text-white font-mono uppercase tracking-wider group-hover:text-gray-300 transition-colors duration-200">
                      Back to
                    </span>
                    <span className="text-sm font-bold text-yellow-400 font-gaming tracking-wide group-hover:text-yellow-300 transition-colors duration-200">
                      MAIN SITE
                    </span>
                  </div>
                  
                  {/* External link indicator */}
                  <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ExternalLink className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10"></div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default Header
