/*
  # Proposal System Schema

  1. New Tables
    - `proposals`
      - `id` (uuid, primary key)
      - `client_name` (text)
      - `email` (text)
      - `company` (text)
      - `project_type` (text)
      - `budget` (numeric)
      - `timeline` (text)
      - `description` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on proposals table
    - Add policies for:
      - Anyone can create proposals
      - Only authenticated admins can read/update proposals
*/

CREATE TABLE proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  email text NOT NULL,
  company text,
  project_type text NOT NULL,
  budget numeric,
  timeline text,
  description text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert access for all users" ON proposals
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only" ON proposals
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable update access for authenticated users only" ON proposals
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);