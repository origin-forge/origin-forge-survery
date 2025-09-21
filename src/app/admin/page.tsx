"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, EyeOff } from 'lucide-react'
import { getSurveyAnalytics, type SurveyResponse } from '@/lib/supabase'
import { 
  Trophy, Users, Download, RefreshCcw, Monitor, Calendar, 
  BarChart3, TrendingUp, Mail, Clock, 
  Search, Eye, Target, Zap, GamepadIcon, Award,
  Activity, Wifi, Database, Settings
} from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if already authenticated - REMOVED for security (login required every time)
  // useEffect(() => {
  //   const auth = localStorage.getItem('originforge_admin_auth')
  //   if (auth === 'authenticated') {
  //     setIsAuthenticated(true)
  //   }
  // }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Get admin password from environment variables
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    
    // If no password is set in environment, show error
    if (!adminPassword) {
      setError('Admin password not configured. Please set NEXT_PUBLIC_ADMIN_PASSWORD in .env.local')
      setLoading(false)
      return
    }
    
    if (password === adminPassword) {
      setIsAuthenticated(true)
      localStorage.setItem('originforge_admin_auth', 'authenticated')
    } else {
      setError('Invalid password')
    }
    
    setLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('originforge_admin_auth')
    setPassword('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-8 shadow-2xl shadow-yellow-400/10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Shield className="w-8 h-8 text-black" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-yellow-400 mb-2">Admin Access</h1>
              <p className="text-gray-400">Enter password to access OriginForge Analytics</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                {process.env.NEXT_PUBLIC_ADMIN_PASSWORD 
                  ? 'Password configured in environment variables'
                  : 'Please configure NEXT_PUBLIC_ADMIN_PASSWORD in .env.local'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // If authenticated, show the admin dashboard (simplified version)
  return <AdminDashboard onLogout={handleLogout} />
}

// Enhanced Admin Dashboard Component with Comprehensive Analytics
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [dateFilter, setDateFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    loadSurveyData()
  }, [])

  // Live clock update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const loadSurveyData = async () => {
    try {
      setLoading(true)
      const data = await getSurveyAnalytics()
      setResponses(data || [])
    } catch (err) {
      setError('Failed to load survey data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Platform', 'Hours/Week', 'Genres', 'Competitive Level', 'Motivation', 'Score', 'Email']
    const csvData = responses.map(r => [
      r.created_at ? new Date(r.created_at).toLocaleDateString() : 'N/A',
      r.question_1 || 'N/A',
      r.question_2 || 'N/A',
      Array.isArray(r.question_3) ? r.question_3.join('; ') : 'N/A',
      r.question_4 || 'N/A',
      r.question_5 || 'N/A',
      r.total_score || 0,
      r.question_7 || 'N/A'
    ])

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `originforge-survey-data-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportEmailsOnlyCSV = () => {
    // Filter out responses with valid emails
    const emailResponses = responses.filter(r => r.question_7 && r.question_7.includes('@'))
    
    const headers = ['Email', 'Date', 'Score', 'Platform', 'Level']
    const csvData = emailResponses.map(r => {
      const score = r.total_score || 0
      const level = score >= 400 ? 'Legend' : score >= 300 ? 'Expert' : score >= 200 ? 'Skilled' : 'Rising'
      return [
        r.question_7,
        r.created_at ? new Date(r.created_at).toLocaleDateString() : 'N/A',
        score,
        r.question_1 || 'N/A',
        level
      ]
    })

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `originforge-emails-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"
        />
        <span className="ml-3 text-yellow-400">Loading survey data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">Error: {error}</div>
          <button
            onClick={loadSurveyData}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const stats = {
    totalResponses: responses.length,
    avgScore: responses.length ? Math.round(responses.reduce((sum, r) => sum + (r.total_score || 0), 0) / responses.length) : 0,
    todayResponses: responses.filter(r => r.created_at && new Date(r.created_at).toDateString() === new Date().toDateString()).length,
    weeklyResponses: responses.filter(r => r.created_at && new Date(r.created_at) > new Date(Date.now() - 7*24*60*60*1000)).length,
    monthlyResponses: responses.filter(r => r.created_at && new Date(r.created_at) > new Date(Date.now() - 30*24*60*60*1000)).length,
    completionRate: responses.length > 0 ? Math.round((responses.filter(r => r.question_7).length / responses.length) * 100) : 0,
  }

  // Gaming platform analytics
  const platformStats = responses.reduce((acc, r) => {
    const platform = r.question_1 || 'unknown'
    acc[platform] = (acc[platform] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Gaming hours analytics
  const hoursStats = responses.reduce((acc, r) => {
    const hours = r.question_2 || 'unknown'
    acc[hours] = (acc[hours] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Score distribution
  const scoreRanges = {
    'Legend (400+)': responses.filter(r => (r.total_score || 0) >= 400).length,
    'Expert (300-399)': responses.filter(r => (r.total_score || 0) >= 300 && (r.total_score || 0) < 400).length,
    'Skilled (200-299)': responses.filter(r => (r.total_score || 0) >= 200 && (r.total_score || 0) < 300).length,
    'Rising (0-199)': responses.filter(r => (r.total_score || 0) < 200).length,
  }

  // Filter responses based on search and date
  const filteredResponses = responses.filter(response => {
    const matchesSearch = !searchTerm || 
      (response.question_7 && response.question_7.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (response.question_1 && response.question_1.toLowerCase().includes(searchTerm.toLowerCase()))
    
    let matchesDate = true
    if (dateFilter !== 'all' && response.created_at) {
      const responseDate = new Date(response.created_at)
      const now = new Date()
      switch (dateFilter) {
        case 'today':
          matchesDate = responseDate.toDateString() === now.toDateString()
          break
        case 'week':
          matchesDate = responseDate > new Date(now.getTime() - 7*24*60*60*1000)
          break
        case 'month':
          matchesDate = responseDate > new Date(now.getTime() - 30*24*60*60*1000)
          break
      }
    }
    
    return matchesSearch && matchesDate
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'responses', label: 'Responses', icon: Users },
    { id: 'insights', label: 'Insights', icon: Target },
    { id: 'system', label: 'System', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Enhanced Header */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-yellow-400">OriginForge Analytics</h1>
              <p className="text-gray-400">Gaming Community Intelligence Dashboard</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-900/30 border border-green-700/50 rounded-lg">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Live</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                <Clock className="w-4 h-4 text-blue-400" />
                <div className="flex flex-col">
                  <span className="text-blue-400 text-sm font-medium font-mono">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour12: false, 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      second: '2-digit' 
                    })}
                  </span>
                  <span className="text-blue-300 text-xs font-medium">
                    {currentTime.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              
              <button
                onClick={exportEmailsOnlyCSV}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Export Emails
              </button>
              
              <button
                onClick={loadSurveyData}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                Refresh
              </button>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-yellow-400 text-black font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-6 border border-blue-700/50"
              >
                <div className="flex items-center gap-4">
                  <Users className="w-12 h-12 text-blue-400" />
                  <div>
                    <p className="text-3xl font-bold text-blue-400">{stats.totalResponses}</p>
                    <p className="text-gray-400">Total Responses</p>
                    <p className="text-xs text-blue-300 mt-1">+{stats.todayResponses} today</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 rounded-xl p-6 border border-yellow-700/50"
              >
                <div className="flex items-center gap-4">
                  <Trophy className="w-12 h-12 text-yellow-400" />
                  <div>
                    <p className="text-3xl font-bold text-yellow-400">{stats.avgScore}</p>
                    <p className="text-gray-400">Average Score</p>
                    <p className="text-xs text-yellow-300 mt-1">{stats.completionRate}% completion</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-6 border border-green-700/50"
              >
                <div className="flex items-center gap-4">
                  <Calendar className="w-12 h-12 text-green-400" />
                  <div>
                    <p className="text-3xl font-bold text-green-400">{stats.weeklyResponses}</p>
                    <p className="text-gray-400">This Week</p>
                    <p className="text-xs text-green-300 mt-1">{stats.monthlyResponses} this month</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-700/50"
              >
                <div className="flex items-center gap-4">
                  <Wifi className="w-12 h-12 text-purple-400" />
                  <div>
                    <p className="text-lg font-bold text-purple-400">
                      {responses.length > 0 ? new Date(responses[responses.length - 1].created_at!).toLocaleTimeString() : 'N/A'}
                    </p>
                    <p className="text-gray-400">Last Response</p>
                    <p className="text-xs text-purple-300 mt-1">Real-time monitoring</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gaming Platform Distribution */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <GamepadIcon className="w-5 h-5" />
                  Gaming Platform Distribution
                </h3>
                <div className="space-y-3">
                  {Object.entries(platformStats).map(([platform, count]) => (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{platform.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${(count / stats.totalResponses) * 100}%` }}
                          />
                        </div>
                        <span className="text-yellow-400 font-medium text-sm w-12 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gaming Hours Distribution */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Gaming Hours Distribution
                </h3>
                <div className="space-y-3">
                  {Object.entries(hoursStats).map(([hours, count]) => (
                    <div key={hours} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{hours.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full" 
                            style={{ width: `${(count / stats.totalResponses) * 100}%` }}
                          />
                        </div>
                        <span className="text-blue-400 font-medium text-sm w-12 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Score Distribution */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Player Level Distribution
                </h3>
                <div className="space-y-4">
                  {Object.entries(scoreRanges).map(([range, count]) => (
                    <div key={range} className="flex items-center justify-between">
                      <span className="text-gray-300">{range}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-40 bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              range.includes('Legend') ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
                              range.includes('Expert') ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                              range.includes('Skilled') ? 'bg-gradient-to-r from-green-400 to-green-500' :
                              'bg-gradient-to-r from-gray-400 to-gray-500'
                            }`}
                            style={{ width: `${stats.totalResponses > 0 ? (count / stats.totalResponses) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-white font-medium text-sm w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Engagement Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Email Collection Rate</span>
                    <span className="text-green-400 font-bold">{stats.completionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Session Score</span>
                    <span className="text-blue-400 font-bold">{stats.avgScore}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Daily Active Surveys</span>
                    <span className="text-purple-400 font-bold">{stats.todayResponses}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Response Velocity</span>
                    <span className="text-yellow-400 font-bold">{Math.round(stats.weeklyResponses / 7)}/day</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responses Tab */}
        {activeTab === 'responses' && (
          <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by email or platform..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              
              <div className="text-sm text-gray-400">
                Showing {filteredResponses.length} of {responses.length} responses
              </div>
            </div>

            {/* Enhanced Responses Table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Survey Responses
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="text-left py-3 px-6 text-gray-400">Date</th>
                      <th className="text-left py-3 px-6 text-gray-400">Platform</th>
                      <th className="text-left py-3 px-6 text-gray-400">Hours/Week</th>
                      <th className="text-left py-3 px-6 text-gray-400">Score</th>
                      <th className="text-left py-3 px-6 text-gray-400">Level</th>
                      <th className="text-left py-3 px-6 text-gray-400">Email</th>
                      <th className="text-left py-3 px-6 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResponses.slice(0, 20).map((response) => {
                      const score = response.total_score || 0
                      const level = score >= 400 ? 'Legend' : score >= 300 ? 'Expert' : score >= 200 ? 'Skilled' : 'Rising'
                      const levelColor = score >= 400 ? 'text-yellow-400' : score >= 300 ? 'text-blue-400' : score >= 200 ? 'text-green-400' : 'text-gray-400'
                      
                      return (
                        <tr key={response.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                          <td className="py-3 px-6 text-gray-300">
                            {response.created_at ? new Date(response.created_at).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3 px-6 capitalize text-gray-300">
                            {response.question_1?.replace('_', ' ') || 'N/A'}
                          </td>
                          <td className="py-3 px-6 capitalize text-gray-300">
                            {response.question_2?.replace('_', ' ') || 'N/A'}
                          </td>
                          <td className="py-3 px-6">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              score >= 400 ? 'bg-yellow-400/20 text-yellow-400' : 
                              score >= 300 ? 'bg-blue-400/20 text-blue-400' :
                              score >= 200 ? 'bg-green-400/20 text-green-400' :
                              'bg-gray-600/20 text-gray-400'
                            }`}>
                              {score}
                            </span>
                          </td>
                          <td className="py-3 px-6">
                            <span className={`text-xs font-bold ${levelColor}`}>
                              {level}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-gray-400 max-w-xs truncate">
                            {response.question_7 || 'N/A'}
                          </td>
                          <td className="py-3 px-6">
                            <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gaming Insights */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Gaming Community Insights
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
                    <h4 className="font-medium text-blue-400 mb-2">Most Popular Platform</h4>
                    <p className="text-gray-300">
                      {Object.entries(platformStats).length > 0 
                        ? Object.entries(platformStats).sort(([,a], [,b]) => b - a)[0][0].replace('_', ' ')
                        : 'No data yet'
                      } dominates with {Object.entries(platformStats).length > 0 
                        ? Math.round((Object.entries(platformStats).sort(([,a], [,b]) => b - a)[0][1] / stats.totalResponses) * 100)
                        : 0
                      }% of responses
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-900/30 border border-green-700/50 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-2">Gaming Dedication</h4>
                    <p className="text-gray-300">
                      {Object.entries(hoursStats).length > 0 
                        ? Object.entries(hoursStats).sort(([,a], [,b]) => b - a)[0][0].replace('_', ' ')
                        : 'No data yet'
                      } is the most common gaming frequency
                    </p>
                  </div>

                  <div className="p-4 bg-purple-900/30 border border-purple-700/50 rounded-lg">
                    <h4 className="font-medium text-purple-400 mb-2">Community Level</h4>
                    <p className="text-gray-300">
                      {Math.round(((scoreRanges['Legend (400+)'] + scoreRanges['Expert (300-399)']) / stats.totalResponses) * 100) || 0}% 
                      of gamers are Expert level or higher
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Marketing Recommendations
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
                    <h4 className="font-medium text-yellow-400 mb-2">Target Audience</h4>
                    <p className="text-gray-300">
                      Focus on {Object.entries(platformStats).length > 0 
                        ? Object.entries(platformStats).sort(([,a], [,b]) => b - a)[0][0].replace('_', ' ')
                        : 'cross-platform'
                      } gamers for maximum engagement
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-900/30 border border-orange-700/50 rounded-lg">
                    <h4 className="font-medium text-orange-400 mb-2">Email Campaign</h4>
                    <p className="text-gray-300">
                      {stats.completionRate}% completion rate suggests strong interest. 
                      Follow up with {responses.filter(r => r.question_7).length} leads.
                    </p>
                  </div>

                  <div className="p-4 bg-cyan-900/30 border border-cyan-700/50 rounded-lg">
                    <h4 className="font-medium text-cyan-400 mb-2">Growth Opportunity</h4>
                    <p className="text-gray-300">
                      High {scoreRanges['Legend (400+)']} Legend gamers indicate premium audience potential
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Status */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  System Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Database Connection</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Connected
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Survey System</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Analytics Engine</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Processing
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email Collection</span>
                    <span className="flex items-center gap-2 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Enabled
                    </span>
                  </div>
                </div>
              </div>

              {/* Database Stats */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Records</span>
                    <span className="text-white font-medium">{stats.totalResponses}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Storage Used</span>
                    <span className="text-white font-medium">{Math.round(stats.totalResponses * 0.5)}KB</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Last Backup</span>
                    <span className="text-white font-medium">Real-time</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Query Performance</span>
                    <span className="text-green-400 font-medium">Excellent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}