import { Movie } from './services/types';

export const COLORS = {
  primary: '#00D1FF',
  background: '#0a0a0b',
  card: '#1c1c1e',
  text: '#FFFFFF'
};

const DEMO_SUBTITLES = [
  { label: 'Português (Manual)', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/subtitles/tears_of_steel_pt.vtt', srclang: 'pt', default: true },
  { label: 'English (Original)', src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/subtitles/tears_of_steel_en.vtt', srclang: 'en' }
];

export const MOCK_MOVIES: Movie[] = [
  { 
    id: 'montflix-epic-01', 
    title: 'Sinfonia do Espaço', 
    posterUrl: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop', 
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1472&auto=format&fit=crop',
    rating: 10, 
    year: 2026, 
    description: 'PRODUÇÃO ÉPICA. Uma exploração definitiva sobre a origem das galáxias e o destino do tempo. Exclusivo MONTFLIX.', 
    category: 'Documentário',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    subtitles: DEMO_SUBTITLES,
    originalLanguage: 'pt'
  },
  { 
    id: 'montflix-long-01', 
    title: 'A Travessia do Infinito', 
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop', 
    backdropUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=1470&auto=format&fit=crop',
    rating: 9.9, 
    year: 2026, 
    description: 'Uma jornada sem precedentes através das estrelas. Este longa-metragem épico explora os limites da consciência humana.', 
    category: 'Sci-Fi',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    subtitles: DEMO_SUBTITLES,
    originalLanguage: 'pt'
  },
  { 
    id: 'montflix-01', 
    title: 'Tears of Steel', 
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop', 
    backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1280&auto=format&fit=crop',
    rating: 9.8, 
    year: 2025, 
    description: 'Um clássico da ficção científica moderna agora em versão estendida nativa na MONTFLIX.', 
    category: 'Sci-Fi',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    subtitles: DEMO_SUBTITLES,
    originalLanguage: 'en'
  },
  { 
    id: 'montflix-02', 
    title: 'Big Buck Bunny', 
    posterUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop', 
    backdropUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1280&auto=format&fit=crop',
    rating: 8.5, 
    year: 2024, 
    description: 'A animação que conquistou gerações agora em altíssima definição e totalmente gratuita.', 
    category: 'Ação',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    subtitles: DEMO_SUBTITLES,
    originalLanguage: 'en'
  },
  { 
    id: 'montflix-06', 
    title: 'Cosmos: Além do Horizonte', 
    posterUrl: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1000&auto=format&fit=crop', 
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop',
    rating: 9.9, 
    year: 2025, 
    description: 'A maior exploração espacial já documentada. Imagens reais de nebulosas e galáxias distantes.', 
    category: 'Documentário',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    originalLanguage: 'en'
  }
];