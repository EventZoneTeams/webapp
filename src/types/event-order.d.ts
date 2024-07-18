export type EventOrderStatusEnum = "PAID" | "PENDING" | "CANCELLED";

export type BackEndEventOrderDetails = {
  id: number;
  "package-id": number;
  "event-order-id": number;
  quantity: number;
  price: number;
};

export type BackEndEventOrder = {
  id: number;
  "event-id": number;
  "user-id": number;
  "total-amount": number;
  status: EventOrderStatusEnum;
  "event-order-details": BackEndEventOrderDetails[];
};

export type EventOrderDetails = {
  id: number;
  packageId: number;
  eventOrderId: number;
  quantity: number;
  price: number;
};

export type EventOrder = {
  id: number;
  eventId: number;
  userId: nunber;
  totalAmount: number;
  status: EventOrderStatusEnum;
  eventOrderDetails: EventOrderDetails[];
};
