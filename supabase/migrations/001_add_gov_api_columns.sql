-- Add columns to support data.gov.hk school API sync
-- Run this in Supabase SQL Editor

-- Add missing columns to schools table
ALTER TABLE schools ADD COLUMN IF NOT EXISTS name_eng TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS registration_number TEXT UNIQUE;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS address_eng TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE schools ADD COLUMN IF NOT EXISTS is_registered BOOLEAN DEFAULT true;
