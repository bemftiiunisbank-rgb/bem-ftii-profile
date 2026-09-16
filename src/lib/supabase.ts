import { createClient } from '@supabase/supabase-js';
import type { Anggota, Proker, Aspirasi, Berita, DivisiType, StatusAspirasi } from '../types/database';
import { initialAnggota, initialProker, initialBerita, initialAspirasi } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==============================================================================
// LOCAL STORAGE HYBRID CACHE (Agar perubahan CRUD langsung tersimpan & tampil)
// ==============================================================================
function getStorage<T>(key: string, defaultData: T[]): T[] {
  try {
    const saved = localStorage.getItem(`bem_ftii_v4_${key}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(`Failed reading ${key} from storage:`, e);
  }
  return defaultData;
}

function setStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(`bem_ftii_v4_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed saving ${key} to storage:`, e);
  }
}

// In-memory data initialized from storage or defaults
let localAnggota: Anggota[] = getStorage('anggota', initialAnggota).map(m => {
  if (m.id === 'ang-1' || m.divisi === 'Gubernur') {
    return {
      ...m,
      nama: 'Tatryan Kautsar Al-Firdaus',
      angkatan: '2026',
      foto_url: '/img/anggota/gubernur-tatryan.png',
      jabatan: 'Gubernur Mahasiswa FTII'
    };
  }
  if (m.id === 'ang-2' || m.divisi === 'Wakil Gubernur') {
    return {
      ...m,
      nama: 'Raflian Taofiq Z.M',
      angkatan: '2026',
      foto_url: '/img/anggota/wagub-raflian.png',
      jabatan: 'Wakil Gubernur Mahasiswa FTII'
    };
  }
  return m;
});
let localProker: Proker[] = getStorage('proker', initialProker);
let localAspirasi: Aspirasi[] = getStorage('aspirasi', initialAspirasi);
let localBerita: Berita[] = getStorage('berita', initialBerita);

// ==============================================================================
// 1. ANGGOTA CRUD SERVICES
// ==============================================================================
export async function fetchAnggotaList(divisi?: DivisiType | 'Semua'): Promise<Anggota[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('anggota').select('*').order('urutan', { ascending: true });
      if (divisi && divisi !== 'Semua') {
        query = query.eq('divisi', divisi);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Anggota[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, fallback to local:', err);
    }
  }

  let list = [...localAnggota].sort((a, b) => a.urutan - b.urutan);
  if (divisi && divisi !== 'Semua') {
    list = list.filter((item) => item.divisi === divisi);
  }
  return list;
}

export async function createAnggota(payload: Omit<Anggota, 'id'>): Promise<Anggota> {
  const newMember: Anggota = {
    ...payload,
    id: `ang-${Date.now()}`
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('anggota').insert([payload]).select().single();
      if (!error && data) {
        newMember.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase create anggota failed:', err);
    }
  }

  localAnggota.push(newMember);
  setStorage('anggota', localAnggota);
  return newMember;
}

export async function updateAnggota(id: string, updates: Partial<Anggota>): Promise<Anggota | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('anggota').update(updates).eq('id', id);
    } catch (err) {
      console.warn('Supabase update anggota failed:', err);
    }
  }

  const idx = localAnggota.findIndex((a) => a.id === id);
  if (idx !== -1) {
    localAnggota[idx] = { ...localAnggota[idx], ...updates };
    setStorage('anggota', localAnggota);
    return localAnggota[idx];
  }
  return null;
}

export async function deleteAnggota(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('anggota').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete anggota failed:', err);
    }
  }

  localAnggota = localAnggota.filter((a) => a.id !== id);
  setStorage('anggota', localAnggota);
  return true;
}

// ==============================================================================
// 2. PROKER CRUD SERVICES
// ==============================================================================
export async function fetchProkerList(divisi?: DivisiType | 'Semua', status?: string): Promise<Proker[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from('proker').select('*').order('tanggal_mulai', { ascending: true });
      if (divisi && divisi !== 'Semua') {
        query = query.eq('divisi', divisi);
      }
      if (status && status !== 'Semua') {
        query = query.eq('status', status);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Proker[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, fallback to local:', err);
    }
  }

  let result = [...localProker];
  if (divisi && divisi !== 'Semua') {
    result = result.filter((p) => p.divisi === divisi);
  }
  if (status && status !== 'Semua') {
    result = result.filter((p) => p.status === status);
  }
  return result;
}

export async function createProker(payload: Omit<Proker, 'id'>): Promise<Proker> {
  const newProker: Proker = {
    ...payload,
    id: `pro-${Date.now()}`
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('proker').insert([payload]).select().single();
      if (!error && data) {
        newProker.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase create proker failed:', err);
    }
  }

  localProker.unshift(newProker);
  setStorage('proker', localProker);
  return newProker;
}

export async function updateProker(id: string, updates: Partial<Proker>): Promise<Proker | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('proker').update(updates).eq('id', id);
    } catch (err) {
      console.warn('Supabase update proker failed:', err);
    }
  }

  const idx = localProker.findIndex((p) => p.id === id);
  if (idx !== -1) {
    localProker[idx] = { ...localProker[idx], ...updates };
    setStorage('proker', localProker);
    return localProker[idx];
  }
  return null;
}

export async function deleteProker(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('proker').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete proker failed:', err);
    }
  }

  localProker = localProker.filter((p) => p.id !== id);
  setStorage('proker', localProker);
  return true;
}

// ==============================================================================
// 3. ASPIRASI CRUD SERVICES
// ==============================================================================
export async function fetchAllAspirasi(): Promise<Aspirasi[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('aspirasi')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data as Aspirasi[];
      }
    } catch (err) {
      console.warn('Supabase fetch aspirasi failed:', err);
    }
  }
  return [...localAspirasi].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function createAspirasi(payload: Omit<Aspirasi, 'id' | 'created_at' | 'status' | 'ticket_code'>): Promise<{ success: boolean; ticket_code: string; message: string }> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticket_code = `FTII-${randomSuffix}`;

  const newAspirasi: Aspirasi = {
    ...payload,
    id: `asp-${Date.now()}`,
    ticket_code,
    status: 'diterima',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('aspirasi').insert([
        {
          ...payload,
          ticket_code,
          status: 'diterima'
        }
      ]);
      if (error) throw error;
      localAspirasi.unshift(newAspirasi);
      setStorage('aspirasi', localAspirasi);
      return { success: true, ticket_code, message: 'Aspirasi Anda berhasil tersimpan ke database Supabase!' };
    } catch (err: any) {
      console.warn('Supabase insert failed, saving to local state:', err);
    }
  }

  localAspirasi.unshift(newAspirasi);
  setStorage('aspirasi', localAspirasi);
  return { success: true, ticket_code, message: 'Aspirasi berhasil diterima dan dicatat dalam sistem advokasi FTII.' };
}

export async function trackAspirasiStatus(ticketCode: string): Promise<Aspirasi | null> {
  const cleanCode = ticketCode.trim().toUpperCase();
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('aspirasi')
        .select('*')
        .ilike('ticket_code', cleanCode)
        .single();
      if (!error && data) {
        return data as Aspirasi;
      }
    } catch (err) {
      console.warn('Supabase track failed:', err);
    }
  }

  const found = localAspirasi.find(
    (a) => a.ticket_code.toUpperCase() === cleanCode
  );
  return found || null;
}

export async function updateAspirasiStatus(id: string, status: StatusAspirasi, catatan_advokasi?: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('aspirasi').update({
        status,
        catatan_advokasi,
        updated_at: new Date().toISOString()
      }).eq('id', id);
    } catch (err) {
      console.warn('Supabase update aspirasi failed:', err);
    }
  }

  const idx = localAspirasi.findIndex((a) => a.id === id);
  if (idx !== -1) {
    localAspirasi[idx] = {
      ...localAspirasi[idx],
      status,
      catatan_advokasi: catatan_advokasi !== undefined ? catatan_advokasi : localAspirasi[idx].catatan_advokasi
    };
    setStorage('aspirasi', localAspirasi);
    return true;
  }
  return false;
}

export async function deleteAspirasi(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('aspirasi').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete aspirasi failed:', err);
    }
  }

  localAspirasi = localAspirasi.filter((a) => a.id !== id);
  setStorage('aspirasi', localAspirasi);
  return true;
}

// ==============================================================================
// 4. BERITA CRUD SERVICES
// ==============================================================================
export async function fetchBeritaList(): Promise<Berita[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .order('published_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Berita[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, fallback to local:', err);
    }
  }
  return [...localBerita].sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
}

export async function fetchBeritaDetail(slug: string): Promise<Berita | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('berita')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) {
        return data as Berita;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, fallback to local:', err);
    }
  }
  return localBerita.find((b) => b.slug === slug) || null;
}

export async function createBerita(payload: Omit<Berita, 'id'>): Promise<Berita> {
  const newBerita: Berita = {
    ...payload,
    id: `berita-${Date.now()}`
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('berita').insert([payload]).select().single();
      if (!error && data) {
        newBerita.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase create berita failed:', err);
    }
  }

  localBerita.unshift(newBerita);
  setStorage('berita', localBerita);
  return newBerita;
}

export async function updateBerita(id: string, updates: Partial<Berita>): Promise<Berita | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('berita').update(updates).eq('id', id);
    } catch (err) {
      console.warn('Supabase update berita failed:', err);
    }
  }

  const idx = localBerita.findIndex((b) => b.id === id);
  if (idx !== -1) {
    localBerita[idx] = { ...localBerita[idx], ...updates };
    setStorage('berita', localBerita);
    return localBerita[idx];
  }
  return null;
}

export async function deleteBerita(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('berita').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete berita failed:', err);
    }
  }

  localBerita = localBerita.filter((b) => b.id !== id);
  setStorage('berita', localBerita);
  return true;
}
