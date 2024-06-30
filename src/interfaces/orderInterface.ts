export default interface IOrder {
  id: string;
  created_at: string;
  updated_at: string;
  totalPrice: number;
  totalItems: number;
  user_id: string;
}