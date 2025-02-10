import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!, // or normal .env
    process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY! // Service role, be cautious
  );