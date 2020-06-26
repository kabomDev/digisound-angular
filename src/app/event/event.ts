import { Artist } from '../artist/artist';

export interface Event {
  id?: number;
  title: string;
  description: string;
  city: string;
  image?: string;
  startDate: Date;
  endDate: Date;
  artists?: Artist | string;
}
