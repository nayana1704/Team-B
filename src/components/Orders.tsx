import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock, CheckCircle, CreditCard, Smartphone, Receipt, FileText, X, Users, Star, MessageCircle } from 'lucide-react';
import WaiterButton from './WaiterButton';

const Orders = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [showBillModal, setShowBillModal] = useState(false);
  const [showSplitModal, setShowSplitModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showMobileAlert, setShowMobileAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [splitCount, setSplitCount] = useState(2);
  const [feedback, setFeedback] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setShowMobileAlert(true);
  };

  const handlePayment = (method: 'upi' | 'card' | 'cash') => {
    if (method === 'upi') {
      showAlert('Redirecting to UPI payment...');
    } else if (method === 'card') {
      showAlert('Card payment not implemented in demo');
    } else {
      showAlert('Please ask the waiter for cash payment');
    }
    setShowBillModal(false);
    setTimeout(() => {
      setShowFeedbackModal(true);
    }, 2000);
  };

  const generateBill = () => {
    showAlert('Bill generated! Please ask the waiter to bring your bill.');
    setShowBillModal(false);
    setTimeout(() => {
      setShowFeedbackModal(true);
    }, 2000);
  };

  const handleSplitBill = () => {
    const totalAmount = Math.round(totalOrderAmount * 1.18);
    const amountPerPerson = Math.round(totalAmount / splitCount);
    
    showAlert(`Bill split among ${splitCount} people: ₹${amountPerPerson} per person`);
    setShowSplitModal(false);
    
    // Navigate to payment options after split
    setTimeout(() => {
      setShowBillModal(true);
    }, 2000);
  };

  const submitFeedback = () => {
    dispatch({ type: 'SET_FEEDBACK', payload: feedback });
    
    // Update user total spent
    if (state.user) {
      dispatch({ 
        type: 'UPDATE_USER_LOYALTY', 
        payload: { 
          spent: totalOrderAmount 
        } 
      });
    }
    
    showAlert('Thank you for your feedback!');
    setShowFeedbackModal(false);
  };

  const latestOrder = state.orders[0];
  const totalOrderAmount = state.orders.reduce((total, order) => {
    const orderTotal = order.totalAmount - (order.discountAmount || 0);
    return total + orderTotal;
  }, 0);

  // Simulate order progress
  useEffect(() => {
    if (latestOrder && latestOrder.status === 'pending') {
      const progressInterval = setInterval(() => {
        const currentProgress = latestOrder.progress || 0;
        if (currentProgress < 100) {
          const newProgress = Math.min(100, currentProgress + Math.random() * 20);
          let newStatus = latestOrder.status;
          
          if (newProgress >= 25 && newProgress < 50) {
            newStatus = 'confirmed';
          } else if (newProgress >= 50 && newProgress < 85) {
            newStatus = 'preparing';
          } else if (newProgress >= 85) {
            newStatus = 'ready';
          }
          
          dispatch({
            type: 'UPDATE_ORDER_STATUS',
            payload: { id: latestOrder.id, status: newStatus, progress: newProgress }
          });
        } else {
          clearInterval(progressInterval);
        }
      }, 2000);
      
      return () => clearInterval(progressInterval);
    }
  }, [latestOrder, dispatch]);

  const getProgressSteps = (status: string, progress: number = 0) => {
    const steps = [
      { key: 'pending', label: 'Order Received', icon: Receipt },
      { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { key: 'preparing', label: 'Preparing', icon: Clock },
      { key: 'ready', label: 'Ready', icon: CheckCircle },
    ];

    return steps.map((step, index) => {
      const isActive = status === step.key || progress >= (index + 1) * 25;
      const StepIcon = step.icon;
      
      return (
        <div key={step.key} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isActive ? 'bg-green-500 text-white' : state.darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
          }`}>
            <StepIcon className="w-5 h-5" />
          </div>
          <span className={`ml-2 text-sm font-medium ${
            isActive ? 'text-green-600' : state.darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-4 ${
              progress >= (index + 1.5) * 25 ? 'bg-green-500' : state.darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
          )}
        </div>
      );
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`shadow-sm sticky top-0 z-10 transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate('/menu')}
            className={`p-2 rounded-full transition-colors ${state.darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className={`font-bold text-lg transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
            Your Orders
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {state.orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Receipt className={`w-24 h-24 mb-4 transition-colors duration-300 ${state.darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h2 className={`text-xl font-bold mb-2 transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No orders yet
          </h2>
          <p className={`mb-6 transition-colors duration-300 ${state.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Place your first order to see it here
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-darker transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="p-4">
          {/* Live Order Progress */}
          {latestOrder && latestOrder.status !== 'completed' && (
            <div className={`rounded-2xl p-6 mb-6 animate-bounce-in transition-colors duration-300 ${
              state.darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-green-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className={`text-xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-green-800'}`}>
                  Live Order Tracking
                </h2>
              </div>
              
              <div className="mb-4">
                <div className={`text-sm mb-2 transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-green-700'}`}>
                  Order #{latestOrder.id} - {latestOrder.progress || 0}% Complete
                </div>
                <div className={`w-full rounded-full h-2 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${latestOrder.progress || 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between overflow-x-auto">
                {getProgressSteps(latestOrder.status, latestOrder.progress)}
              </div>
              
              <div className={`mt-4 text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-green-600'}`}>
                Estimated time: {latestOrder.status === 'ready' ? 'Ready for pickup!' : '15-20 minutes'}
              </div>
            </div>
          )}

          {/* Close Bill Button */}
          {state.orders.length > 0 && (
            <div className="bg-gradient-to-r from-primary-dark to-primary-darker rounded-2xl p-6 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Close Bill?</h3>
                  <p className="text-primary-light">Total Amount: ₹{Math.round(totalOrderAmount * 1.18)}</p>
                  {state.orders.some(order => order.discountAmount) && (
                    <p className="text-green-300 text-sm">
                      Total Savings: ₹{state.orders.reduce((total, order) => total + (order.discountAmount || 0), 0)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSplitModal(true)}
                    className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-xl font-semibold hover:bg-opacity-30 transition-colors flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Split
                  </button>
                  <button
                    onClick={() => setShowBillModal(true)}
                    className="bg-white text-primary-dark px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Close Bill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          {state.orders.map((order) => (
            <div key={order.id} className={`rounded-2xl shadow-sm mb-6 transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`font-bold text-lg transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                      Order #{order.id}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {order.timestamp.toLocaleString()}
                    </p>
                    {order.appliedOffer && (
                      <p className="text-sm text-green-600 font-medium">
                        🎉 {order.appliedOffer.code} applied - Saved ₹{order.discountAmount}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                    order.status === 'ready' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className={`font-medium transition-colors duration-300 ${state.darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {item.foodItem.name}
                        </h4>
                        <p className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-primary-dark">
                        ₹{item.totalPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Subtotal
                      </span>
                      <span className="font-semibold">₹{order.totalAmount}</span>
                    </div>
                    {order.discountAmount && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({order.appliedOffer?.code})</span>
                        <span className="font-semibold">-₹{order.discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Taxes & Fees (18%)
                      </span>
                      <span className="font-semibold">₹{Math.round((order.totalAmount - (order.discountAmount || 0)) * 0.18)}</span>
                    </div>
                    <div className={`flex justify-between text-lg font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                      <span>Total Amount</span>
                      <span>₹{Math.round((order.totalAmount - (order.discountAmount || 0)) * 1.18)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Alert Modal */}
      {showMobileAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-sm w-full mx-4 transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <p className={`text-lg font-medium transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {alertMessage}
                </p>
              </div>
              <button
                onClick={() => setShowMobileAlert(false)}
                className="w-full bg-primary-dark text-white py-3 rounded-xl font-semibold hover:bg-primary-darker transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Split Modal */}
      {showSplitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-md w-full transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                  Split Bill
                </h3>
                <button
                  onClick={() => setShowSplitModal(false)}
                  className={`p-2 rounded-full transition-colors ${state.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Number of people:
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={splitCount}
                  onChange={(e) => setSplitCount(parseInt(e.target.value))}
                  className={`w-full p-3 rounded-xl border-2 focus:outline-none focus:border-primary-dark transition-colors ${
                    state.darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
              </div>

              <div className={`p-4 rounded-xl mb-6 transition-colors duration-300 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex justify-between mb-2">
                  <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Total Amount:
                  </span>
                  <span className="font-semibold">₹{Math.round(totalOrderAmount * 1.18)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Per Person:</span>
                  <span className="text-primary-dark">₹{Math.round((totalOrderAmount * 1.18) / splitCount)}</span>
                </div>
              </div>

              <button
                onClick={handleSplitBill}
                className="w-full bg-primary-dark text-white py-3 rounded-xl font-semibold hover:bg-primary-darker transition-colors"
              >
                Generate Split Bill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                  Final Bill
                </h3>
                <button
                  onClick={() => setShowBillModal(false)}
                  className={`p-2 rounded-full transition-colors ${state.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Bill Summary */}
              <div className={`rounded-xl p-4 mb-6 transition-colors duration-300 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                  Order Summary
                </h4>
                <div className="space-y-2">
                  {state.orders.map((order) => (
                    <div key={order.id} className="text-sm">
                      <div className="flex justify-between font-medium">
                        <span>Order #{order.id}</span>
                        <span>₹{order.totalAmount}</span>
                      </div>
                      {order.discountAmount && (
                        <div className="flex justify-between text-green-600 text-xs">
                          <span>Discount ({order.appliedOffer?.code})</span>
                          <span>-₹{order.discountAmount}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Subtotal
                      </span>
                      <span className="font-semibold">₹{state.orders.reduce((total, order) => total + order.totalAmount, 0)}</span>
                    </div>
                    {state.orders.some(order => order.discountAmount) && (
                      <div className="flex justify-between text-green-600">
                        <span>Total Discounts</span>
                        <span className="font-semibold">-₹{state.orders.reduce((total, order) => total + (order.discountAmount || 0), 0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Taxes & Fees (18%)
                      </span>
                      <span className="font-semibold">₹{Math.round(totalOrderAmount * 0.18)}</span>
                    </div>
                    <div className={`flex justify-between text-lg font-bold mt-2 pt-2 border-t transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                      <span>Grand Total</span>
                      <span>₹{Math.round(totalOrderAmount * 1.18)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                <h4 className={`font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                  Choose Payment Method
                </h4>
                
                <button
                  onClick={() => handlePayment('upi')}
                  className="w-full flex items-center gap-4 p-4 border-2 border-primary-dark rounded-xl hover:bg-primary-light transition-colors"
                >
                  <Smartphone className="w-6 h-6 text-primary-dark" />
                  <div className="text-left">
                    <h5 className={`font-semibold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                      UPI Payment
                    </h5>
                    <p className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Pay via UPI apps
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handlePayment('card')}
                  className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl transition-colors ${
                    state.darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className={`w-6 h-6 transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div className="text-left">
                    <h5 className={`font-semibold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Card Payment
                    </h5>
                    <p className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Credit/Debit card
                    </p>
                  </div>
                </button>

                <button
                  onClick={generateBill}
                  className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                    state.darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  Generate Bill (Cash Payment)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-md w-full transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                  How was your experience?
                </h3>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className={`p-2 rounded-full transition-colors ${state.darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFeedback(star)}
                    className={`text-3xl transition-colors ${
                      star <= feedback ? 'text-yellow-500' : state.darkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  >
                    <Star className={`w-8 h-8 ${star <= feedback ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>

              <button
                onClick={submitFeedback}
                disabled={feedback === 0}
                className="w-full bg-primary-dark text-white py-3 rounded-xl font-semibold hover:bg-primary-darker transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      <WaiterButton />
    </div>
  );
};

export default Orders;