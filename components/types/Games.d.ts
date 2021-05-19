export type Game = {
  name: string;
  slug: string;
  url: string;
  price: number;
  [key: string]: any;
};

export type Platform = {
  name: string;
  slug: string;
  [key: string]: any;
};
