export type CatalogImage = {
  img_url?: string;
  img?: string;
  index?: number;
};

export type CatalogueItem = {
  objid: number;
  currency: string;
  currencySymbol: string;
  name: string;
  images?: CatalogImage[];
  description?: string;
  catalogueItems?: any | null;
  locations?: any | null;
  url?: string;
};

export type catalogueListResponse = {
  last: boolean;
  catalogues: CatalogueItem[];
};
