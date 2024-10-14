interface Ticket {
  id: string;
  paidPrice: number;
  isCheckedIn: boolean;
  attendeeNote: string;
}

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  isReceived: boolean;
}

interface User {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

export interface UserOrder {
  user: User;
  bookedTickets: Ticket[];
  products: Product[];
}
