-- Add user_type column to distinguish UNSW, other university, and high school students
ALTER TABLE profiles ADD COLUMN user_type TEXT DEFAULT 'unsw' CHECK (user_type IN ('unsw', 'other_uni', 'high_school'));

-- Add uni_id for other university students
ALTER TABLE profiles ADD COLUMN uni_id TEXT DEFAULT '';

-- Add high_school for high school students
ALTER TABLE profiles ADD COLUMN high_school TEXT DEFAULT '';
