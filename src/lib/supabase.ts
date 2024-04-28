// @ts-ignore
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.PUBLIC_SUPABASE_SERVICE_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);
