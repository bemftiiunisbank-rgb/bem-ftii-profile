export type DivisiType = 
  | 'Gubernur'
  | 'Wakil Gubernur'
  | 'Bendahara'
  | 'Sekretaris'
  | 'Kominfo'
  | 'Inteks'
  | 'Advokasi';

export type StatusProker = 'akan_datang' | 'sedang_berjalan' | 'selesai';

export type KategoriAspirasi = 
  | 'Akademik'
  | 'Fasilitas & Lab'
  | 'UKT & Finansial'
  | 'Kebijakan Kampus'
  | 'Kegiatan Mahasiswa'
  | 'Lainnya';

export type StatusAspirasi = 'diterima' | 'diproses' | 'disampaikan' | 'selesai';

export interface Anggota {
  id: string;
  nama: string;
  nim?: string;
  divisi: DivisiType;
  jabatan: string;
  prodi: string;
  angkatan: string;
  foto_url?: string;
  bio?: string;
  instagram?: string;
  linkedin?: string;
  urutan: number;
}

export interface Proker {
  id: string;
  judul: string;
  slug?: string;
  divisi: DivisiType;
  deskripsi: string;
  tujuan?: string;
  sasaran?: string;
  status: StatusProker;
  tanggal_mulai?: string;
  tanggal_selesai?: string;
  lokasi?: string;
  poster_url?: string;
  lpj_url?: string;
  link_pendaftaran?: string;
}

export interface Aspirasi {
  id: string;
  ticket_code: string;
  is_anonim: boolean;
  nama?: string;
  nim?: string;
  email?: string;
  prodi?: string;
  kategori: KategoriAspirasi;
  judul_aspirasi: string;
  isi_aspirasi: string;
  status: StatusAspirasi;
  catatan_advokasi?: string;
  created_at: string;
}

export interface Berita {
  id: string;
  judul: string;
  slug: string;
  kategori: string;
  ringkasan: string;
  konten: string;
  penulis: string;
  gambar_url?: string;
  published_at: string;
}
