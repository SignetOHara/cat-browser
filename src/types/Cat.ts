interface BreedInfo {
  id: string;
  name: string;
  origin: string;
  temperament: string;
  description: string;
}

export interface Cat {
  id: string;
  url: string;
  breeds: BreedInfo[];
}
