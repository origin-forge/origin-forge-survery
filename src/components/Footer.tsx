"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Globe, Mail, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black border-t border-slate-700/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-yellow-400/5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="font-gaming font-bold text-black text-sm">OF</span>
              </div>
              <div>
                <h3 className="font-gaming font-bold text-lg">
                  <span className="gradient-text">ORIGIN</span>
                  <span className="text-white">FORGE</span>
                </h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Building the future of gaming identity with blockchain-powered verification and decentralized achievements.
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-gaming font-bold text-white">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'Main Website', href: 'https://originforge.games' },
                { name: 'Documentation', href: 'https://originforge.games/docs' },
                { name: 'About Us', href: 'https://originforge.games/about' },
                { name: 'Contact', href: 'https://originforge.games/contact' },
                { name: 'Privacy Policy', href: 'https://originforge.games/privacy' },
                { name: 'Terms of Service', href: 'https://originforge.games/terms' }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm">{link.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-gaming font-bold text-white">Connect With Us</h4>
            <div className="space-y-3">
              <motion.a
                href="https://originforge.games"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm">originforge.games</span>
              </motion.a>
              <motion.a
                href="mailto:hello@originforge.games"
                className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">hello@originforge.games</span>
              </motion.a>
              <motion.a
                href="https://github.com/origin-forge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm">
            © 2024 OriginForge Games. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-600">Survey powered by</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <span className="text-gray-400 text-xs">Supabase</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
