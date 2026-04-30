"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Minus, Plus, ShoppingBag, MapPin, Clock, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import { convertImgbbUrl, formatPrice } from "@/lib/utils";

interface CartSidebarProps {
  deliveryAddress: string;
  onDeliveryAddressChange: (address: string) => void;
  onCheckoutSuccess: () => void;
  onNeedLogin: () => void;
}

export default function CartSidebar({
  deliveryAddress,
  onDeliveryAddressChange,
  onCheckoutSuccess,
  onNeedLogin,
}: CartSidebarProps) {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, isCartOpen, closeCart } = useCart();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const SHIPPING = 0.99;

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setOrdersLoading(true);
    try {
      const res = await fetch(`/api/orders/${user.id}`);
      const data = await res.json();
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch {
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === "order" && isCartOpen) {
      fetchOrders();
    }
  }, [activeTab, isCartOpen, fetchOrders]);

  const handleCheckout = async () => {
    if (!user) {
      onNeedLogin();
      return;
    }
    if (items.length === 0) return;
    if (!deliveryAddress.trim()) {
      alert("Хүргэлтийн хаягаа оруулна уу.");
      return;
    }

    setCheckoutLoading(true);
    try {
      const orderItems = items.map((item, index) => ({
        foodId: item.food.id,
        quantity: item.quantity,
        ...(index === 0 ? { deliveryAddress } : {}),
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId: user.id, items: orderItems }),
      });

      if (res.ok) {
        clearCart();
        closeCart();
        onCheckoutSuccess();
      } else {
        const data = await res.json();
        alert(data.error || "Захиалга үүсгэхэд алдаа гарлаа");
      }
    } catch {
      alert("Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "text-[#E63946] border-[#E63946]";
      case "Delivered": return "text-green-600 border-green-600";
      case "Cancelled": return "text-gray-400 border-gray-400";
      default: return "text-gray-400 border-gray-400";
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#f5f5f5] z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-gray-800" />
            <span className="font-bold text-gray-800 text-base">Order detail</span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mx-4 mt-3 bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setActiveTab("cart")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === "cart" ? "bg-[#E63946] text-white shadow" : "text-gray-500"
            }`}
          >
            Cart
          </button>
          <button
            onClick={() => setActiveTab("order")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === "order" ? "bg-[#E63946] text-white shadow" : "text-gray-500"
            }`}
          >
            Order
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {activeTab === "cart" ? (
            <>
              {/* Cart Items */}
              <div className="bg-white rounded-2xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">My cart</h3>
                {items.length === 0 ? (
                  <div className="flex flex-col items-center py-8 gap-3">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🍽️</span>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-700 text-sm">Your cart is empty</p>
                      <p className="text-xs text-gray-400 mt-1">Add some delicious dishes to satisfy your cravings!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {items.map((item, idx) => (
                      <div key={item.food.id}>
                        <div className="flex items-center gap-3 py-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={convertImgbbUrl(item.food.image)}
                              alt={item.food.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#E63946] text-xs truncate">{item.food.name}</p>
                            <p className="text-gray-400 text-xs line-clamp-2 mt-0.5">{item.food.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.food.id, item.quantity - 1)}
                                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="text-sm font-medium text-gray-700 w-4 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.food.id, item.quantity + 1)}
                                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <span className="text-sm font-bold text-gray-800">
                                {formatPrice(Number(item.food.price) * item.quantity)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.food.id)}
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition shrink-0"
                          >
                            <X size={12} className="text-gray-400" />
                          </button>
                        </div>
                        {idx < items.length - 1 && (
                          <div className="border-b border-dashed border-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Delivery Location */}
              <div className="bg-white rounded-2xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#E63946]" />
                  Delivery location
                </h3>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => onDeliveryAddressChange(e.target.value)}
                  placeholder="Please share your complete address"
                  rows={3}
                  className="w-full text-sm text-gray-600 placeholder:text-gray-300 resize-none outline-none border border-gray-200 rounded-xl p-3 focus:border-[#E63946] transition"
                />
              </div>
            </>
          ) : (
            /* Order History */
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Order history</h3>
              {!user ? (
                <div className="flex flex-col items-center py-8 gap-3">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🔐</span>
                  </div>
                  <p className="text-sm text-gray-500 text-center">Sign in to see your order history</p>
                </div>
              ) : ordersLoading ? (
                <div className="text-center py-8 text-gray-400 text-sm">Loading...</div>
              ) : orders.length === 0 ? (
                <div className="flex flex-col items-center py-8 gap-3">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🍽️</span>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-700 text-sm">No Orders Yet?</p>
                    <p className="text-xs text-gray-400 mt-1">&quot;You haven&apos;t placed any orders yet. Start exploring our menu and satisfy your cravings!&quot;</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-0">
                  {orders.map((order, idx) => (
                    <div key={order.id}>
                      <div className="py-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-sm text-gray-800">
                            {formatPrice(order.totalPrice)}{" "}
                            <span className="text-gray-400 font-normal">(#{order.id})</span>
                          </span>
                          <span
                            className={`text-xs border rounded-full px-2.5 py-0.5 font-medium ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        {order.foodOrderItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                            <span>🍴</span>
                            <span>{item.food.name}</span>
                            <span className="text-gray-300">x {item.quantity}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock size={10} />
                            {new Date(order.createdAt).toLocaleDateString("mn-MN")}
                          </span>
                          {order.deliveryAddress && (
                            <span className="flex items-center gap-1 truncate">
                              <Truck size={10} />
                              <span className="truncate max-w-36">{order.deliveryAddress}</span>
                            </span>
                          )}
                        </div>
                      </div>
                      {idx < orders.length - 1 && (
                        <div className="border-b border-dashed border-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Payment Info + Checkout */}
        <div className="bg-white border-t border-gray-100 px-5 py-4">
          <h3 className="font-semibold text-gray-700 text-sm mb-3">Payment info</h3>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Items</span>
              <span>{items.length > 0 ? formatPrice(totalPrice) : "-"}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>{items.length > 0 ? `${SHIPPING}$` : "-"}</span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>{items.length > 0 ? formatPrice(totalPrice + SHIPPING) : "-"}</span>
            </div>
          </div>
          <button
            onClick={activeTab === "cart" ? handleCheckout : undefined}
            disabled={activeTab !== "cart" || items.length === 0 || checkoutLoading}
            className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition text-sm ${
              activeTab === "cart" && items.length > 0
                ? "bg-[#E63946] hover:bg-[#c62a35]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {checkoutLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </>
  );
}
