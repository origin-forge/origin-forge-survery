import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface SurveyResponse {
  id?: string
  created_at?: string
  platforms?: string[]
  frequency?: string
  achievements?: string
  frustrated?: string
  showoff?: string
  interest?: string
  price?: string
  features?: string[]
  age?: string
  location?: string
  spend?: string
  frustration?: string
  excited?: string
  thoughts?: string
  notify?: string
  email?: string
  discord?: string
  total_score?: number
  user_agent?: string
  ip_address?: string
}

// Helper function to save survey response
export async function saveSurveyResponse(answers: Record<string, string | string[]>, score: number) {
  try {
    // Transform answers into our database format
    const surveyData: SurveyResponse = {
      platforms: Array.isArray(answers['platforms']) ? answers['platforms'] : [answers['platforms'] as string],
      frequency: answers['frequency'] as string,
      achievements: answers['achievements'] as string,
      frustrated: answers['frustrated'] as string,
      showoff: answers['showoff'] as string,
      interest: answers['interest'] as string,
      price: answers['price'] as string,
      features: Array.isArray(answers['features']) ? answers['features'] : [answers['features'] as string],
      age: answers['age'] as string,
      location: answers['location'] as string,
      spend: answers['spend'] as string,
      frustration: answers['frustration'] as string,
      excited: answers['excited'] as string,
      thoughts: answers['thoughts'] as string,
      notify: answers['notify'] as string,
      email: answers['email'] as string,
      discord: answers['discord'] as string,
      total_score: score,
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    }

    const { data, error } = await supabase
      .from('survey_responses')
      .insert([surveyData])
      .select()

    if (error) {
      console.error('Error saving survey response:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to save survey response:', error)
    throw error
  }
}

// Helper function to get survey analytics
export async function getSurveyAnalytics() {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching survey analytics:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to fetch survey analytics:', error)
    throw error
  }
}

// Helper function to get response count by date range
export async function getResponsesByDateRange(days: number = 30) {
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from('survey_responses')
      .select('created_at, total_score')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching responses by date range:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to fetch responses by date range:', error)
    throw error
  }
}

// Helper function to get aggregated stats
export async function getAggregatedStats() {
  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('question_1, question_2, question_3, question_4, question_5, total_score, created_at')

    if (error) {
      console.error('Error fetching aggregated stats:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to fetch aggregated stats:', error)
    throw error
  }
}

// Helper function to delete old responses (for GDPR compliance)
export async function deleteOldResponses(daysOld: number = 365) {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    const { data, error } = await supabase
      .from('survey_responses')
      .delete()
      .lt('created_at', cutoffDate.toISOString())

    if (error) {
      console.error('Error deleting old responses:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Failed to delete old responses:', error)
    throw error
  }
}
