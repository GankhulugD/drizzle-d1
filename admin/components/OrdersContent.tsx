"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  food: FoodItem;
}

interface User {
  id: number;
  email: string;
  phoneNumber: string;
  address?: string;
}

interface Order {
  id: number;
  totalPrice: string;
  status: "Pending" | "Delivered" | "Cancelled";
  deliveryAddress: string;
  createdAt: string;
  user: User;
  foodOrderItems: OrderItem[];
}

export const OrdersContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", { credentials: "include" });
      const data = await res.json();
      setOrders(Array.isArray(data.orders) ? data.orders : []);
      setError(null);
    } catch (e) {
      console.error("Orders fetch error:", e);
      setError("Захиалга татахад алдаа гарлаа");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "border-red-500 text-red-500";
      case "Delivered":
        return "border-green-500 text-green-500";
      case "Cancelled":
        return "border-gray-300 text-gray-500";
      default:
        return "border-gray-300 text-gray-500";
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchOrders();
      }
    } catch (e) {
      console.error("Status update error:", e);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("mn-MN");
  };

  const formatPrice = (price: string) => {
    return `${Number(price).toLocaleString("mn-MN")}₮`;
  };

  const convertImgbbUrl = (url: string | null | undefined): string => {
    if (!url) return "/placeholder.jpg";

    if (url.includes("ibb.co")) {
      if (url.includes("/image/") || url.includes("/th/")) {
        return url;
      }

      if (url.match(/ibb\.co\/\w+$/)) {
        return url.replace("ibb.co/", "ibb.co/image/");
      }
    }

    return url;
  };

  const calculateItemPrice = (price: string, quantity: number) => {
    return formatPrice(String(Number(price) * quantity));
  };

  return (
    <div className="p-8 bg-[#F8F9FA] min-h-screen">
      {/* Header хэсэг */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-sm text-gray-500 mt-1">{orders.length} захиалга</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50">
            <Calendar size={16} />
            13 June 2023 - 14 July 2023
          </button>
          <button className="bg-gray-200 text-gray-500 font-medium rounded-full px-6 py-2 text-sm cursor-not-allowed">
            Change delivery state
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-10 text-gray-400">
          Захиалгууд ачаалж байна...
        </div>
      )}

      {/* Хүснэгт */}
      {!loading && orders.length > 0 && (
        <div
          className="bg-white rounded-2xl shadow-sm border border-gray-100"
          style={{ overflow: "visible" }}
        >
          <div style={{ overflow: "auto" }}>
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-gray-400 bg-white border-b">
                <tr>
                  <th className="py-4 px-6 font-medium w-12">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="py-4 px-2 font-medium w-12">№</th>
                  <th className="py-4 px-4 font-medium">Хэрэглэгч</th>
                  <th className="py-4 px-4 font-medium">Хоол</th>
                  <th className="py-4 px-4 font-medium">
                    Огноо <ChevronDown size={14} className="inline ml-1" />
                  </th>
                  <th className="py-4 px-4 font-medium">Үнэ</th>
                  <th className="py-4 px-4 font-medium">Хүргэлтийн хаяг</th>
                  <th className="py-4 px-6 font-medium text-center">
                    Статус <ChevronDown size={14} className="inline ml-1" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition relative"
                  >
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-4 px-2">{index + 1}</td>
                    <td className="py-4 px-4 text-gray-900">
                      <div className="font-medium">{order.user?.email}</div>
                      {order.user?.phoneNumber && (
                        <div className="text-xs text-gray-500">
                          {order.user.phoneNumber}
                        </div>
                      )}
                    </td>

                    {/* Хоолны жагсаалт - Dropdown */}
                    <td className="py-4 px-4 relative">
                      <button
                        onClick={() => toggleRow(order.id)}
                        className="flex items-center gap-2 text-gray-900 font-medium hover:text-gray-600"
                      >
                        {order.foodOrderItems.length} бүтээл
                        {expandedRow === order.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {/* Dropdown дээрх хоолны жагсаалт */}
                      {expandedRow === order.id && (
                        <div className="absolute top-14 left-4 w-80 bg-white border-2 border-blue-400 rounded-lg p-3 shadow-lg z-10">
                          {order.foodOrderItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between items-center py-3 border-b border-dashed last:border-0"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <img
                                  src={convertImgbbUrl(item.food.image)}
                                  className="w-10 h-10 rounded object-cover bg-gray-100"
                                  alt={item.food.name}
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder.jpg";
                                  }}
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs text-gray-800 font-medium truncate">
                                    {item.food.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {formatPrice(item.food.price)} ×{" "}
                                    {item.quantity} ={" "}
                                    <strong>
                                      {calculateItemPrice(
                                        item.food.price,
                                        item.quantity,
                                      )}
                                    </strong>
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 ml-2 font-medium">
                                x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-4">{formatDate(order.createdAt)}</td>
                    <td className="py-4 px-4 text-gray-900 font-bold">
                      {formatPrice(order.totalPrice)}
                    </td>
                    <td className="py-4 px-4 text-gray-500 truncate max-w-xs">
                      {order.deliveryAddress || "Заасан хаяг байхгүй"}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className={`appearance-none bg-white border rounded-full px-4 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer text-center w-28 ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && orders.length === 0 && !error && (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
          Захиалга байхгүй байна
        </div>
      )}

      {/* Pagination */}
      {orders.length > 0 && (
        <div className="flex justify-end mt-6 gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900">
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 text-sm">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 text-sm">
            3
          </button>
          <span className="w-8 h-8 flex items-center justify-center text-gray-400">
            ...
          </span>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900">
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};
