-- Delete unwanted roadmaps
DELETE FROM roadmaps WHERE id IN (
  '7dd42f79-5a50-48d6-b6fb-1234c50c2f5c', -- Rust Programming
  'f186c29e-ba67-45c9-a1a8-e4ff7eda54a9', -- Developer Relations
  '6bfefd49-b6c4-4bef-b78c-6c9c84c53156', -- React Native
  '7ebcdeec-96a4-4751-81d1-b8f5f9e752cd', -- Python Development
  '3bae3861-7236-402b-a9f9-4036f1d64e4e', -- Java Development
  'e61e82fc-de4a-4cbd-a203-e123f8c0596d'  -- Go Programming
);