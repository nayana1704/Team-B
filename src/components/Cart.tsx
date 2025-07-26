import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, Tag, X } from 'lucide-react';
import WaiterButton from './WaiterButton';

const Cart = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const subtotal = state.cart.reduce((total, item) => 
    total + (item.totalPrice * item.quantity), 0
  );

  const discountAmount = state.appliedCoupon?.discountAmount || 0;
  const totalAfterDiscounts = Math.max(0, subtotal - discountAmount);
  const taxes = Math.round(totalAfterDiscounts * 0.18);
  const finalTotal = totalAfterDiscounts + taxes;

  const handlePlaceOrder = () => {
    if (state.cart.length > 0) {
      const order = {
        id: Date.now().toString(),
        items: [...state.cart],
        totalAmount: subtotal,
        status: 'pending' as const,
        timestamp: new Date(),
        tableNumber: state.user?.tableNumber,
        appliedOffer: state.appliedCoupon?.offer,
        discountAmount: discountAmount,
      };
      
      // Update user total spent
      if (state.user) {
        dispatch({ 
          type: 'UPDATE_USER_LOYALTY', 
          payload: { 
            spent: finalTotal 
          } 
        });
      }
      
      dispatch({ type: 'PLACE_ORDER', payload: order });
      navigate('/orders');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 shadow-sm transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
          <button
              onClick={() => navigate(-1)}
              className={`p-2 rounded-full transition-colors ${state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
              <ArrowLeft className={`w-6 h-6 ${state.darkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
            <h1 className={`text-xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Cart
          </h1>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      {state.cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-4">
          <ShoppingBag className={`w-16 h-16 mb-4 ${state.darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your cart is empty
          </h2>
          <p className={`text-center mb-6 transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-darker transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          {/* Applied Coupon Display */}
          {state.appliedCoupon && (
            <div className="mx-4 mt-4 bg-green-100 border border-green-300 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-green-800 font-bold">{state.appliedCoupon.offer.code} Applied!</h3>
                  <p className="text-green-700 text-sm">You saved ₹{state.appliedCoupon.discountAmount}</p>
                </div>
              </div>
              <button
                onClick={removeCoupon}
                className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Cart Items */}
          <div className="p-4 space-y-4">
            {state.cart.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-colors duration-300 ${
                  state.darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <img
                  src={item.foodItem.image}
                  alt={item.foodItem.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                    <div className="flex-1">
                  <h3 className={`font-semibold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.foodItem.name}
                      </h3>
                  <p className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    ₹{item.totalPrice}
                      </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`p-1 rounded-full transition-colors ${
                        state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Minus className={`w-4 h-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                    <span className={`w-8 text-center transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={`p-1 rounded-full transition-colors ${
                        state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                      >
                      <Plus className={`w-4 h-4 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className={`p-2 rounded-full transition-colors ${
                    state.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={`mx-4 rounded-2xl shadow-lg p-6 mb-20 transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
              Order Summary
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Subtotal
                </span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              {state.appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({state.appliedCoupon.offer.code})</span>
                  <span className="font-semibold">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Taxes & Fees (18%)
                </span>
                <span className="font-semibold">₹{taxes}</span>
              </div>
              <div className="border-t pt-2">
                <div className={`flex justify-between text-lg font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-primary-dark to-primary-darker text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Place Order
            </button>
          </div>
        </>
      )}

      <WaiterButton />
    </div>
  );
};

export default Cart;