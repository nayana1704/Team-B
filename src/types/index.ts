export interface FoodItem {
  id: string;
  name: string;
  description: string;
  image: string;
  gif?: string;
  calories: number;
  price: number;
  category: 'veg' | 'non-veg' | 'beverages' | 'desserts' | 'combo' | 'healthy';
  ingredients: Ingredient[];
  isCombo?: boolean;
  allergens?: string[];
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot';
  dietary?: string[];
  availability?: number;
  isAvailable?: boolean;
  deliveryTime?: number; // in minutes
  rating?: number;
  chefRecommended?: boolean;
  todaysSpecial?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  isMajor: boolean;
  quantity: number;
  maxQuantity: number;
  price?: number;
  type?: 'spice' | 'sauce';
  level?: 'less' | 'medium' | 'high';
}

export interface CartItem {
  id: string;
  foodItem: FoodItem;
  quantity: number;
  customIngredients: Ingredient[];
  instructions?: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  timestamp: Date;
  tableNumber?: string;
  progress?: number;
  appliedOffer?: Offer;
  discountAmount?: number;
}

export type FilterCategory = 'all' | 'veg' | 'non-veg' | 'beverages' | 'desserts' | 'combo' | 'healthy';

export interface User {
  id: string;
  name: string;
  phone: string;
  tableNumber?: string;
  preferences?: string[];
  totalSpent?: number;
  memberSince?: Date;
  tier?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gradient: string;
  code: string;
  discountType: 'percentage' | 'fixed' | 'bogo' | 'free-item';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  applicableCategories?: string[];
  isActive: boolean;
  validUntil?: Date;
  usageLimit?: number;
  usedCount?: number;
}

export interface BillSplit {
  id: string;
  name: string;
  amount: number;
  paid: boolean;
}

export interface AppliedCoupon {
  offer: Offer;
  discountAmount: number;
  appliedAt: Date;
}