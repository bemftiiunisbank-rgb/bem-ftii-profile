-- ==============================================================================
-- BEM FTII (Fakultas Teknologi Informasi dan Industri) Database Schema
-- Supabase PostgreSQL Schema
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE divisi_enum AS ENUM (
  'Gubernur',
  'Wakil Gubernur',
  'Bendahara',
  'Sekretaris',
  'Kominfo',
  'Inteks',
  'Advokasi'
);

CREATE TYPE status_proker_enum AS ENUM (
  'akan_datang',
  'sedang_berjalan',
  'selesai'
);

CREATE TYPE kategori_aspirasi_enum AS ENUM (
  'Akademik',
  'Fasilitas & Lab',
  'UKT & Finansial',
  'Kebijakan Kampus',
  'Kegiatan Mahasiswa',
  'Lainnya'
);

CREATE TYPE status_aspirasi_enum AS ENUM (
  'diterima',
  'diproses',
  'disampaikan',
  'selesai'
);

-- 3. TABEL ANGGOTA
CREATE TABLE IF NOT EXISTS public.anggota (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama VARCHAR(150) NOT NULL,
  nim VARCHAR(30),
  divisi divisi_enum NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  prodi VARCHAR(100) NOT NULL,
  angkatan VARCHAR(10) NOT NULL,
  foto_url TEXT,
  bio TEXT,
  instagram VARCHAR(100),
  linkedin VARCHAR(150),
  urutan INT DEFAULT 99,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABEL PROKER (PROGRAM KERJA)
CREATE TABLE IF NOT EXISTS public.proker (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE,
  divisi divisi_enum NOT NULL,
  deskripsi TEXT NOT NULL,
  tujuan TEXT,
  sasaran VARCHAR(150),
  status status_proker_enum DEFAULT 'akan_datang' NOT NULL,
  tanggal_mulai DATE,
  tanggal_selesai DATE,
  lokasi VARCHAR(150),
  poster_url TEXT,
  lpj_url TEXT,
  link_pendaftaran TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. TABEL ASPIRASI MAHASISWA
CREATE TABLE IF NOT EXISTS public.aspirasi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_code VARCHAR(20) UNIQUE NOT NULL,
  is_anonim BOOLEAN DEFAULT false NOT NULL,
  nama VARCHAR(150),
  nim VARCHAR(30),
  email VARCHAR(150),
  prodi VARCHAR(100),
  kategori kategori_aspirasi_enum NOT NULL,
  judul_aspirasi VARCHAR(200) NOT NULL,
  isi_aspirasi TEXT NOT NULL,
  status status_aspirasi_enum DEFAULT 'diterima' NOT NULL,
  catatan_advokasi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. TABEL BERITA & ARTIKEL
CREATE TABLE IF NOT EXISTS public.berita (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  judul VARCHAR(250) NOT NULL,
  slug VARCHAR(250) UNIQUE NOT NULL,
  kategori VARCHAR(100) DEFAULT 'Kilas Kabinet',
  ringkasan TEXT NOT NULL,
  konten TEXT NOT NULL,
  penulis VARCHAR(100) DEFAULT 'Biro Kominfo BEM FTII',
  gambar_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.anggota ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proker ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aspirasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;

-- 8. POLICIES (Publik dapat membaca Anggota, Proker, Berita)
CREATE POLICY "Publik dapat melihat anggota" ON public.anggota FOR SELECT USING (true);
CREATE POLICY "Publik dapat melihat proker" ON public.proker FOR SELECT USING (true);
CREATE POLICY "Publik dapat melihat berita" ON public.berita FOR SELECT USING (true);

-- Publik dapat membuat aspirasi baru
CREATE POLICY "Publik dapat mengirim aspirasi" ON public.aspirasi FOR INSERT WITH CHECK (true);
-- Publik dapat melihat status aspirasi berdasarkan ticket code
CREATE POLICY "Publik dapat melihat tracking aspirasi" ON public.aspirasi FOR SELECT USING (true);
