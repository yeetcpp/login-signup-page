const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://nianociadpgoqjfphqgu.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pYW5vY2lhZHBnb3FqZnBocWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MDIzODcsImV4cCI6MjA1Nzk3ODM4N30.KLbBLlP9XHs08fTn2pGPG4ZubqbY0fy2wDIuGTXH4u8";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = supabase;
