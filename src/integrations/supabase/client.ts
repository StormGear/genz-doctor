// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mawjwtibmtqooqqlmplj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hd2p3dGlibXRxb29xcWxtcGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTk5NjUsImV4cCI6MjA2MTU5NTk2NX0.R-3SV05E5GHLexB_NKfpdoIWEBzgjTEfQhkkCEIGVSM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);