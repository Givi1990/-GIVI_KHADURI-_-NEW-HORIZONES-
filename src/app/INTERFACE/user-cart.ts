export interface CartItem {
  id: string;  // Firebase key as string
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  userId: number;
}

  
  export interface UserCart {
    userId: number;       // User ID
    items: CartItem[];    // List of items in the cart
    totalPrice: number;   // Total price of all items in the cart
  }
  