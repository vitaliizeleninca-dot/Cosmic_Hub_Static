// Типы для данных из links.json
export interface Link {
  id: string;
  title: string;
  url: string;
  icon?: string;
  active: boolean;
}

export interface VideoItem {
  url: string;
  active: boolean;
}

export interface SongItem {
  title: string;
  url: string;
  active: boolean;
}

export interface NftCollection {
  url: string;
  name: string;
  customImage: string;
  active: boolean;
}

export interface SiteSettings {
  contactEnabled: boolean;
  heroModalsEnabled: boolean;
  aboutMeText: string;
  learnMoreText: string;
  selectedBackground: string;
  playlistVideosActive: boolean;
  playlistSongsActive: boolean;
  feelCosmosSongsActive: boolean;
}

export interface SiteInfo {
  siteName: string;
  siteDescription: string;
}

export interface SiteData {
  links: Link[];
  cosmicVideos: VideoItem[];
  playlistVideos: VideoItem[];
  feelCosmosVideos: VideoItem[];
  feelCosmosSongs: SongItem[];
  podcastVideos: VideoItem[];
  nftVideos: VideoItem[];
  nftCollections: NftCollection[];
  cosmicAmbientVideos: VideoItem[];
  settings: SiteSettings;
  siteInfo: SiteInfo;
}

// Загрузка данных из статического JSON-файла
export async function loadSiteData(): Promise<SiteData> {
  try {
    // В production загружаем из public/data/links.json
    // В development можем использовать локальный файл
    const response = await fetch('/data/links.json');
    if (!response.ok) {
      throw new Error('Failed to load site data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading site data:', error);
    // Возвращаем дефолтные значения
    return getDefaultSiteData();
  }
}

// Дефолтные значения для всех полей
export function getDefaultSiteData(): SiteData {
  return {
    links: [],
    cosmicVideos: [
      { url: "https://www.youtube.com/embed/jgpJVI3tDT0", active: true },
      { url: "https://www.youtube.com/embed/1La4QzGeaaQ", active: true },
      { url: "https://www.youtube.com/embed/TqOneWeDtFI", active: true },
      { url: "https://www.youtube.com/embed/lFcSrYw-ARY", active: true },
    ],
    playlistVideos: [
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
    ],
    feelCosmosVideos: [
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
    ],
    feelCosmosSongs: [],
    podcastVideos: [
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
    ],
    nftVideos: [
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
      { url: "", active: true },
    ],
    nftCollections: [
      { url: "", name: "", customImage: "", active: true },
      { url: "", name: "", customImage: "", active: true },
      { url: "", name: "", customImage: "", active: true },
      { url: "", name: "", customImage: "", active: true },
      { url: "", name: "", customImage: "", active: true },
      { url: "", name: "", customImage: "", active: true },
    ],
    cosmicAmbientVideos: [
      { url: "", active: false },
      { url: "", active: false },
      { url: "", active: false },
      { url: "", active: false },
    ],
    settings: {
      contactEnabled: true,
      heroModalsEnabled: true,
      aboutMeText: "",
      learnMoreText: "",
      selectedBackground: "",
      playlistVideosActive: true,
      playlistSongsActive: true,
      feelCosmosSongsActive: true,
    },
    siteInfo: {
      siteName: "Cosmic Hub",
      siteDescription: "Explore the cosmos through AI art, music, and NFT collections",
    },
  };
}
