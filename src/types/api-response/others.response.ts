export type BackgroundImageResponse = {
  backgroundImageUrl: string;
};

export type FindUsOptionsResponse = {
  active: boolean;
  id: number;
  options: string;
}[];

export type CountryListParams = {
  objId: number;
  name: string;
  isoCode: string;
}[];

export type BusinessTypesResponse = {
  objid: number;
  isActive: boolean;
  name: string;
}[];
