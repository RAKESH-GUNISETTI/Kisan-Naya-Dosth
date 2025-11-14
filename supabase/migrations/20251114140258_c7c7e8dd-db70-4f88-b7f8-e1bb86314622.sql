-- Add farming_details column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN farming_details JSONB DEFAULT '{}'::jsonb;

-- Create crop_plans table for Save Plan feature
CREATE TABLE public.crop_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_type TEXT NOT NULL,
  acreage NUMERIC NOT NULL,
  seed_rate INTEGER NOT NULL,
  irrigation_level INTEGER NOT NULL,
  projected_yield NUMERIC NOT NULL,
  projected_cost NUMERIC NOT NULL,
  projected_revenue NUMERIC NOT NULL,
  projected_profit NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on crop_plans
ALTER TABLE public.crop_plans ENABLE ROW LEVEL SECURITY;

-- Policies for crop_plans
CREATE POLICY "Users can view their own crop plans"
ON public.crop_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own crop plans"
ON public.crop_plans FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own crop plans"
ON public.crop_plans FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own crop plans"
ON public.crop_plans FOR DELETE
USING (auth.uid() = user_id);

-- Create crop_scenarios table for View Scenarios feature
CREATE TABLE public.crop_scenarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_name TEXT NOT NULL,
  crop_type TEXT NOT NULL,
  acreage NUMERIC NOT NULL,
  seed_rate INTEGER NOT NULL,
  irrigation_level INTEGER NOT NULL,
  projected_yield NUMERIC NOT NULL,
  projected_profit NUMERIC NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on crop_scenarios
ALTER TABLE public.crop_scenarios ENABLE ROW LEVEL SECURITY;

-- Policies for crop_scenarios
CREATE POLICY "Users can view their own scenarios"
ON public.crop_scenarios FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own scenarios"
ON public.crop_scenarios FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scenarios"
ON public.crop_scenarios FOR DELETE
USING (auth.uid() = user_id);

-- Create dashboard_tasks table for task management
CREATE TABLE public.dashboard_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  field_name TEXT,
  status TEXT DEFAULT 'pending',
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on dashboard_tasks
ALTER TABLE public.dashboard_tasks ENABLE ROW LEVEL SECURITY;

-- Policies for dashboard_tasks
CREATE POLICY "Users can manage their own tasks"
ON public.dashboard_tasks FOR ALL
USING (auth.uid() = user_id);

-- Add trigger for updated_at on crop_plans
CREATE TRIGGER update_crop_plans_updated_at
BEFORE UPDATE ON public.crop_plans
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Add trigger for updated_at on dashboard_tasks
CREATE TRIGGER update_dashboard_tasks_updated_at
BEFORE UPDATE ON public.dashboard_tasks
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();