-- Add more category types to roadmap_category enum
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'ai_ml';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'database';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'blockchain';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'security';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'management';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'community';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'infrastructure';
ALTER TYPE roadmap_category ADD VALUE IF NOT EXISTS 'programming';