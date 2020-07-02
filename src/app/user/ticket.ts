export interface Ticket {
  id?: number;
  eventName?: Event | string;
  price: number;
  quantity: number;
  amount: string;
}
