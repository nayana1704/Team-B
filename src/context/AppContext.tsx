import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, FoodItem, Order, User, FilterCategory, BillSplit, Offer, AppliedCoupon } from '../types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  currentFilter: FilterCategory;
  searchQuery: string;
  isWaiterCalled: boolean;
  waiterStatus: 'idle' | 'called' | 'acknowledged' | 'coming';
  darkMode: boolean;
  billSplit: BillSplit[];
  lastFeedback: number | null;
  voiceSearchActive: boolean;
  appliedCoupon: AppliedCoupon | null;
  suggestedOffers: Offer[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_FILTER'; payload: FilterCategory }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'CALL_WAITER' }
  | { type: 'WAITER_ACKNOWLEDGED' }
  | { type: 'WAITER_COMING' }
  | { type: 'WAITER_RESET' }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status']; progress?: number } }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_BILL_SPLIT'; payload: BillSplit[] }
  | { type: 'SET_FEEDBACK'; payload: number }
  | { type: 'TOGGLE_VOICE_SEARCH' }
  | { type: 'APPLY_COUPON'; payload: AppliedCoupon }
  | { type: 'REMOVE_COUPON' }
  | { type: 'SET_SUGGESTED_OFFERS'; payload: Offer[] }
  | { type: 'UPDATE_USER_LOYALTY'; payload: { spent: number } }
  | { type: 'LOAD_SAVED_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  user: null,
  cart: [],
  orders: [],
  currentFilter: 'all',
  searchQuery: '',
  isWaiterCalled: false,
  waiterStatus: 'idle',
  darkMode: false,
  billSplit: [],
  lastFeedback: null,
  voiceSearchActive: false,
  appliedCoupon: null,
  suggestedOffers: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [], appliedCoupon: null };
    case 'SET_FILTER':
      return { ...state, currentFilter: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'CALL_WAITER':
      return { ...state, isWaiterCalled: true, waiterStatus: 'called' };
    case 'WAITER_ACKNOWLEDGED':
      return { ...state, waiterStatus: 'acknowledged' };
    case 'WAITER_COMING':
      return { ...state, waiterStatus: 'coming' };
    case 'WAITER_RESET':
      return { ...state, isWaiterCalled: false, waiterStatus: 'idle' };
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cart: [],
        appliedCoupon: null,
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status, progress: action.payload.progress }
            : order
        ),
      };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_BILL_SPLIT':
      return { ...state, billSplit: action.payload };
    case 'SET_FEEDBACK':
      return { ...state, lastFeedback: action.payload };
    case 'TOGGLE_VOICE_SEARCH':
      return { ...state, voiceSearchActive: !state.voiceSearchActive };
    case 'APPLY_COUPON':
      return { ...state, appliedCoupon: action.payload };
    case 'REMOVE_COUPON':
      return { ...state, appliedCoupon: null };
    case 'SET_SUGGESTED_OFFERS':
      return { ...state, suggestedOffers: action.payload };
    case 'UPDATE_USER_LOYALTY':
      if (!state.user) return state;
      const updatedUser = {
        ...state.user,
        totalSpent: (state.user.totalSpent || 0) + action.payload.spent,
      };
      // Update tier based on total spent
      if (updatedUser.totalSpent >= 10000) {
        updatedUser.tier = 'Platinum';
      } else if (updatedUser.totalSpent >= 5000) {
        updatedUser.tier = 'Gold';
      } else if (updatedUser.totalSpent >= 2000) {
        updatedUser.tier = 'Silver';
      } else {
        updatedUser.tier = 'Bronze';
      }
      return { ...state, user: updatedUser };
    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('foodieAppState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Convert timestamp strings back to Date objects
        if (parsedState.orders) {
          parsedState.orders = parsedState.orders.map((order: any) => ({
            ...order,
            timestamp: new Date(order.timestamp)
          }));
        }
        if (parsedState.appliedCoupon?.appliedAt) {
          parsedState.appliedCoupon.appliedAt = new Date(parsedState.appliedCoupon.appliedAt);
        }
        dispatch({ type: 'LOAD_SAVED_STATE', payload: parsedState });
      } catch (error) {
        console.error('Failed to load saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      user: state.user,
      cart: state.cart,
      orders: state.orders,
      darkMode: state.darkMode,
      lastFeedback: state.lastFeedback,
      appliedCoupon: state.appliedCoupon,
    };
    localStorage.setItem('foodieAppState', JSON.stringify(stateToSave));
  }, [state.user, state.cart, state.orders, state.darkMode, state.lastFeedback, state.appliedCoupon]);

  // Auto dark mode based on system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('manualDarkMode')) {
        dispatch({ type: 'TOGGLE_DARK_MODE' });
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={state.darkMode ? 'dark' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};