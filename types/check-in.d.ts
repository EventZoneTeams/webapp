interface Ticket {
  id: string;
  paidPrice: number;
  isCheckedIn: boolean;
  attendeeNote: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
}

interface UserOrder {
  user: User;
  bookedTickets: Ticket[];
  products: any[]; // Adjust the type based on the structure of products
}