import {
  BackEndEventOrder,
  BackEndEventOrderDetails,
  EventOrder,
  EventOrderDetails,
} from "@/types/event-order";

export const mapBackEndEventOrderDetailToEventOrderDetail = (
  eventOrderDetail: BackEndEventOrderDetails
): EventOrderDetails => {
  return {
    id: eventOrderDetail.id,
    packageId: eventOrderDetail["package-id"],
    eventOrderId: eventOrderDetail["event-order-id"],
    quantity: eventOrderDetail.quantity,
    price: eventOrderDetail.price,
  };
};

export const mapBackEndEventOrderDetailsToEventOrderDetails = (
  eventOrderDetails: BackEndEventOrderDetails[]
): EventOrderDetails[] => {
  return eventOrderDetails.map(mapBackEndEventOrderDetailToEventOrderDetail);
};

export const mapBackEndEventOrderToEventOrder = (
  eventOrder: BackEndEventOrder
): EventOrder => {
  return {
    id: eventOrder.id,
    eventId: eventOrder["event-id"],
    userId: eventOrder["user-id"],
    totalAmount: eventOrder["total-amount"],
    status: eventOrder.status,
    eventOrderDetails: mapBackEndEventOrderDetailsToEventOrderDetails(
      eventOrder["event-order-details"]
    ),
  };
};

export const mapBackEndEventOrdersToEventOrders = (
  eventOrders: BackEndEventOrder[]
): EventOrder[] => {
  return eventOrders.map(mapBackEndEventOrderToEventOrder);
};
