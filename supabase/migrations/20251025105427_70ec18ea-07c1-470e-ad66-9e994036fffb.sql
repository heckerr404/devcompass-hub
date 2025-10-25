-- Create enum for roadmap categories
CREATE TYPE public.roadmap_category AS ENUM ('frontend', 'backend', 'devops', 'mobile', 'data', 'design');

-- Create roadmaps table
CREATE TABLE public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category roadmap_category NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create roadmap nodes table
CREATE TABLE public.roadmap_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID REFERENCES public.roadmaps(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  position_x INTEGER NOT NULL,
  position_y INTEGER NOT NULL,
  level TEXT NOT NULL,
  resources JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  instructor TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  thumbnail_url TEXT,
  roadmap_id UUID REFERENCES public.roadmaps(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user purchases table
CREATE TABLE public.user_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roadmaps (public read)
CREATE POLICY "Roadmaps are viewable by everyone"
  ON public.roadmaps FOR SELECT
  USING (true);

-- RLS Policies for roadmap nodes (public read)
CREATE POLICY "Roadmap nodes are viewable by everyone"
  ON public.roadmap_nodes FOR SELECT
  USING (true);

-- RLS Policies for courses (public read)
CREATE POLICY "Courses are viewable by everyone"
  ON public.courses FOR SELECT
  USING (true);

-- RLS Policies for user purchases (users can view their own)
CREATE POLICY "Users can view their own purchases"
  ON public.user_purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases"
  ON public.user_purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert sample roadmaps
INSERT INTO public.roadmaps (title, description, category, icon) VALUES
('Frontend Development', 'Master modern frontend technologies including React, TypeScript, and more', 'frontend', '🎨'),
('Backend Development', 'Learn server-side development with Node.js, databases, and APIs', 'backend', '⚙️'),
('DevOps Engineering', 'Infrastructure, CI/CD, containers, and cloud platforms', 'devops', '🚀'),
('Mobile Development', 'Build native and cross-platform mobile applications', 'mobile', '📱'),
('Data Science', 'Data analysis, machine learning, and AI fundamentals', 'data', '📊'),
('UI/UX Design', 'Design principles, user research, and prototyping', 'design', '✨');

-- Insert sample courses
INSERT INTO public.courses (title, description, price, instructor, duration, level, thumbnail_url, roadmap_id) VALUES
('React Mastery', 'Complete React course from beginner to advanced', 49.99, 'Sarah Johnson', '40 hours', 'Intermediate', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', (SELECT id FROM public.roadmaps WHERE category = 'frontend' LIMIT 1)),
('Node.js Complete Guide', 'Build scalable backend applications with Node.js', 59.99, 'Mike Chen', '35 hours', 'Intermediate', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800', (SELECT id FROM public.roadmaps WHERE category = 'backend' LIMIT 1)),
('Docker & Kubernetes', 'Container orchestration and deployment strategies', 69.99, 'Alex Rivera', '30 hours', 'Advanced', 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800', (SELECT id FROM public.roadmaps WHERE category = 'devops' LIMIT 1)),
('React Native Bootcamp', 'Build iOS and Android apps with React Native', 54.99, 'Emma Davis', '45 hours', 'Beginner', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800', (SELECT id FROM public.roadmaps WHERE category = 'mobile' LIMIT 1)),
('Python for Data Science', 'Data analysis and visualization with Python', 44.99, 'David Kim', '38 hours', 'Beginner', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', (SELECT id FROM public.roadmaps WHERE category = 'data' LIMIT 1)),
('UX Design Fundamentals', 'User-centered design principles and practices', 39.99, 'Lisa Martinez', '25 hours', 'Beginner', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', (SELECT id FROM public.roadmaps WHERE category = 'design' LIMIT 1));