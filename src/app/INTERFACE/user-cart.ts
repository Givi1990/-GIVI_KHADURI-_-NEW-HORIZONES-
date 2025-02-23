export interface CartItem {
  id: string;  
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  userId: number;
}

  
  export interface UserCart {
    userId: number;     
    items: CartItem[];    
    totalPrice: number;   
  }
  