export interface CreateEventOrderRequest {
  eventId: string;
  eventOrderDetails: {
    eventProductId: string;
    quantity: number;
  }[];
}

export interface EventOrder {
  id: string;
  userId: string;
  eventId: string;
  totalAmount: number;
  status: string;
  orderType: string;
  eventDetails: {
    id: string;
    eventProductId: string;
    eventOrderId: string;
    quantity: number;
    price: number;
  }[];
}
