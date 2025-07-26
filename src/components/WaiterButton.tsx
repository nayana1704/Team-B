import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCircle, Clock, User } from 'lucide-react';

const WaiterButton = () => {
  const { state, dispatch } = useApp();

  const handleCallWaiter = () => {
    dispatch({ type: 'CALL_WAITER' });
    
    // Simulate waiter acknowledgment after 2 seconds
    setTimeout(() => {
      dispatch({ type: 'WAITER_ACKNOWLEDGED' });
    }, 2000);
    
    // Simulate waiter coming after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'WAITER_COMING' });
    }, 5000);
    
    // Reset after 10 seconds
    setTimeout(() => {
      dispatch({ type: 'WAITER_RESET' });
    }, 10000);
  };

  const getWaiterStatus = () => {
    switch (state.waiterStatus) {
      case 'called':
        return { icon: Clock, text: 'Calling waiter...', color: 'bg-yellow-500' };
      case 'acknowledged':
        return { icon: CheckCircle, text: 'Waiter acknowledged!', color: 'bg-blue-500' };
      case 'coming':
        return { icon: User, text: 'Waiter is on the way!', color: 'bg-green-500' };
      default:
        return { icon: Bell, text: 'Call Waiter', color: 'bg-primary-dark hover:bg-primary-darker' };
    }
  };

  const status = getWaiterStatus();
  const StatusIcon = status.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleCallWaiter}
        disabled={state.isWaiterCalled}
        className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 text-white ${
          state.isWaiterCalled
            ? `${status.color} animate-pulse`
            : `${status.color} hover:shadow-xl transform hover:scale-110`
        }`}
      >
        <StatusIcon className="w-8 h-8" />
      </button>
      
      {state.isWaiterCalled && (
        <div className={`absolute bottom-20 right-0 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap animate-fade-in shadow-lg ${status.color}`}>
          {status.text}
        </div>
      )}
    </div>
  );
};

export default WaiterButton;