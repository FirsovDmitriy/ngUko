import { createClient } from '@supabase/supabase-js'

const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZGlhZW50aW9oamNrYmhqcW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3MjE1MDEsImV4cCI6MjAwMTI5NzUwMX0.nwLS70vWf_ne6E34C4t7n5o2csfDVN8m-XP0_98drYY'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://pbdiaentiohjckbhjqml.supabase.co', key);
