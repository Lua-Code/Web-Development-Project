import OrdersList from "../Components/Orders/OrdersList"; // adjust path

export default function OrdersPage() {
  const sellerId = "693f43b5724dc37867eae4e4"; //statci id until we integrate 

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>Orders</h2>
      <OrdersList sellerId={sellerId} />
    </div>
  );
}
