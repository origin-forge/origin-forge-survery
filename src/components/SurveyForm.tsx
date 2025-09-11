"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  Gamepad2, 
  Monitor, 
  Radio, 
  MessageSquare, 
  Send, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Heart
} from 'lucide-react'

interface SurveyFormData {
  email: string
  favoriteGenre: string
  primaryPlatform: string
  npsScore: number | null
  howHeardAboutUs: string
  howHeardOther: string
  futureExpectations: string
}

interface SurveyFormErrors {
  email?: string
  favoriteGenre?: string
  primaryPlatform?: string
  npsScore?: string
  howHeardAboutUs?: string
  howHeardOther?: string
  futureExpectations?: string
}

const SurveyForm = () => {
  const [formData, setFormData] = useState<SurveyFormData>({
    email: '',
    favoriteGenre: '',
    primaryPlatform: '',
    npsScore: null,
    howHeardAboutUs: '',
    howHeardOther: '',
    futureExpectations: ''
  })

  const [errors, setErrors] = useState<SurveyFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showOtherField, setShowOtherField] = useState(false)

  const gameGenres = [
    'Action', 'Adventure', 'RPG (Role-Playing Game)', 'Strategy', 'Simulation', 
    'Sports', 'Racing', 'Fighting', 'Puzzle', 'Horror', 'Shooter (FPS/TPS)', 
    'Platform', 'MMORPG', 'Battle Royale', 'Indie', 'Other'
  ]

  const gamingPlatforms = [
    'PC (Windows)', 'PC (Mac)', 'PC (Linux)', 'PlayStation 5', 'PlayStation 4',
    'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Mobile (iOS)', 'Mobile (Android)',
    'Steam Deck', 'Other'
  ]

  const howHeardOptions = [
    'Search Engine (Google, Bing, etc.)', 'Social Media (Twitter, Facebook, Instagram)',
    'Gaming Forums (Reddit, Discord)', 'Friend/Word of Mouth', 'Gaming News Website',
    'YouTube/Twitch', 'Advertisement', 'Gaming Event/Convention', 'Other'
  ]

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: SurveyFormErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.favoriteGenre) {
      newErrors.favoriteGenre = 'Please select your favorite game genre'
    }

    if (!formData.primaryPlatform) {
      newErrors.primaryPlatform = 'Please select your primary gaming platform'
    }

    if (formData.npsScore === null) {
      newErrors.npsScore = 'Please rate how likely you are to recommend us'
    }

    if (!formData.howHeardAboutUs) {
      newErrors.howHeardAboutUs = 'Please tell us how you heard about us'
    }

    if (formData.howHeardAboutUs === 'Other' && !formData.howHeardOther) {
      newErrors.howHeardOther = 'Please specify how you heard about us'
    }

    if (!formData.futureExpectations) {
      newErrors.futureExpectations = 'Please share what you would like to see from us'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement Supabase submission logic here
      console.log('Survey Data:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setIsSubmitted(true)
      
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your response. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHowHeardChange = (value: string) => {
    setFormData(prev => ({ ...prev, howHeardAboutUs: value, howHeardOther: '' }))
    setShowOtherField(value === 'Other')
  }

  const resetForm = () => {
    setFormData({
      email: '',
      favoriteGenre: '',
      primaryPlatform: '',
      npsScore: null,
      howHeardAboutUs: '',
      howHeardOther: '',
      futureExpectations: ''
    })
    setShowOtherField(false)
    setIsSubmitted(false)
    setErrors({})
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 to-black/90 backdrop-blur-lg border border-green-500/30 shadow-2xl shadow-green-500/20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-500/5 to-green-600/10"></div>
          <CardContent className="relative z-10 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-3xl font-gaming font-bold text-white mb-4">
              MISSION COMPLETE!
            </h3>
            
            <p className="text-gray-300 mb-8 text-lg">
              Thank you for helping us shape the future of gaming identity. Your feedback is invaluable to the OriginForge community.
            </p>

            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-300 text-black font-gaming font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30"
            >
              SUBMIT ANOTHER RESPONSE
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 to-black/90 backdrop-blur-lg border border-yellow-400/30 shadow-2xl shadow-yellow-400/20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-amber-500/10 to-yellow-600/5"></div>
        
        <CardHeader className="relative z-10 text-center pb-8">
          <motion.div
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/30">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </motion.div>
          
          <CardTitle className="text-4xl font-gaming gradient-text mb-4">
            GAMING SURVEY
          </CardTitle>
          <CardDescription className="text-lg text-gray-300 max-w-2xl mx-auto">
            Help us build the ultimate gaming identity platform by sharing your insights and preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent className="relative z-10 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Email Field */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <Label htmlFor="email" className="text-sm font-semibold text-gray-200">
                  Email Address *
                </Label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200 ${errors.email ? 'border-red-500' : ''}`}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className="text-sm text-red-400 flex items-center space-x-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Game Genre */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-purple-400" />
                </div>
                <Label className="text-sm font-semibold text-gray-200">
                  What is your favorite game genre? *
                </Label>
              </div>
              <Select
                value={formData.favoriteGenre}
                onValueChange={(value) => setFormData(prev => ({ ...prev, favoriteGenre: value }))}
              >
                <SelectTrigger className={`bg-slate-700/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 transition-all duration-200 ${errors.favoriteGenre ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select your favorite genre" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {gameGenres.map((genre) => (
                    <SelectItem key={genre} value={genre} className="text-white hover:bg-slate-700">
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.favoriteGenre && (
                  <motion.p
                    className="text-sm text-red-400 flex items-center space-x-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.favoriteGenre}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Gaming Platform */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-lg flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-green-400" />
                </div>
                <Label className="text-sm font-semibold text-gray-200">
                  What is your primary gaming platform? *
                </Label>
              </div>
              <Select
                value={formData.primaryPlatform}
                onValueChange={(value) => setFormData(prev => ({ ...prev, primaryPlatform: value }))}
              >
                <SelectTrigger className={`bg-slate-700/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 ${errors.primaryPlatform ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select your primary platform" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {gamingPlatforms.map((platform) => (
                    <SelectItem key={platform} value={platform} className="text-white hover:bg-slate-700">
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.primaryPlatform && (
                  <motion.p
                    className="text-sm text-red-400 flex items-center space-x-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.primaryPlatform}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* NPS Score */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-yellow-400" />
                </div>
                <Label className="text-sm font-semibold text-gray-200">
                  How likely are you to recommend OriginForge to a friend? *
                </Label>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Not at all likely</span>
                  <span>Extremely likely</span>
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, npsScore: score }))}
                      className={`h-12 rounded-lg border-2 font-bold transition-all duration-200 ${
                        formData.npsScore === score
                          ? 'bg-gradient-to-br from-yellow-400 to-amber-500 border-yellow-500 text-black shadow-lg shadow-yellow-400/30'
                          : 'border-slate-600 bg-slate-700/50 text-gray-300 hover:border-yellow-400/50 hover:bg-slate-600/50'
                      }`}
                    >
                      {score}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {errors.npsScore && (
                    <motion.p
                      className="text-sm text-red-400 flex items-center space-x-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.npsScore}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* How did you hear about us */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Radio className="w-4 h-4 text-cyan-400" />
                </div>
                <Label className="text-sm font-semibold text-gray-200">
                  How did you hear about us? *
                </Label>
              </div>
              <Select
                value={formData.howHeardAboutUs}
                onValueChange={handleHowHeardChange}
              >
                <SelectTrigger className={`bg-slate-700/50 border-slate-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20 ${errors.howHeardAboutUs ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select how you heard about us" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  {howHeardOptions.map((option) => (
                    <SelectItem key={option} value={option} className="text-white hover:bg-slate-700">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <AnimatePresence>
                {errors.howHeardAboutUs && (
                  <motion.p
                    className="text-sm text-red-400 flex items-center space-x-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.howHeardAboutUs}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Other field (conditional) */}
            <AnimatePresence>
              {showOtherField && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, height: 0, x: -20 }}
                  animate={{ opacity: 1, height: 'auto', x: 0 }}
                  exit={{ opacity: 0, height: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="howHeardOther" className="text-sm font-semibold text-gray-200">
                    Please specify how you heard about us *
                  </Label>
                  <Input
                    id="howHeardOther"
                    placeholder="Please specify..."
                    value={formData.howHeardOther}
                    onChange={(e) => setFormData(prev => ({ ...prev, howHeardOther: e.target.value }))}
                    className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 ${errors.howHeardOther ? 'border-red-500' : ''}`}
                  />
                  <AnimatePresence>
                    {errors.howHeardOther && (
                      <motion.p
                        className="text-sm text-red-400 flex items-center space-x-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.howHeardOther}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Future Expectations */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-pink-400" />
                </div>
                <Label htmlFor="futureExpectations" className="text-sm font-semibold text-gray-200">
                  What would you like to see from us in the future? *
                </Label>
              </div>
              <Textarea
                id="futureExpectations"
                placeholder="Share your thoughts, suggestions, or features you'd like to see..."
                value={formData.futureExpectations}
                onChange={(e) => setFormData(prev => ({ ...prev, futureExpectations: e.target.value }))}
                className={`min-h-[120px] bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20 resize-none ${errors.futureExpectations ? 'border-red-500' : ''}`}
              />
              <AnimatePresence>
                {errors.futureExpectations && (
                  <motion.p
                    className="text-sm text-red-400 flex items-center space-x-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.futureExpectations}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-300 text-black font-gaming font-bold py-4 text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>SUBMITTING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>SUBMIT SURVEY</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SurveyForm
