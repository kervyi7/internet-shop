export interface InfoPage {
  id: number;
  key: string;
  header: string;
  htmlContent: string;
}

export interface ShopContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  instagram?: string;
  github?: string;
  facebook?: string;
  discord?: string;
  linkedin?: string;
  reddit?: string;
  telegram?: string;
  youtube?: string;
  twitch?: string;
  twitter?: string;

  [key: string]: string | undefined;
}
