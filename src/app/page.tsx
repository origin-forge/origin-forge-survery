"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Target, Zap, ArrowRight, ExternalLink } from 'lucide-react'
import Prism from '@/components/Prism'
import Survey from '@/components/Survey'
import type { SurveyAnswers } from '@/data/surveyQuestions'

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(false)

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    console.log('Survey completed:', answers)
    // Store answers in JSON (will implement proper storage)
    localStorage.setItem('surveyAnswers', JSON.stringify({
      answers,
      timestamp: new Date().toISOString()
    }))
  }

  if (showSurvey) {
    return (
      <Survey 
        onComplete={handleSurveyComplete}
        onClose={() => setShowSurvey(false)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Spectrum Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Prism Background for Smoothest Animation */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 backdrop-blur-sm">
            <Prism
              animationType="3drotate"
              timeScale={0.3}
              height={4.0}
              baseWidth={6.0}
              scale={4.2}
              hueShift={0.1}
              colorFrequency={1.2}
              noise={0.05}
              glow={1.5}
              hoverStrength={1.5}
              inertia={0.08}
              bloom={1.2}
              suspendWhenOffscreen={true}
            />
          </div>
        </div>

        {/* Background Gradient Overlay for Better Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-black/70 backdrop-blur-[2px]" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: 0
              }}
              animate={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{ 
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-2 h-2 bg-yellow-400/30 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          
          {/* Main Title with Enhanced Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-wide"
            style={{ 
              fontFamily: 'var(--font-orbitron)',
              textShadow: '0 0 40px rgba(251, 191, 36, 0.5), 0 0 80px rgba(251, 191, 36, 0.3), 0 4px 20px rgba(0, 0, 0, 0.8)' 
            }}
          >
            <span className="text-white drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.1)' }}>
              ORIGIN
            </span>
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl ml-4">
              FORGE
            </span>
          </motion.h1>

          {/* Subtitle with Enhanced Typography */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto font-jetbrains font-light tracking-wide"
            style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)' }}
          >
            Share your gaming story and 
            <span className="text-yellow-400 font-medium drop-shadow-lg"> shape the future</span>.
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Target className="w-6 h-6 text-yellow-400" />
              <div className="text-left">
                <div className="text-white font-inter font-medium">10K+</div>
                <div className="text-gray-400 text-sm font-inter font-light">Gamers</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Gamepad2 className="w-6 h-6 text-yellow-400" />
              <div className="text-left">
                <div className="text-white font-inter font-medium">50+</div>
                <div className="text-gray-400 text-sm font-inter font-light">Platforms</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Zap className="w-6 h-6 text-yellow-400" />
              <div className="text-left">
                <div className="text-white font-inter font-medium">24/7</div>
                <div className="text-gray-400 text-sm font-inter font-light">Gaming</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={() => setShowSurvey(true)}
            className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black font-inter font-semibold rounded-2xl text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/40 active:scale-95 border-2 border-yellow-300/50 backdrop-blur-sm"
          >
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3 z-10">
              <Gamepad2 className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
              <span className="tracking-wide">Start Gaming Survey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.button>

          {/* Secondary Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6"
          >
            <a
              href="https://originforge.games"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm font-inter font-light"
            >
              <span>Explore OriginForge Platform</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-yellow-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
