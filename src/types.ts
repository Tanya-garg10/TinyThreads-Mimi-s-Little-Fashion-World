export type CollectionCategory = 'all' | 'cloud-soft' | 'explorer' | 'bedtime';

export type OutfitBase = 'onesie' | 'romper' | 'pajamas';
export type OutfitColor = 'blush' | 'cream' | 'sage' | 'lavender' | 'butter';
export type OutfitAccessory = 'bunny_hat' | 'tiny_bow' | 'cloud_patch' | 'star_patch';

export interface Product {
  id: string;
  name: string;
  collectionId: 'cloud-soft' | 'explorer' | 'bedtime';
  collectionName: string;
  price: number; // in INR
  tagline: string;
  description: string;
  fabric: string;
  colorTag: string;
  badge?: string;
  sizes: string[];
  illustrationType: 'onesie-cloud' | 'snuggle-set' | 'romper-sun' | 'overalls-explorer' | 'acorn-tee' | 'sunshine-set' | 'moonbeam-pj' | 'sleepy-bunny' | 'starlight-sleep';
  realImageUrl?: string;
}

export interface CollectionInfo {
  id: 'cloud-soft' | 'explorer' | 'bedtime';
  title: string;
  subtitle: string;
  theme: string;
  visualDirection: string;
  paletteColors: string[];
  description: string;
}

export interface CartItem {
  cartId: string;
  productId?: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  collection?: string;
  customDetails?: {
    baseOutfit: OutfitBase;
    color: OutfitColor;
    accessory: OutfitAccessory;
  };
  illustrationType?: Product['illustrationType'] | 'custom';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  babyAge: string;
  favoriteItem: string;
}

export interface StoryScene {
  number: string;
  title: string;
  subtitle: string;
  narrative: string;
  detailQuote: string;
  sceneTheme: string;
  illustrationKey: 'discovery' | 'stitch' | 'studio' | 'world';
}
