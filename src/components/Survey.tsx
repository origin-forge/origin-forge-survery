"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Check, Gamepad2, Trophy, Zap } from 'lucide-react'
import Image from 'next/image'
import { surveyQuestions, type SurveyAnswers, type SurveyQuestion } from '@/data/surveyQuestions'
import { saveSurveyResponse } from '@/lib/supabase'

interface SurveyProps {
  onComplete?: (answers: SurveyAnswers) => void
  onClose?: () => void
}

export default function Survey({ onComplete, onClose }: SurveyProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswers>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const question = surveyQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100

  const handleAnswer = useCallback((questionId: number, answer: string | string[]) => {
    console.log('handleAnswer called:', { questionId, answer }) // Debug log
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: answer }
      console.log('New answers state:', newAnswers) // Debug log
      return newAnswers
    })
    
    // Calculate score for gamification
    const currentQuestion = surveyQuestions.find(q => q.id === questionId)
    if (currentQuestion?.options) {
      let questionScore = 0
      if (Array.isArray(answer)) {
        // Multiple choice - sum all selected points
        answer.forEach(a => {
          const option = currentQuestion.options?.find(opt => opt.value === a)
          questionScore += option?.points || 0
        })
      } else {
        // Single choice - get points for selected option
        const option = currentQuestion.options.find(opt => opt.value === answer)
        questionScore = option?.points || 0
      }
      setScore(prev => prev + questionScore)
    }
  }, [])

  const canProceed = useCallback(() => {
    const currentAnswer = answers[question.id]
    console.log('canProceed check:', { questionId: question.id, currentAnswer, required: question.required }) // Debug log
    if (!question.required) return true
    if (question.type === 'multiple-choice') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0
    }
    if (question.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return currentAnswer && typeof currentAnswer === 'string' && emailRegex.test(currentAnswer)
    }
    return currentAnswer !== undefined && currentAnswer !== ''
  }, [answers, question])

  const handleNext = async () => {
    console.log('handleNext clicked') // Debug log
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Survey completed - save to Supabase
      try {
        console.log('Saving survey response to Supabase...', { answers, score })
        await saveSurveyResponse(answers, score)
        console.log('Survey response saved successfully!')
        setIsCompleted(true)
        onComplete?.(answers)
      } catch (error) {
        console.error('Failed to save survey response:', error)
        // Still complete the survey even if save fails
        setIsCompleted(true)
        onComplete?.(answers)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  if (isCompleted) {
    return <CompletionScreen answers={answers} score={score} onClose={onClose} />
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Futuristic Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-amber-600/5" />
      </div>
      
      {/* Progress System */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base text-gray-300 font-mono">
              STAGE {currentQuestion + 1}/{surveyQuestions.length}
            </span>
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-800/80 border border-gray-600/30 rounded-full">
              <Trophy className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-mono font-bold">{score}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-lg sm:text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-800/50"
          >
            ✕
          </button>
        </div>
        <div className="w-full bg-gray-800/60 rounded-full h-1 sm:h-1.5 overflow-hidden border border-gray-700/30">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Main Survey Card */}
      <motion.div
        key={currentQuestion}
        className="w-full max-w-2xl mx-auto mt-20 sm:mt-24"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Card with Modern Glass Effect */}
        <div className="relative">
          {/* Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-black/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/50" />
          <div className="absolute inset-[1px] bg-gradient-to-br from-yellow-400/5 via-transparent to-amber-500/5 rounded-2xl" />
          
          {/* Content */}
          <div className="relative p-6 sm:p-8 md:p-10">
            
            {/* Gaming Level Badge */}
            {question.gameTitle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-6"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-gray-800/80 border border-gray-600/30 rounded-full backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-yellow-400 text-sm font-mono font-bold tracking-wider">{question.gameTitle}</span>
                </div>
              </motion.div>
            )}

            {/* Question Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
                {question.question}
              </h2>
              {question.description && (
                <p className="text-gray-300 text-base sm:text-lg mb-3 leading-relaxed max-w-xl mx-auto">
                  {question.description}
                </p>
              )}
              {question.humor && (
                <p className="text-yellow-400/80 text-sm italic font-mono tracking-wide">
                  {question.humor}
                </p>
              )}
            </motion.div>

            {/* Answer Options */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentQuestion}-options`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <QuestionRenderer
                  question={question}
                  answer={answers[question.id]}
                  onAnswer={(answer) => handleAnswer(question.id, answer)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between gap-4"
            >
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-4 sm:px-6 py-3 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 rounded-lg hover:bg-gray-800/50"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline font-mono">PREV</span>
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Next button clicked!', { canProceed: canProceed(), currentQuestion, answers })
                  handleNext()
                }}
                disabled={!canProceed()}
                className={`flex items-center gap-3 px-6 sm:px-8 py-3 rounded-lg font-bold font-mono tracking-wider transition-all duration-300 relative z-10 ${
                  canProceed() 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 active:scale-95 cursor-pointer' 
                    : 'bg-gray-600/50 text-gray-500 cursor-not-allowed opacity-30 border border-gray-600/30'
                }`}
                style={{ pointerEvents: canProceed() ? 'auto' : 'none', zIndex: 100 }}
              >
                <span>{currentQuestion === surveyQuestions.length - 1 ? 'COMPLETE' : 'NEXT'}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Enhanced Question Renderer Component with mobile optimization
function QuestionRenderer({ 
  question, 
  answer, 
  onAnswer 
}: { 
  question: SurveyQuestion
  answer: string | string[] | undefined
  onAnswer: (answer: string | string[]) => void 
}) {
  const handleOptionClick = (optionValue: string) => {
    console.log('Option clicked:', optionValue) // Debug log
    onAnswer(optionValue)
  }

  switch (question.type) {
    case 'single-choice':
      return (
        <div className="space-y-3 relative z-10">
          {question.options?.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Single choice button clicked!', option.value, option.label)
                handleOptionClick(option.value)
              }}
              className={`group w-full p-4 sm:p-5 text-left rounded-xl border transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer relative overflow-hidden ${
                answer === option.value
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/10 via-amber-500/5 to-transparent text-yellow-400 shadow-lg shadow-yellow-400/10'
                  : 'border-gray-600/50 bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 text-gray-300 hover:border-gray-500/70 hover:bg-gradient-to-br hover:from-gray-700/60 hover:via-gray-700/40 hover:to-gray-800/60'
              }`}
              style={{ pointerEvents: 'auto', zIndex: 100 }}
            >
              {/* Subtle glow effect for selected */}
              {answer === option.value && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-amber-500/5 rounded-xl" />
              )}
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Modern Icon Instead of Emoji */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    answer === option.value 
                      ? 'bg-yellow-400/20 border-yellow-400/50' 
                      : 'bg-gray-700/50 border-gray-600/50 group-hover:bg-gray-600/50'
                  }`}>
                    {answer === option.value ? (
                      <Check className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        answer === option.value ? 'bg-yellow-400' : 'bg-gray-500 group-hover:bg-gray-400'
                      }`} />
                    )}
                  </div>
                  <span className="font-medium text-sm sm:text-base leading-relaxed">{option.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {option.points && (
                    <div className={`px-2 py-1 rounded-full text-xs font-mono ${
                      answer === option.value 
                        ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                        : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                    }`}>
                      +{option.points}
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )

    case 'multiple-choice':
      const selectedAnswers = Array.isArray(answer) ? answer : []
      
      const handleMultipleChoice = (optionValue: string) => {
        console.log('Multiple choice clicked:', optionValue) // Debug log
        const newAnswers = selectedAnswers.includes(optionValue)
          ? selectedAnswers.filter(a => a !== optionValue)
          : [...selectedAnswers, optionValue]
        onAnswer(newAnswers)
      }

      return (
        <div className="space-y-3 relative z-10">
          {question.options?.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Multiple choice button clicked!', option.value, option.label)
                handleMultipleChoice(option.value)
              }}
              className={`group w-full p-4 sm:p-5 text-left rounded-xl border transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer relative overflow-hidden ${
                selectedAnswers.includes(option.value)
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/10 via-amber-500/5 to-transparent text-yellow-400 shadow-lg shadow-yellow-400/10'
                  : 'border-gray-600/50 bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 text-gray-300 hover:border-gray-500/70'
              }`}
              style={{ pointerEvents: 'auto', zIndex: 100 }}
            >
              {/* Selection glow effect */}
              {selectedAnswers.includes(option.value) && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-amber-500/5 rounded-xl" />
              )}
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Modern Checkbox */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    selectedAnswers.includes(option.value)
                      ? 'bg-yellow-400/20 border-yellow-400/50' 
                      : 'bg-gray-700/50 border-gray-600/50 group-hover:bg-gray-600/50'
                  }`}>
                    {selectedAnswers.includes(option.value) ? (
                      <Check className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <div className="w-4 h-4 border border-gray-500 rounded group-hover:border-gray-400 transition-colors" />
                    )}
                  </div>
                  <span className="font-medium text-sm sm:text-base leading-relaxed">{option.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {option.points && (
                    <div className={`px-2 py-1 rounded-full text-xs font-mono ${
                      selectedAnswers.includes(option.value)
                        ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                        : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                    }`}>
                      +{option.points}
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )

    case 'rating':
      const handleRatingClick = (optionValue: string) => {
        console.log('Rating clicked:', optionValue) // Debug log
        onAnswer(optionValue)
      }

      return (
        <div className="flex justify-center relative z-10">
          <div className="grid grid-cols-5 gap-3 sm:gap-4 max-w-2xl">
            {question.options?.map((option, index) => (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Rating button clicked!', option.value, option.label)
                  handleRatingClick(option.value)
                }}
                className={`group flex flex-col items-center p-4 sm:p-5 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden ${
                  answer === option.value
                    ? 'border-yellow-400 bg-gradient-to-br from-yellow-400/15 via-amber-500/10 to-transparent shadow-lg shadow-yellow-400/20'
                    : 'border-gray-600/50 bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 hover:border-gray-500/70'
                }`}
                style={{ pointerEvents: 'auto', zIndex: 100 }}
              >
                {/* Glow effect for selected */}
                {answer === option.value && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-amber-500/5 rounded-xl" />
                )}
                
                {/* Rating Icon */}
                <div className={`relative mb-3 transition-all duration-300 ${
                  answer === option.value ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  <Star className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${
                    answer === option.value 
                      ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm' 
                      : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                </div>
                
                {/* Label */}
                <span className={`text-xs sm:text-sm font-medium text-center font-mono transition-colors duration-300 ${
                  answer === option.value ? 'text-yellow-400' : 'text-gray-400 group-hover:text-gray-300'
                }`}>
                  {option.label}
                </span>
                
                {/* Points */}
                {option.points && (
                  <div className={`mt-2 px-2 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                    answer === option.value 
                      ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                      : 'bg-gray-700/50 text-gray-500 border border-gray-600/30 group-hover:bg-gray-600/50'
                  }`}>
                    +{option.points}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      )

    case 'text':
      return (
        <div className="relative z-10">
          <textarea
            value={answer as string || ''}
            onChange={(e) => {
              console.log('Text input changed:', e.target.value)
              onAnswer(e.target.value)
            }}
            onClick={(e) => {
              console.log('Text input clicked')
              e.stopPropagation()
            }}
            placeholder="Share your thoughts..."
            className="w-full h-32 sm:h-40 p-4 sm:p-5 bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400/70 focus:bg-gradient-to-br focus:from-gray-800/80 focus:via-gray-800/60 focus:to-gray-900/80 focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base leading-relaxed backdrop-blur-sm"
            style={{ pointerEvents: 'auto', zIndex: 100 }}
          />
        </div>
      )

    case 'email':
      return (
        <div className="relative z-10">
          <input
            type="email"
            value={answer as string || ''}
            onChange={(e) => {
              console.log('Email input changed:', e.target.value)
              onAnswer(e.target.value)
            }}
            onClick={(e) => {
              console.log('Email input clicked')
              e.stopPropagation()
            }}
            placeholder="your.email@example.com"
            className="w-full p-4 sm:p-5 bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-yellow-400/70 focus:bg-gradient-to-br focus:from-gray-800/80 focus:via-gray-800/60 focus:to-gray-900/80 focus:outline-none transition-all duration-300 text-sm sm:text-base backdrop-blur-sm"
            style={{ pointerEvents: 'auto', zIndex: 100 }}
          />
        </div>
      )

    default:
      return null
  }
}

// Enhanced Completion Screen Component with OriginForge branding
function CompletionScreen({ score, onClose }: { answers: SurveyAnswers, score: number, onClose?: () => void }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0
            }}
            animate={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto relative z-10"
      >
        {/* Animated OriginForge Logo with Aesthetic Enhancement */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto mb-8"
        >
          {/* Multi-layer Background Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.5] }}
            transition={{ delay: 0.8, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-full blur-3xl scale-[2] opacity-30"
          />
          
          {/* Secondary Glow Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.3] }}
            transition={{ delay: 1, duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 rounded-full blur-xl scale-150 opacity-40"
          />
          
          {/* Hexagonal Frame */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ delay: 1.2, duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-40 h-40 sm:w-48 sm:h-48 mx-auto"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              background: 'linear-gradient(45deg, rgba(251,191,36,0.1), rgba(245,158,11,0.2), rgba(251,191,36,0.1))',
              border: '1px solid rgba(251,191,36,0.3)'
            }}
          />
          
          {/* Logo Container with Rounded Square Aesthetic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-black/90 backdrop-blur-xl border-2 border-yellow-400/30 shadow-2xl shadow-yellow-400/20"
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(31,41,55,0.9) 0%, rgba(17,24,39,0.95) 50%, rgba(0,0,0,0.9) 100%)'
            }}
          >
            {/* Inner Border Glow */}
            <div className="absolute inset-[2px] rounded-[20px] bg-gradient-to-br from-yellow-400/5 via-transparent to-amber-500/5" />
            
            {/* Actual Logo */}
            <div className="absolute inset-4 flex items-center justify-center">
              <Image 
                src="/OriginForgeLogo (1).svg" 
                alt="OriginForge Logo" 
                width={120}
                height={120}
                className="w-full h-full object-contain filter drop-shadow-lg"
                style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.3))' }}
              />
            </div>
            
            {/* Corner Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-yellow-400/50 rounded-tl-md" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-yellow-400/50 rounded-tr-md" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-yellow-400/50 rounded-bl-md" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-yellow-400/50 rounded-br-md" />
          </motion.div>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-400/10 border border-yellow-400/30 rounded-full mb-4"
          >
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl sm:text-3xl font-bold text-yellow-400">{score} Gaming Points!</span>
            <Zap className="w-6 h-6 text-yellow-400" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-3xl sm:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              MISSION
            </span>
            <br />
            <span className="text-white">COMPLETE!</span>
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-lg sm:text-xl text-gray-300 mb-8 px-4 leading-relaxed"
        >
          Your gaming DNA is now part of the <span className="text-yellow-400 font-semibold">OriginForge</span> universe!<br/>
          Ready to explore the ultimate gaming platform?
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="https://originforge.games"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-xl text-lg overflow-hidden relative shadow-xl shadow-yellow-400/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-3">
              <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>Enter OriginForge</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-5"
              >
                <Zap className="w-5 h-5 text-black" />
              </motion.div>
            </div>
          </motion.a>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-xl transition-all duration-300"
          >
            Take Survey Again
          </motion.button>
        </motion.div>

        {/* Gaming Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 mb-2 font-mono">Survey completed in record time!</p>
          <div className="flex justify-center gap-6 text-xs text-gray-600 font-mono">
            <span>Gaming Pro Status: <span className="text-yellow-400">{score > 300 ? 'LEGEND' : score > 200 ? 'EXPERT' : score > 100 ? 'SKILLED' : 'RISING'}</span></span>
            <span>Completion Rate: <span className="text-green-400">100%</span></span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
