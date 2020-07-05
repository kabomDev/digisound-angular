import { Ticket } from '../user/ticket';

export interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  confirmation?: string;
  tickets?: Ticket | string;
}
