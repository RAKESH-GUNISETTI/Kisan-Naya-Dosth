-- Add farming_details column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS farming_details JSONB DEFAULT NULL;

-- Add comment to the column
COMMENT ON COLUMN public.profiles.farming_details IS 'Stores farming-related details like location, land area, crops, etc.';

