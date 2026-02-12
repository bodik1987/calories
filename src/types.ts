export interface Item {
  id: string;
  title: string;
  calories: string;
  isFavorite?: boolean;
  description?: string;
}

export type EtenProducts = {
  id: string;
  product: Item;
  weight: string;
};

export interface IUser {
  name: string;
  password: string;
}

export interface IUserMeasurements {
  weight: string;
  age: string;
}

export interface ISelectedProduct {
  id: string;
  product: Item;
  weight: string;
}
