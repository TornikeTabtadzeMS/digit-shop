export interface TimeStamps {
  created_at: string;
  updated_at: string;
}

export interface IItem extends TimeStamps {
  id: string;
}