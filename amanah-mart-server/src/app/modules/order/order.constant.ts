import { OrderStatus } from "@prisma/client";

export interface IOrderItem {
    productId: string;  
    quantity: number;   
    price: number;     
    totalPrice: number;  
  }
  
  export interface IOrder {
    customerId: string; 
    shopId: string;    
    totalAmount: number;  
    couponId?: string | null;  
    status: OrderStatus;
    items: IOrderItem[]; 
  }
  