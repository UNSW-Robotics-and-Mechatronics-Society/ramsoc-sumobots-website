-- Alter profiles table: add new fields, change year_of_study type, drop dietary_requirements

-- Change year_of_study from INT to TEXT
ALTER TABLE profiles ALTER COLUMN year_of_study TYPE TEXT USING year_of_study::TEXT;

-- Add new columns
ALTER TABLE profiles ADD COLUMN degree_stage TEXT DEFAULT '';
ALTER TABLE profiles ADD COLUMN undergrad_postgrad TEXT DEFAULT '';
ALTER TABLE profiles ADD COLUMN domestic_international TEXT DEFAULT '';
ALTER TABLE profiles ADD COLUMN majors TEXT DEFAULT '';
ALTER TABLE profiles ADD COLUMN gender_other TEXT DEFAULT '';
ALTER TABLE profiles ADD COLUMN is_ramsoc_member BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN is_arc_member BOOLEAN DEFAULT FALSE;

-- Drop dietary_requirements
ALTER TABLE profiles DROP COLUMN IF EXISTS dietary_requirements;
