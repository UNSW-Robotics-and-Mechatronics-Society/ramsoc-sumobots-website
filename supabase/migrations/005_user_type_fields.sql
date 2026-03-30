-- Add user_type column to distinguish UNSW, other university, and high school students
ALTER TABLE profiles ADD COLUMN user_type TEXT DEFAULT 'unsw' CHECK (user_type IN ('unsw', 'other_uni', 'high_school'));

-- Add uni_id for other university students
ALTER TABLE profiles ADD COLUMN uni_id TEXT DEFAULT '';

-- Add high_school for high school students
ALTER TABLE profiles ADD COLUMN high_school TEXT DEFAULT '';

-- Add heard_from for tracking how users found the competition
ALTER TABLE profiles ADD COLUMN heard_from TEXT DEFAULT '';
ALTER TABLE profiles ADD COLUMN heard_from_other TEXT DEFAULT '';
