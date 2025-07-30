import { createClient } from '@supabase/supabase-js'

const URL = 'https://xfpyqpjbcnhqnledbstn.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmcHlxcGpiY25ocW5sZWRic3RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NjA3MjUsImV4cCI6MjA2OTQzNjcyNX0.IDmt4IbSgLBfEsvAiHSCmJ_HKR-ZN_OsLjSZArcWfbE'

export const supabase = createClient(URL, API_KEY)