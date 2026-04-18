-- Create storage bucket for school photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'school-photos',
  'school-photos',
  true,  -- public access
  5242880,  -- 5MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Enable public read access via RLS
CREATE POLICY "Public read school photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'school-photos');

-- Enable authenticated uploads (service role can always write)
CREATE POLICY "Service role upload school photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'school-photos');

CREATE POLICY "Service role update school photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'school-photos');
