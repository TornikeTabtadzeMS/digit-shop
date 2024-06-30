import IOrder from "../../interfaces/orderInterface";

interface Prop {
  orders: IOrder[];
}

export default function OrderTable({ orders }: Prop) {
  return (
    <div className="overflow-x-auto bg-success m-1">
      <table className="min-w-full bg-success">
        <caption className="min-w-full">Order History</caption>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Total Items</th>
            <th className="py-2 px-4 border-b">User ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(order.updated_at).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                ${order.totalPrice.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{order.totalItems}</td>
              <td className="py-2 px-4 border-b">{order.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
