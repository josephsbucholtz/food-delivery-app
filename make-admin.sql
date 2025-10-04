-- After you sign in with Google once, run this to make yourself admin:
-- Replace 'your-google-email@gmail.com' with your actual Google email

UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'sviha195@gmail.com';

-- Check if it worked:
SELECT id, email, name, role FROM "User";