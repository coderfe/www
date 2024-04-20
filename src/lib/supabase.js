import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.PUBLIC_SUPABASE_SERVICE_KEY;
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
