-- Fix security warnings by setting search_path for functions
-- First drop the triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;

-- Then drop the functions
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_updated_at();

-- Recreate handle_new_user with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

-- Recreate handle_updated_at with proper search_path
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate the triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();