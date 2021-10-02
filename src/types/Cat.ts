export interface Cat {
  id: string;
  url: string;
  // Breeds needs to be an array of objects with: id, name, origin, temperament, description
  breeds: any;
  name: string;
  img: string;
  origin: string;
  temperament: string;
  description: string;
}
