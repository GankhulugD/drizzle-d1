export type Category = {
  id: number;
  name: string;
};

export type Food = {
  id: number;
  name: string;
  price: string;
  description: string | null;
  image: string | null;
  foodCategoryId: number;
};

export type FoodWithCategory = Food & {
  foodCategory?: Category;
};

export type CartItem = {
  food: Food;
  quantity: number;
};

export type OrderItem = {
  id: number;
  quantity: number;
  food: Food;
};

export type Order = {
  id: number;
  totalPrice: string;
  status: "Pending" | "Delivered" | "Cancelled";
  deliveryAddress: string | null;
  createdAt: string;
  foodOrderItems: OrderItem[];
  user?: {
    id: number;
    email: string;
    phoneNumber: string;
  };
};

export type AuthUser = {
  id: number;
  email: string;
};
