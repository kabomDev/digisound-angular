import { User } from '../auth/user';

export interface Ticket {
  id?: number;
  eventName?: Event | string;
  price: number;
  quantity: number;
  amount: string;
  user?: any[];
}
