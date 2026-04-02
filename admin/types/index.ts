export type Category = {
  id: number;
  name: string;
};

export type Food = {
  id: number;
  name: string;
  price: string;
  foodCategoryId: number;
  description?: string; // Ingredients хэсэг
  image?: string; // Зураг
};
