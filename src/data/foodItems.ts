import { FoodItem, Offer } from '../types';

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'A rich, creamy North Indian curry made with tender chicken simmered in a tomato-butter sauce.',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    gif: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 320,
    price: 450,
    category: 'non-veg',
    spiceLevel: 'medium',
    allergens: ['dairy', 'nuts'],
    dietary: ['gluten-free'],
    availability: 8,
    isAvailable: true,
    deliveryTime: 35,
    rating: 4.7,
    chefRecommended: true,
    ingredients: [
      { id: 'ing1', name: 'Chicken', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing2', name: 'Butter', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing3', name: 'Tomato Sauce', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing4', name: 'Cream', isMajor: false, quantity: 1, maxQuantity: 3, price: 20 },
      { id: 'ing5', name: 'Chili Powder', isMajor: false, quantity: 1, maxQuantity: 3 },
      { id: 'ing6', name: 'Garam Masala', isMajor: false, quantity: 1, maxQuantity: 2 },
    ]
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy crust.',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 280,
    price: 350,
    category: 'veg',
    spiceLevel: 'mild',
    allergens: ['gluten', 'dairy'],
    dietary: ['vegetarian'],
    availability: 12,
    isAvailable: true,
    deliveryTime: 25,
    rating: 4.5,
    chefRecommended: true,
    ingredients: [
      { id: 'ing7', name: 'Pizza Dough', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing8', name: 'Mozzarella Cheese', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing9', name: 'Tomato Sauce', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing10', name: 'Fresh Basil', isMajor: false, quantity: 1, maxQuantity: 3 },
      { id: 'ing11', name: 'Extra Cheese', isMajor: false, quantity: 0, maxQuantity: 2, price: 50 },
      { id: 'ing12', name: 'Oregano', isMajor: false, quantity: 1, maxQuantity: 2 },
    ]
  },
  {
    id: '3',
    name: 'Vegetable Biryani',
    description: 'Aromatic basmati rice cooked with mixed vegetables and traditional spices.',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 350,
    price: 280,
    category: 'veg',
    spiceLevel: 'medium',
    allergens: [],
    dietary: ['vegan', 'gluten-free'],
    availability: 15,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.6,
    chefRecommended: true,
    ingredients: [
      { id: 'ing13', name: 'Basmati Rice', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing14', name: 'Mixed Vegetables', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing15', name: 'Biryani Spices', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing16', name: 'Saffron', isMajor: false, quantity: 1, maxQuantity: 2, price: 30 },
      { id: 'ing17', name: 'Fried Onions', isMajor: false, quantity: 1, maxQuantity: 3 },
      { id: 'ing18', name: 'Mint Leaves', isMajor: false, quantity: 1, maxQuantity: 2 },
    ]
  },
  {
    id: '4',
    name: 'Chocolate Milkshake',
    description: 'Rich and creamy chocolate milkshake topped with whipped cream and chocolate chips.',
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 420,
    price: 180,
    category: 'beverages',
    allergens: ['dairy'],
    dietary: ['vegetarian'],
    availability: 20,
    isAvailable: true,
    deliveryTime: 20,
    rating: 4.2,
    ingredients: [
      { id: 'ing19', name: 'Milk', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing20', name: 'Chocolate Ice Cream', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing21', name: 'Chocolate Syrup', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing22', name: 'Whipped Cream', isMajor: false, quantity: 1, maxQuantity: 2, price: 25 },
      { id: 'ing23', name: 'Chocolate Chips', isMajor: false, quantity: 1, maxQuantity: 3, price: 15 },
      { id: 'ing24', name: 'Extra Chocolate Syrup', isMajor: false, quantity: 0, maxQuantity: 2, price: 20 },
    ]
  },
  {
    id: '5',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 380,
    price: 320,
    category: 'desserts',
    allergens: ['eggs', 'dairy', 'gluten'],
    dietary: ['vegetarian'],
    availability: 6,
    isAvailable: true,
    deliveryTime: 25,
    rating: 4.3,
    ingredients: [
      { id: 'ing25', name: 'Ladyfingers', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing26', name: 'Mascarpone Cheese', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing27', name: 'Coffee', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing28', name: 'Cocoa Powder', isMajor: false, quantity: 1, maxQuantity: 2 },
      { id: 'ing29', name: 'Extra Coffee', isMajor: false, quantity: 0, maxQuantity: 2, price: 15 },
      { id: 'ing30', name: 'Chocolate Shavings', isMajor: false, quantity: 1, maxQuantity: 3, price: 25 },
    ]
  },
  {
    id: '6',
    name: 'Chicken Combo Special',
    description: 'Grilled chicken with rice, salad, and a beverage. Perfect for a complete meal.',
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 650,
    price: 520,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'medium',
    allergens: ['dairy'],
    availability: 10,
    isAvailable: true,
    deliveryTime: 40,
    rating: 4.4,
    todaysSpecial: true,
    ingredients: [
      { id: 'ing31', name: 'Grilled Chicken', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing32', name: 'Steamed Rice', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing33', name: 'Fresh Salad', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing34', name: 'Soft Drink', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing35', name: 'Extra Sauce', isMajor: false, quantity: 1, maxQuantity: 3, price: 10 },
      { id: 'ing36', name: 'Upgrade to Premium Drink', isMajor: false, quantity: 0, maxQuantity: 1, price: 50 },
    ]
  },
  {
    id: '16',
    name: 'Veggie Delight Combo',
    description: 'Paneer tikka with naan, dal, and a refreshing lassi. Vegetarian special.',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 580,
    price: 480,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'medium',
    allergens: ['dairy'],
    availability: 12,
    isAvailable: true,
    deliveryTime: 40,
    rating: 4.2,
    ingredients: [
      { id: 'ing70', name: 'Paneer Tikka', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing71', name: 'Butter Naan', isMajor: true, quantity: 2, maxQuantity: 2 },
      { id: 'ing72', name: 'Dal Fry', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing73', name: 'Mango Lassi', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing74', name: 'Extra Paneer', isMajor: false, quantity: 0, maxQuantity: 2, price: 60 },
    ]
  },
  {
    id: '17',
    name: 'Family Feast Combo',
    description: 'Perfect for 4 people - includes 2 main dishes, rice, bread, and 4 drinks.',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 1200,
    price: 850,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'medium',
    allergens: ['dairy', 'nuts'],
    availability: 8,
    isAvailable: true,
    deliveryTime: 45,
    rating: 4.4,
    ingredients: [
      { id: 'ing75', name: 'Butter Chicken', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing76', name: 'Paneer Butter Masala', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing77', name: 'Basmati Rice', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing78', name: 'Butter Naan', isMajor: true, quantity: 4, maxQuantity: 4 },
      { id: 'ing79', name: 'Soft Drinks', isMajor: true, quantity: 4, maxQuantity: 4 },
    ]
  },
  {
    id: '18',
    name: 'Quick Lunch Combo',
    description: 'Fast and delicious - sandwich, soup, and coffee. Perfect for busy days.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 420,
    price: 320,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'mild',
    allergens: ['gluten', 'dairy'],
    availability: 15,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.1,
    ingredients: [
      { id: 'ing80', name: 'Grilled Sandwich', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing81', name: 'Tomato Soup', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing82', name: 'Coffee', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing83', name: 'Extra Cheese', isMajor: false, quantity: 0, maxQuantity: 1, price: 30 },
    ]
  },
  {
    id: '19',
    name: 'Spicy Street Food Combo',
    description: 'Street food favorites - chaat, samosa, and masala chai. Authentic taste.',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 380,
    price: 280,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'hot',
    allergens: ['dairy', 'nuts'],
    availability: 20,
    isAvailable: true,
    deliveryTime: 35,
    rating: 4.2,
    ingredients: [
      { id: 'ing84', name: 'Dahi Puri Chaat', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing85', name: 'Samosa', isMajor: true, quantity: 2, maxQuantity: 2 },
      { id: 'ing86', name: 'Masala Chai', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing87', name: 'Extra Chutney', isMajor: false, quantity: 1, maxQuantity: 2, price: 15 },
    ]
  },
  {
    id: '20',
    name: 'Healthy Bowl Combo',
    description: 'Nutritious quinoa bowl with grilled vegetables and green tea. Fitness friendly.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 350,
    price: 420,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'mild',
    allergens: [],
    availability: 10,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.1,
    ingredients: [
      { id: 'ing88', name: 'Quinoa Bowl', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing89', name: 'Grilled Vegetables', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing90', name: 'Green Tea', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing91', name: 'Extra Avocado', isMajor: false, quantity: 0, maxQuantity: 1, price: 40 },
    ]
  },
  {
    id: '21',
    name: 'Dessert Lover Combo',
    description: 'Sweet indulgence - tiramisu, chocolate shake, and cookies. Perfect ending.',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 520,
    price: 380,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'mild',
    allergens: ['dairy', 'eggs', 'gluten'],
    availability: 8,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.2,
    ingredients: [
      { id: 'ing92', name: 'Tiramisu', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing93', name: 'Chocolate Shake', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing94', name: 'Chocolate Cookies', isMajor: true, quantity: 2, maxQuantity: 2 },
      { id: 'ing95', name: 'Extra Whipped Cream', isMajor: false, quantity: 0, maxQuantity: 1, price: 25 },
    ]
  },
  {
    id: '22',
    name: 'Breakfast Special Combo',
    description: 'Complete breakfast - eggs, toast, juice, and coffee. Start your day right.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 450,
    price: 350,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'mild',
    allergens: ['eggs', 'dairy', 'gluten'],
    availability: 12,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.1,
    ingredients: [
      { id: 'ing96', name: 'Scrambled Eggs', isMajor: true, quantity: 2, maxQuantity: 2 },
      { id: 'ing97', name: 'Butter Toast', isMajor: true, quantity: 2, maxQuantity: 2 },
      { id: 'ing98', name: 'Orange Juice', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing99', name: 'Coffee', isMajor: true, quantity: 1, maxQuantity: 1 },
    ]
  },
  {
    id: '23',
    name: 'Seafood Lover Combo',
    description: 'Fresh fish curry with rice, salad, and lemonade. Ocean fresh taste.',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 480,
    price: 580,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'medium',
    allergens: ['fish'],
    availability: 6,
    isAvailable: true,
    deliveryTime: 40,
    rating: 4.3,
    ingredients: [
      { id: 'ing100', name: 'Fish Curry', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing101', name: 'Steamed Rice', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing102', name: 'Fresh Salad', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing103', name: 'Lemonade', isMajor: true, quantity: 1, maxQuantity: 1 },
    ]
  },
  {
    id: '24',
    name: 'Party Pack Combo',
    description: 'Perfect for celebrations - variety of appetizers, main course, and desserts.',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 800,
    price: 720,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'medium',
    allergens: ['dairy', 'nuts', 'gluten'],
    availability: 5,
    isAvailable: true,
    deliveryTime: 45,
    rating: 4.4,
    ingredients: [
      { id: 'ing104', name: 'Mixed Appetizers', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing105', name: 'Biryani', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing106', name: 'Gulab Jamun', isMajor: true, quantity: 2, maxQuantity: 2 },
      { id: 'ing107', name: 'Soft Drinks', isMajor: true, quantity: 2, maxQuantity: 2 },
    ]
  },
  {
    id: '25',
    name: 'Student Budget Combo',
    description: 'Affordable and filling - burger, fries, and soda. Student friendly pricing.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 650,
    price: 220,
    category: 'combo',
    isCombo: true,
    spiceLevel: 'mild',
    allergens: ['gluten', 'dairy'],
    availability: 25,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.1,
    ingredients: [
      { id: 'ing108', name: 'Veg Burger', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing109', name: 'French Fries', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing110', name: 'Cola', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing111', name: 'Extra Cheese', isMajor: false, quantity: 0, maxQuantity: 1, price: 20 },
    ]
  },
  {
    id: '7',
    name: 'Spicy Paneer Tikka',
    description: 'Marinated paneer cubes grilled to perfection with bell peppers and onions.',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 280,
    price: 320,
    category: 'veg',
    spiceLevel: 'hot',
    allergens: ['dairy'],
    dietary: ['vegetarian', 'gluten-free'],
    availability: 2,
    isAvailable: true,
    deliveryTime: 25,
    rating: 4.2,
    ingredients: [
      { id: 'ing37', name: 'Paneer', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing38', name: 'Bell Peppers', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing39', name: 'Tikka Marinade', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing40', name: 'Extra Paneer', isMajor: false, quantity: 0, maxQuantity: 2, price: 60 },
      { id: 'ing41', name: 'Mint Chutney', isMajor: false, quantity: 1, maxQuantity: 2, price: 15 },
    ]
  },
  {
    id: '8',
    name: 'Fish Curry',
    description: 'Fresh fish cooked in coconut milk with traditional South Indian spices.',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 290,
    price: 480,
    category: 'non-veg',
    spiceLevel: 'very-hot',
    allergens: ['fish'],
    dietary: ['gluten-free'],
    availability: 0,
    isAvailable: false,
    deliveryTime: 35,
    rating: 4.3,
    ingredients: [
      { id: 'ing42', name: 'Fresh Fish', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing43', name: 'Coconut Milk', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing44', name: 'Curry Spices', isMajor: true, quantity: 1, maxQuantity: 1 },
    ]
  },
  {
    id: '9',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken and aromatic herbs.',
    image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 480,
    price: 420,
    category: 'non-veg',
    spiceLevel: 'medium',
    allergens: ['dairy'],
    availability: 8,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.4,
    ingredients: [
      { id: 'ing45', name: 'Chicken', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing46', name: 'Basmati Rice', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing47', name: 'Biryani Spices', isMajor: true, quantity: 1, maxQuantity: 1 },
    ]
  },
  {
    id: '10',
    name: 'Mango Lassi',
    description: 'Traditional Indian yogurt drink blended with sweet mango pulp.',
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 220,
    price: 120,
    category: 'beverages',
    allergens: ['dairy'],
    dietary: ['vegetarian'],
    availability: 15,
    isAvailable: true,
    deliveryTime: 20,
    rating: 4.1,
    ingredients: [
      { id: 'ing48', name: 'Yogurt', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing49', name: 'Mango Pulp', isMajor: true, quantity: 1, maxQuantity: 1 },
    ]
  },
  // Healthy Options
  {
    id: '11',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutritious bowl with quinoa, roasted vegetables, avocado, and tahini dressing.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 420,
    price: 380,
    category: 'healthy',
    allergens: [],
    dietary: ['vegan', 'gluten-free', 'healthy'],
    availability: 10,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.5,
    ingredients: [
      { id: 'ing50', name: 'Quinoa', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing51', name: 'Roasted Vegetables', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing52', name: 'Avocado', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing53', name: 'Tahini Dressing', isMajor: false, quantity: 1, maxQuantity: 2, price: 20 },
      { id: 'ing54', name: 'Extra Avocado', isMajor: false, quantity: 0, maxQuantity: 2, price: 40 },
    ]
  },
  {
    id: '12',
    name: 'Grilled Salmon Salad',
    description: 'Fresh grilled salmon on a bed of mixed greens with lemon vinaigrette.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 320,
    price: 450,
    category: 'healthy',
    allergens: ['fish'],
    dietary: ['gluten-free', 'healthy'],
    availability: 8,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.4,
    ingredients: [
      { id: 'ing55', name: 'Grilled Salmon', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing56', name: 'Mixed Greens', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing57', name: 'Lemon Vinaigrette', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing58', name: 'Cherry Tomatoes', isMajor: false, quantity: 1, maxQuantity: 3 },
    ]
  },
  {
    id: '13',
    name: 'Green Smoothie Bowl',
    description: 'Nutrient-packed smoothie bowl with spinach, banana, and superfood toppings.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 280,
    price: 250,
    category: 'healthy',
    allergens: [],
    dietary: ['vegan', 'gluten-free', 'healthy'],
    availability: 12,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.3,
    ingredients: [
      { id: 'ing59', name: 'Spinach', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing60', name: 'Banana', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing61', name: 'Chia Seeds', isMajor: false, quantity: 1, maxQuantity: 2, price: 25 },
      { id: 'ing62', name: 'Granola', isMajor: false, quantity: 1, maxQuantity: 2, price: 30 },
    ]
  },
  {
    id: '14',
    name: 'Zucchini Noodles',
    description: 'Spiralized zucchini noodles with pesto and cherry tomatoes.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 180,
    price: 320,
    category: 'healthy',
    allergens: ['nuts'],
    dietary: ['vegetarian', 'gluten-free', 'healthy'],
    availability: 15,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.2,
    ingredients: [
      { id: 'ing63', name: 'Zucchini Noodles', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing64', name: 'Pesto Sauce', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing65', name: 'Cherry Tomatoes', isMajor: false, quantity: 1, maxQuantity: 3 },
    ]
  },
  {
    id: '15',
    name: 'Protein Power Bowl',
    description: 'High-protein bowl with grilled chicken, quinoa, and roasted chickpeas.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    calories: 520,
    price: 420,
    category: 'healthy',
    allergens: [],
    dietary: ['gluten-free', 'healthy'],
    availability: 9,
    isAvailable: true,
    deliveryTime: 30,
    rating: 4.4,
    ingredients: [
      { id: 'ing66', name: 'Grilled Chicken', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing67', name: 'Quinoa', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing68', name: 'Roasted Chickpeas', isMajor: true, quantity: 1, maxQuantity: 1 },
      { id: 'ing69', name: 'Extra Protein', isMajor: false, quantity: 0, maxQuantity: 2, price: 80 },
    ]
  }
];

export const offers: Offer[] = [
  {
    id: 'offer1',
    title: '50% OFF',
    subtitle: 'First Order Special',
    description: 'Get 50% discount on your first order above ₹300',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-red-500 to-orange-500',
    code: 'FIRST50',
    discountType: 'percentage',
    discountValue: 50,
    minOrderAmount: 300,
    maxDiscount: 200,
    isActive: true,
    validUntil: new Date('2024-12-31'),
    usageLimit: 1,
    usedCount: 0
  },
  {
    id: 'offer2',
    title: 'Buy 1 Get 1',
    subtitle: 'Pizza Special',
    description: 'Order any pizza and get another pizza absolutely free',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-green-500 to-teal-500',
    code: 'PIZZA2X',
    discountType: 'bogo',
    discountValue: 100,
    applicableCategories: ['veg'],
    isActive: true,
    validUntil: new Date('2024-12-31'),
    usageLimit: 3,
    usedCount: 0
  },
  {
    id: 'offer3',
    title: '₹100 OFF',
    subtitle: 'Combo Meals',
    description: 'Save ₹100 on all combo meals above ₹500',
    image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-purple-500 to-pink-500',
    code: 'COMBO100',
    discountType: 'fixed',
    discountValue: 100,
    minOrderAmount: 500,
    applicableCategories: ['combo'],
    isActive: true,
    validUntil: new Date('2024-12-31'),
    usageLimit: 5,
    usedCount: 0
  },
  {
    id: 'offer4',
    title: 'Free Dessert',
    subtitle: 'Sweet Deal',
    description: 'Get a free dessert with orders above ₹400',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-yellow-500 to-orange-500',
    code: 'SWEET400',
    discountType: 'free-item',
    discountValue: 320,
    minOrderAmount: 400,
    applicableCategories: ['desserts'],
    isActive: true,
    validUntil: new Date('2024-12-31'),
    usageLimit: 2,
    usedCount: 0
  },
  {
    id: 'offer5',
    title: '30% OFF',
    subtitle: 'Weekend Special',
    description: 'Enjoy 30% off on all orders during weekends',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-blue-500 to-indigo-500',
    code: 'WEEKEND30',
    discountType: 'percentage',
    discountValue: 30,
    minOrderAmount: 250,
    maxDiscount: 150,
    isActive: true,
    validUntil: new Date('2024-12-31'),
    usageLimit: 10,
    usedCount: 0
  },
  {
    id: 'offer6',
    title: '₹75 OFF',
    subtitle: 'Beverages Combo',
    description: 'Get ₹75 off when you order 2 or more beverages',
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-cyan-500 to-blue-500',
    code: 'DRINK75',
    discountType: 'fixed',
    discountValue: 75,
    minOrderAmount: 200,
    applicableCategories: ['beverages'],
    isActive: true,
    validUntil: new Date('2024-12-31'),
    usageLimit: 5,
    usedCount: 0
  },
  {
    id: 'offer7',
    title: '25% OFF',
    subtitle: 'Healthy Choice',
    description: 'Get 25% off on all healthy menu items',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-green-400 to-emerald-500',
    code: 'HEALTHY25',
    discountType: 'percentage',
    discountValue: 25,
    minOrderAmount: 200,
    maxDiscount: 100,
    applicableCategories: ['healthy'],
    isActive: true,
    validUntil: new Date('2024-12-31'),
    usageLimit: 5,
    usedCount: 0
  }
];