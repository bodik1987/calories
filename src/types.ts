export interface Item {
  id: string;
  title: string;
  calories: string;
  isFavorite?: boolean;
  description?: string;
}

type ProductToEat = {
  id: string;
  day: number;
  product: Item;
  weight: string;
};

export interface IDay {
  productsToEat: ProductToEat[];
}

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
