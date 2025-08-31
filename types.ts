
export enum ToneOfVoice {
  PROFESSIONAL = 'Professional',
  FRIENDLY = 'Friendly',
  WITTY = 'Witty',
  LUXURY = 'Luxury',
  TECHNICAL = 'Technical',
}

export interface ProductDescription {
  product_name: string;
  tagline: string;
  description: string;
  key_features: string[];
}

export interface ProductDetails {
  name: string;
  category: string;
  features: string;
  audience: string;
  tone: ToneOfVoice;
}
