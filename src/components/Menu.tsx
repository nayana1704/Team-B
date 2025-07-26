import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { foodItems, offers } from '../data/foodItems';
import { FilterCategory, Offer } from '../types';
import { Search, Filter, ShoppingCart, Star, Clock, Flame, Gift, ArrowRight, Mic, MicOff, Moon, Sun, Zap, AlertTriangle, Tag, X, Check, Leaf, Crown, Award, Monitor, Shield, BookOpen, Calendar } from 'lucide-react';
import WaiterButton from './WaiterButton';

const Menu = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showMobileAlert, setShowMobileAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const combosContainerRef = useRef<HTMLDivElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activePriceFilter, setActivePriceFilter] = useState(false);
  const [activeTimeFilter, setActiveTimeFilter] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  // Add new filter states
  const [activeRatingFilter, setActiveRatingFilter] = useState(false);
  const [activePureVegFilter, setActivePureVegFilter] = useState(false);
  const [activeComboFilter, setActiveComboFilter] = useState(false);
  const [activeChefFilter, setActiveChefFilter] = useState(false);
  const [activeSpecialFilter, setActiveSpecialFilter] = useState(false);

  // Add state for advanced filters
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('sort');
  const [selectedSortBy, setSelectedSortBy] = useState('relevance');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string[]>([]);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<string[]>([]);
  const [selectedOffersFilter, setSelectedOffersFilter] = useState<string[]>([]);
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string[]>([]);
  const [selectedTrustFilter, setSelectedTrustFilter] = useState<string[]>([]);
  const [selectedCollectionsFilter, setSelectedCollectionsFilter] = useState<string[]>([]);

  // Add a sortBy state for sorting
  const [sortBy, setSortBy] = useState('relevance');

  // Filter categories
  const filterCategories = [
    { key: 'sort', label: 'Sort By', icon: Filter },
    { key: 'rating', label: 'Rating', icon: Star },
    { key: 'price', label: 'Dish Price', icon: Tag },
    { key: 'combos', label: 'Combos', icon: Gift },
    { key: 'collections', label: 'Collections', icon: BookOpen },
  ];

  // Sort options
  const sortOptions = [
    { key: 'relevance', label: 'Relevance' },
    { key: 'price-low', label: 'Price: Low to High' },
    { key: 'price-high', label: 'Price: High to Low' },
    { key: 'rating', label: 'Rating' },
    { key: 'delivery-time', label: 'Delivery Time' },
  ];

  // Time options
  const timeOptions = [
    { key: 'schedule', label: 'Schedule', icon: Calendar },
    { key: 'under-30', label: 'Under 30 mins', icon: Clock },
  ];

  // Rating options
  const ratingOptions = [
    { key: '3.5+', label: 'Rated 3.5+', icon: Star },
    { key: '4.0+', label: 'Rated 4.0+', icon: Star },
  ];

  // Offers options
  const offersOptions = [
    { key: 'bogo', label: 'Buy 1 Get 1 and more' },
    { key: 'deals', label: 'Deals of the Day' },
  ];

  // Price options
  const priceOptions = [
    { key: 'under-200', label: 'Under ₹200' },
    { key: '200-500', label: '₹200 - ₹500' },
    { key: '500+', label: 'Above ₹500' },
  ];

  // Trust options
  const trustOptions = [
    { key: 'hygiene', label: 'Hygiene Rating' },
    { key: 'verified', label: 'Verified Restaurants' },
  ];

  // Collections options
  const collectionsOptions = [
    { key: 'trending', label: 'Trending Now' },
    { key: 'popular', label: 'Most Popular' },
  ];

  // Add combos options
  const combosOptions = [
    { key: 'combos', label: 'Show only combos' },
  ];

  // Voice recognition setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserQuestion(transcript);
      setIsListening(false);
    };
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onerror = () => setIsListening(false);
  }, []);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Food type filters with images
  const foodTypeFilters = [
    { key: 'all', label: 'All', image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'biryani', label: 'Biryani', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'pizza', label: 'Pizza', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'burger', label: 'Burger', image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'combo', label: 'Combo', image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'bowl', label: 'Bowl', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'salad', label: 'Salad', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'curry', label: 'Curry', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&w=80&h=80&fit=crop' },
    { key: 'dessert', label: 'Dessert', image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&w=80&h=80&fit=crop' },
  ];

  // Track selected food type
  const [selectedFoodType, setSelectedFoodType] = useState('all');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll functionality for combos
  useEffect(() => {
    if (!isAutoScrolling || !combosContainerRef.current) return;

    const interval = setInterval(() => {
      if (combosContainerRef.current) {
        const container = combosContainerRef.current;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const currentScroll = container.scrollLeft;
        
        // If we've reached the end, scroll back to start
        if (currentScroll >= scrollWidth - clientWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by one item width (approximately 288px + 16px gap)
          container.scrollTo({ left: currentScroll + 304, behavior: 'smooth' });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Pause auto-scroll when user manually scrolls
  const handleComboScroll = () => {
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
      // Resume auto-scroll after 5 seconds of no manual interaction
      setTimeout(() => setIsAutoScrolling(true), 5000);
    }
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setShowMobileAlert(true);
  };

  const handleAIChat = () => {
    setShowAIChat(true);
    const welcomeMessage = `👋 Hi! I'm your AI food assistant. Ask me for food suggestions, combos, or recommendations based on your mood, time, or preferences!`;
    setChatMessages([{type: 'ai', content: welcomeMessage}]);
  };

  const handleAIResponse = async () => {
    if (!userQuestion.trim()) return;

    const userMessage = userQuestion.trim();
    setUserQuestion('');
    
    // Add user message to chat
    setChatMessages(prev => [...prev, {type: 'user', content: userMessage}]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate AI response
    const response = generateAIResponse(userMessage);
    
    // Add AI response to chat
    setChatMessages(prev => [...prev, {type: 'ai', content: response}]);
    setIsTyping(false);
  };

  const generateAIResponse = (question: string): string => {
    const now = new Date();
    const timeOfDay = now.getHours();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    const currentTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Simulate weather (random for demo)
    const isCold = Math.random() > 0.5;
    const weather = isCold ? 'cold' : 'warm';
    
    const questionLower = question.toLowerCase();
    
    // Time-based responses
    if (questionLower.includes('lunch') || questionLower.includes('noon') || (timeOfDay >= 11 && timeOfDay <= 14)) {
      return `🍽️ **Perfect Lunch Suggestions!** (${currentTime})

For a satisfying lunch, I recommend:

🔥 **Spicy Options:**
• Chicken Biryani - Aromatic and flavorful
• Spicy Pasta - Quick and delicious
• Hot Wings - Perfect finger food

🥗 **Healthy Choices:**
• Grilled Chicken Salad - Light and nutritious
• Quinoa Bowl - Protein-packed goodness
• Vegetable Stir Fry - Fresh and colorful

💡 **Pro Tip:** Lunch is the perfect time to try our daily specials! They're always fresh and made with seasonal ingredients.

What type of lunch are you in the mood for? 😋`;
    }
    
    if (questionLower.includes('dinner') || questionLower.includes('evening') || (timeOfDay >= 17 && timeOfDay <= 21)) {
      return `🌙 **Dinner Recommendations!** (${currentTime})

For a delightful dinner experience:

🍖 **Hearty Options:**
• Grilled Salmon - Rich in omega-3
• Beef Steak - Premium quality cuts
• Lamb Curry - Traditional flavors

🍝 **Comfort Food:**
• Creamy Pasta - Ultimate comfort
• Pizza Margherita - Classic choice
• Mac & Cheese - Childhood favorite

🥂 **Date Night Specials:**
• Lobster Thermidor - Romantic and elegant
• Wine Pairing Menu - Complete experience
• Chocolate Lava Cake - Sweet ending

💡 **Pro Tip:** Dinner is our busiest time! Consider ordering early for the best experience.

What sounds appealing for your dinner? 🍷`;
    }
    
    if (questionLower.includes('breakfast') || questionLower.includes('morning') || (timeOfDay >= 6 && timeOfDay <= 10)) {
      return `🌅 **Breakfast & Brunch Ideas!** (${currentTime})

Start your day right with:

🥞 **Sweet Breakfast:**
• Pancakes with Maple Syrup - Fluffy perfection
• French Toast - Golden and crispy
• Belgian Waffles - Light and airy

🥓 **Savory Options:**
• Eggs Benedict - Classic brunch
• Avocado Toast - Healthy and trendy
• Breakfast Burrito - Protein-packed

☕ **Morning Drinks:**
• Fresh Orange Juice - Vitamin C boost
• Cappuccino - Perfect coffee
• Green Smoothie - Energizing

💡 **Pro Tip:** Our breakfast menu is available until 11 AM on weekdays and all day on weekends!

What's your morning mood? ☀️`;
    }
    
    // Preference-based responses
    if (questionLower.includes('spicy') || questionLower.includes('hot')) {
      return `🔥 **Spicy Food Recommendations!**

Here are some fiery options for you:

🌶️ **Extra Spicy:**
• Ghost Pepper Wings - Not for the faint-hearted
• Spicy Ramen - Noodles with a kick
• Hot Curry - Traditional heat

🔥 **Medium Spicy:**
• Jalapeño Poppers - Perfect appetizer
• Spicy Tacos - Mexican heat
• Hot Pizza - Extra pepperoni

💡 **Pro Tip:** You can customize spice levels (Low/Medium/High) for most dishes!

How spicy do you like it? 🔥`;
    }
    
    if (questionLower.includes('healthy') || questionLower.includes('light') || questionLower.includes('diet')) {
      return `🥗 **Healthy & Nutritious Options!**

Here are some wholesome choices:

🥬 **Salads & Greens:**
• Caesar Salad - Classic and crisp
• Greek Salad - Mediterranean fresh
• Quinoa Bowl - Protein-rich grains

🐟 **Lean Proteins:**
• Grilled Salmon - Omega-3 rich
• Chicken Breast - High protein
• Tofu Stir Fry - Plant-based protein

🥑 **Superfoods:**
• Avocado Toast - Healthy fats
• Acai Bowl - Antioxidant rich
• Green Smoothie - Vitamin packed

💡 **Pro Tip:** We use fresh, locally-sourced ingredients for all our healthy options!

What's your health goal today? 🌱`;
    }
    
    if (questionLower.includes('sweet') || questionLower.includes('dessert') || questionLower.includes('cake')) {
      return `🍰 **Sweet Treats & Desserts!**

Indulge your sweet tooth with:

🍰 **Cakes & Pastries:**
• Chocolate Lava Cake - Molten center
• Tiramisu - Italian classic
• Red Velvet Cake - Rich and moist

🍦 **Cold Treats:**
• Vanilla Ice Cream - Classic choice
• Gelato - Italian style
• Frozen Yogurt - Lighter option

🍪 **Baked Goods:**
• Chocolate Chip Cookies - Warm and gooey
• Brownies - Fudgy perfection
• Apple Pie - Traditional favorite

💡 **Pro Tip:** Our desserts are made fresh daily and pair perfectly with coffee!

What's your sweet craving? 🍭`;
    }
    
    if (questionLower.includes('vegetarian') || questionLower.includes('vegan')) {
      return `🌱 **Vegetarian & Vegan Options!**

Delicious plant-based choices:

🥬 **Fresh Salads:**
• Mediterranean Salad - Fresh and colorful
• Buddha Bowl - Nutrient-packed
• Caprese Salad - Italian classic

🍝 **Pasta & Grains:**
• Mushroom Risotto - Creamy and rich
• Vegetable Pasta - Colorful and fresh
• Quinoa Pilaf - Protein-rich

🥘 **Main Dishes:**
• Vegetable Curry - Spiced and aromatic
• Tofu Stir Fry - Asian flavors
• Lentil Soup - Hearty and warm

💡 **Pro Tip:** All our vegetarian options are clearly marked on the menu!

What plant-based dish interests you? 🌿`;
    }
    
    if (questionLower.includes('budget') || questionLower.includes('cheap') || questionLower.includes('affordable')) {
      return `💰 **Budget-Friendly Options!**

Great value for your money:

🍕 **Pizza & Pasta:**
• Margherita Pizza - Classic and affordable
• Spaghetti Carbonara - Rich and filling
• Penne Arrabbiata - Spicy and cheap

🍔 **Burgers & Sandwiches:**
• Classic Burger - Juicy and satisfying
• Grilled Cheese - Comfort food
• Club Sandwich - Triple-decker value

🥗 **Salads & Bowls:**
• House Salad - Fresh and light
• Rice Bowl - Filling and nutritious
• Soup of the Day - Warm and cheap

💡 **Pro Tip:** Check our daily specials for the best deals!

What's your budget range? 💸`;
    }
    
    if (questionLower.includes('family') || questionLower.includes('group') || questionLower.includes('party')) {
      return `👨‍👩‍👧‍👦 **Family & Group Dining!**

Perfect for sharing and celebrating:

🍕 **Shareable Platters:**
• Family Pizza - Large and customizable
• Appetizer Platter - Variety for everyone
• Pasta Family Style - Generous portions

🍖 **Main Courses:**
• Roast Chicken - Classic family meal
• Lasagna - Comfort food for all
• Fish & Chips - Kid-friendly option

🎂 **Special Occasions:**
• Birthday Cake - Sweet celebration
• Champagne Toast - Adult beverages
• Kids Menu - Special portions

💡 **Pro Tip:** We offer family packages and group discounts for 6+ people!

How many people are you dining with? 🎉`;
    }
    
    if (questionLower.includes('quick') || questionLower.includes('fast') || questionLower.includes('time')) {
      return `⚡ **Quick & Fast Options!**

Perfect when you're in a hurry:

🍔 **Fast Food:**
• Burger & Fries - Quick classic
• Chicken Wrap - Portable and fresh
• Hot Dog - Instant satisfaction

🥪 **Sandwiches:**
• Club Sandwich - Triple-decker speed
• Panini - Pressed and hot
• BLT - Bacon lovers' choice

🥗 **Quick Bites:**
• Caesar Salad - Fresh and fast
• Soup of the Day - Warm and quick
• Fruit Bowl - Healthy and instant

💡 **Pro Tip:** Our express menu items are ready in under 10 minutes!

How much time do you have? ⏰`;
    }
    
    // Weather-based responses
    if (weather === 'cold' && (questionLower.includes('cold') || questionLower.includes('warm'))) {
      return `❄️ **Warm Comfort Food for Cold Weather!**

Perfect for staying cozy:

🍲 **Hot Soups:**
• Tomato Basil Soup - Rich and warming
• Chicken Noodle - Classic comfort
• French Onion - Cheesy and hot

☕ **Warm Drinks:**
• Hot Chocolate - Sweet and creamy
• Cappuccino - Coffee warmth
• Herbal Tea - Soothing and hot

🍖 **Hearty Dishes:**
• Beef Stew - Slow-cooked comfort
• Mac & Cheese - Creamy warmth
• Hot Pot - Interactive and warm

💡 **Pro Tip:** Our soups are made fresh daily and perfect for cold weather!

Stay warm and cozy! 🔥`;
    }
    
    // Default response
    return `🤔 **Let me help you find the perfect meal!**

Based on your question about "${question}", here are some great options:

🍽️ **Popular Choices:**
• Our signature dishes are always a hit
• Daily specials offer great value
• Chef's recommendations are top-rated

💡 **Pro Tips:**
• Current time: ${currentTime} on ${currentDay}
• Weather: ${weather === 'cold' ? '❄️ Cold' : '☀️ Warm'} today
• ${isWeekend ? 'Weekend' : 'Weekday'} - perfect for ${isWeekend ? 'relaxed dining' : 'quick meals'}

What specific type of food are you looking for? I can suggest:
• Spicy dishes 🌶️
• Healthy options 🥗
• Sweet treats 🍰
• Budget-friendly 💰
• Quick meals ⚡

Just let me know your preference! 😊`;
  };

  // Update filtering logic
  const filteredItems = useMemo(() => {
    let items = foodItems;
    if (selectedFoodType !== 'all') {
      const type = selectedFoodType.toLowerCase();
      items = items.filter(item => item.name.toLowerCase().includes(type));
    }
    if (vegOnly) {
      items = items.filter(item => item.dietary && item.dietary.includes('vegetarian'));
    }
    if (activePriceFilter) {
      items = items.filter(item => item.price <= 200);
    }
    if (activeRatingFilter) {
      items = items.filter(item => item.rating && item.rating >= 4);
    }
    if (activePureVegFilter) {
      items = items.filter(item => item.dietary && item.dietary.includes('vegetarian') && (!item.dietary.includes('eggless') || item.dietary.includes('vegetarian')));
    }
    if (activeComboFilter) {
      items = items.filter(item => item.isCombo);
    }
    if (activeChefFilter) {
      items = items.filter(item => item.chefRecommended);
    }
    if (activeSpecialFilter) {
      items = items.filter(item => item.todaysSpecial);
    }
    // Apply search filter as before
    if (state.searchQuery.trim()) {
      const searchTerm = state.searchQuery.toLowerCase().trim();
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }
    // Apply sorting
    if (sortBy === 'price-low') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items = [...items].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'delivery-time') {
      items = [...items].sort((a, b) => (a.deliveryTime || 999) - (b.deliveryTime || 999));
    }
    return items;
  }, [selectedFoodType, vegOnly, state.searchQuery, activePriceFilter, activeRatingFilter, activePureVegFilter, activeComboFilter, activeChefFilter, activeSpecialFilter, sortBy]);

  // Calculate suggested offers based on cart
  useEffect(() => {
    const cartTotal = state.cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
    const cartCategories = [...new Set(state.cart.map(item => item.foodItem.category))];
    
    const suggestedOffers = offers.filter(offer => {
      if (!offer.isActive) return false;
      if (offer.minOrderAmount && cartTotal < offer.minOrderAmount) return false;
      if (offer.applicableCategories && !offer.applicableCategories.some(cat => cartCategories.includes(cat))) return false;
      if (offer.usageLimit && offer.usedCount >= offer.usageLimit) return false;
      return true;
    }).slice(0, 3);

    dispatch({ type: 'SET_SUGGESTED_OFFERS', payload: suggestedOffers });
  }, [state.cart, dispatch]);

  const handleItemClick = (itemId: string) => {
    navigate(`/food/${itemId}`);
  };

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const handleVoiceSearch = () => {
    if (!state.voiceSearchActive) {
      dispatch({ type: 'TOGGLE_VOICE_SEARCH' });
      
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          dispatch({ type: 'SET_SEARCH_QUERY', payload: transcript });
          dispatch({ type: 'TOGGLE_VOICE_SEARCH' });
        };
        
        recognition.onerror = () => {
          dispatch({ type: 'TOGGLE_VOICE_SEARCH' });
        };
        
        recognition.start();
      } else {
        showAlert('Voice search not supported in this browser');
        dispatch({ type: 'TOGGLE_VOICE_SEARCH' });
      }
    }
  };

  const handleOfferClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowOfferModal(true);
  };

  const calculateDiscount = (offer: Offer) => {
    const cartTotal = state.cart.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
    
    switch (offer.discountType) {
      case 'percentage':
        const percentDiscount = (cartTotal * offer.discountValue) / 100;
        return Math.min(percentDiscount, offer.maxDiscount || percentDiscount);
      case 'fixed':
        return offer.discountValue;
      case 'bogo':
        // Calculate BOGO discount based on applicable items
        const applicableItems = state.cart.filter(item => 
          !offer.applicableCategories || offer.applicableCategories.includes(item.foodItem.category)
        );
        return applicableItems.reduce((total, item) => total + (item.totalPrice * Math.floor(item.quantity / 2)), 0);
      case 'free-item':
        return offer.discountValue;
      default:
        return 0;
    }
  };

  const applyOffer = (offer: Offer) => {
    const discountAmount = calculateDiscount(offer);
    const appliedCoupon = {
      offer,
      discountAmount,
      appliedAt: new Date()
    };
    
    dispatch({ type: 'APPLY_COUPON', payload: appliedCoupon });
    setShowOfferModal(false);
    
    // Show success message
    showAlert(`🎉 ${offer.code} applied! You saved ₹${discountAmount}`);
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const getTierIcon = (tier?: string) => {
    switch (tier) {
      case 'Bronze': return <Award className="w-4 h-4 text-orange-600" />;
      case 'Silver': return <Star className="w-4 h-4 text-gray-500" />;
      case 'Gold': return <Crown className="w-4 h-4 text-yellow-500" />;
      case 'Platinum': return <Crown className="w-4 h-4 text-purple-500" />;
      default: return <Award className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'Bronze': return 'text-orange-600';
      case 'Silver': return 'text-gray-500';
      case 'Gold': return 'text-yellow-500';
      case 'Platinum': return 'text-purple-500';
      default: return 'text-gray-400';
    }
  };

  const getSpiceIcon = (level?: string) => {
    switch (level) {
      case 'mild': return '🌶️';
      case 'medium': return '🌶️🌶️';
      case 'hot': return '🌶️🌶️🌶️';
      case 'very-hot': return '🌶️🌶️🌶️🌶️';
      default: return '';
    }
  };

  const getDietaryIcons = (dietary?: string[]) => {
    if (!dietary) return [];
    return dietary.map(diet => {
      switch (diet) {
        case 'vegetarian': return '🥬';
        case 'vegan': return '🌱';
        case 'gluten-free': return '🌾';
        case 'healthy': return '💚';
        default: return '';
      }
    }).filter(Boolean);
  };

  const getAllergenIcons = (allergens?: string[]) => {
    if (!allergens) return [];
    return allergens.map(allergen => {
      switch (allergen) {
        case 'dairy': return '🥛';
        case 'nuts': return '🥜';
        case 'gluten': return '🌾';
        case 'eggs': return '🥚';
        case 'fish': return '🐟';
        default: return '';
      }
    }).filter(Boolean);
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  };

  // Add a function to clear all filters
  const handleClearAllFilters = () => {
    setSelectedSortBy('relevance');
    setSelectedRatingFilter([]);
    setSelectedPriceFilter([]);
    setActiveComboFilter(false);
    setActiveRatingFilter(false);
    setActivePriceFilter(false);
    setActiveComboFilter(false);
    setActiveChefFilter(false);
    setActiveSpecialFilter(false);
    setSortBy('relevance');
  };

  // When opening the modal, sync advanced filter selections with main filter states
  const handleOpenFilterModal = () => {
    setSelectedSortBy(sortBy);
    setSelectedRatingFilter(activeRatingFilter ? ['4.0+'] : []);
    setSelectedPriceFilter(activePriceFilter ? ['under-200'] : []);
    setActiveComboFilter(activeComboFilter);
    setShowFilterModal(true);
  };

  // When Show results is clicked, update main filter states
  const handleApplyAdvancedFilters = () => {
    setSortBy(selectedSortBy);
    setActiveRatingFilter(selectedRatingFilter.includes('4.0+'));
    setActivePriceFilter(selectedPriceFilter.includes('under-200'));
    setActiveComboFilter(selectedFilterCategory === 'combos' ? activeComboFilter : false);
    setShowFilterModal(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header - Fixed */}
      <div className={`shadow-sm sticky top-0 z-10 transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                Welcome to Foodie App, {state.user?.name}!
              </h1>
              {state.user?.tableNumber && (
                <p className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Table {state.user.tableNumber}
                </p>
              )}
              {state.user?.loyaltyPoints && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-primary-dark" />
                    <span className="text-sm text-primary-dark font-medium">
                      {state.user.loyaltyPoints} points
                    </span>
                  </div>
                  {state.user.tier && (
                    <div className="flex items-center gap-1">
                      {getTierIcon(state.user.tier)}
                      <span className={`text-xs font-medium ${getTierColor(state.user.tier)}`}>
                        {state.user.tier}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAIChat}
                className="p-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all duration-300 shadow-lg"
              >
                <Monitor className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate('/orders')}
                className={`p-3 rounded-full transition-colors ${state.darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <Clock className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="relative p-3 bg-primary-dark rounded-full text-white hover:bg-primary-darker transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Applied Coupon Display */}
          {state.appliedCoupon && (
            <div className="mb-4 bg-green-100 border border-green-300 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">
                  {state.appliedCoupon.offer.code} applied! Saved ₹{state.appliedCoupon.discountAmount}
                </span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-green-600 hover:text-green-800 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Suggested Offers */}
          {state.suggestedOffers.length > 0 && !state.appliedCoupon && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">Suggested for you:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {state.suggestedOffers.map((offer) => (
                  <button
                    key={offer.id}
                    onClick={() => handleOfferClick(offer)}
                    className="flex-shrink-0 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    {offer.code} - Save ₹{calculateDiscount(offer)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${state.darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search for dishes (e.g., 'chicken', 'spicy', 'healthy')..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                className={`w-full pl-12 pr-14 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors ${
                state.darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900'
              }`}
            />
              <button
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  state.voiceSearchActive 
                    ? 'text-red-500 animate-pulse' 
                    : 'text-gray-700 hover:text-black' // darker mic icon
                }`}
                aria-label="Voice Search"
              >
                {state.voiceSearchActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              {state.searchQuery && (
                <button
                  onClick={clearSearch}
                  className={`absolute right-10 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                    state.darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                  }`}
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center ml-2">
              <div className="flex flex-col items-center">
              <button
                  onClick={() => setVegOnly(v => !v)}
                  className={`relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none ${vegOnly ? 'bg-primary-dark' : 'bg-gray-300'}`}
                  aria-label="Toggle Veg Mode"
                >
                  <span
                    className={`absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${vegOnly ? 'translate-x-4' : ''}`}
                  />
              </button>
                <span className="text-xs font-bold mt-1 text-gray-700">VEG MODE</span>
              </div>
            </div>
          </div>

          {/* Search Results Info */}
          {state.searchQuery && (
            <div className="mb-4">
              <p className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {filteredItems.length > 0 
                  ? `Found ${filteredItems.length} item${filteredItems.length === 1 ? '' : 's'} for "${state.searchQuery}"`
                  : `No items found for "${state.searchQuery}"`
                }
              </p>
            </div>
          )}

          {/* Category Filters */}
          <div className="flex gap-4 overflow-x-auto py-2 px-2 scrollbar-hide">
            {foodTypeFilters.map((type) => (
              <div
                key={type.key}
                className="flex flex-col items-center cursor-pointer min-w-[80px]"
                onClick={() => setSelectedFoodType(type.key)}
              >
                <img src={type.image} alt={type.label} className={`w-16 h-16 rounded-full object-cover mb-2 border-2 ${selectedFoodType === type.key ? 'border-primary-dark' : 'border-gray-200'}`} />
                <span className={`text-base font-semibold ${selectedFoodType === type.key ? 'text-primary-dark' : 'text-gray-700'}`}>{type.label}</span>
                {selectedFoodType === type.key && (
                  <div className="w-12 h-1.5 rounded-full bg-primary-dark mt-2" />
                )}
              </div>
            ))}
          </div>

          {/* Additional Filter Bar (styled like reference image) */}
          <div className="flex gap-3 overflow-x-auto py-2 px-2 scrollbar-hide mb-2">
            <button
              className="flex items-center gap-2 bg-gray-800 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-sm"
              onClick={handleOpenFilterModal}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button
              className={`bg-gray-800 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm text-white ${activePriceFilter ? 'ring-2 ring-primary-dark' : ''}`}
              onClick={() => setActivePriceFilter(v => !v)}
            >
              Under ₹200
            </button>
            <button
              className={`bg-gray-800 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm text-white ${activeRatingFilter ? 'ring-2 ring-primary-dark' : ''}`}
              onClick={() => setActiveRatingFilter(v => !v)}
            >
              Ratings 4+
            </button>
            <button
              className={`bg-gray-800 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm text-white ${activePureVegFilter ? 'ring-2 ring-primary-dark' : ''}`}
              onClick={() => setActivePureVegFilter(v => !v)}
            >
              Pure Veg
            </button>
            <button
              className={`bg-gray-800 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm text-white ${activeComboFilter ? 'ring-2 ring-primary-dark' : ''}`}
              onClick={() => setActiveComboFilter(v => !v)}
            >
              Great Combos
            </button>
            <button
              className={`bg-gray-800 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm text-white ${activeChefFilter ? 'ring-2 ring-primary-dark' : ''}`}
              onClick={() => setActiveChefFilter(v => !v)}
            >
              Chef Recommended
            </button>
            <button
              className={`bg-gray-800 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm text-white ${activeSpecialFilter ? 'ring-2 ring-primary-dark' : ''}`}
              onClick={() => setActiveSpecialFilter(v => !v)}
            >
              Today's Special
            </button>
          </div>
          {/* Advanced Filter Modal */}
          {showFilterModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">Filters and sorting</h3>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex h-[60vh]">
                  {/* Left Navigation */}
                  <div className="w-1/3 bg-gray-50 border-r border-gray-200">
                    <div className="p-4">
                      {filterCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
              <button
                key={category.key}
                            onClick={() => setSelectedFilterCategory(category.key)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                              selectedFilterCategory === category.key
                                ? 'bg-primary-dark text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                            <span className="text-sm font-medium">{category.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="w-2/3 p-6 overflow-y-auto">
                    {selectedFilterCategory === 'sort' && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Sort by</h4>
                        <div className="space-y-3">
                          {sortOptions.map((option) => (
                            <button
                              key={option.key}
                              onClick={() => setSelectedSortBy(option.key)}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedSortBy === option.key
                                  ? 'border-primary-dark bg-primary-light text-primary-dark'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{option.label}</span>
                                {selectedSortBy === option.key && <Check className="w-5 h-5 text-primary-dark" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedFilterCategory === 'rating' && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Restaurant Rating</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {ratingOptions.map((option) => {
                            const IconComponent = option.icon;
                            return (
                              <button
                                key={option.key}
                                onClick={() => {
                                  if (selectedRatingFilter.includes(option.key)) {
                                    setSelectedRatingFilter(selectedRatingFilter.filter(f => f !== option.key));
                                  } else {
                                    setSelectedRatingFilter([...selectedRatingFilter, option.key]);
                                  }
                                }}
                                className={`p-3 rounded-lg border transition-colors ${
                                  selectedRatingFilter.includes(option.key)
                                    ? 'border-primary-dark bg-primary-light text-primary-dark'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <IconComponent className="w-4 h-4 text-green-500" />
                                  <span className="text-sm font-medium">{option.label}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {selectedFilterCategory === 'price' && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Dish Price</h4>
                        <div className="space-y-3">
                          {priceOptions.map((option) => (
                            <button
                              key={option.key}
                              onClick={() => {
                                if (selectedPriceFilter.includes(option.key)) {
                                  setSelectedPriceFilter(selectedPriceFilter.filter(f => f !== option.key));
                                } else {
                                  setSelectedPriceFilter([...selectedPriceFilter, option.key]);
                                }
                              }}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedPriceFilter.includes(option.key)
                                  ? 'border-primary-dark bg-primary-light text-primary-dark'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
                    )}

                    {selectedFilterCategory === 'combos' && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Combos</h4>
                        <div className="space-y-3">
                          {combosOptions.map((option) => (
                            <button
                              key={option.key}
                              onClick={() => setActiveComboFilter(v => !v)}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                activeComboFilter
                                  ? 'border-primary-dark bg-primary-light text-primary-dark'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <span className="font-medium">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedFilterCategory === 'collections' && (
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Collections</h4>
                        <div className="space-y-3">
                          {collectionsOptions.map((option) => (
                            <button
                              key={option.key}
                              onClick={() => {
                                if (selectedCollectionsFilter.includes(option.key)) {
                                  setSelectedCollectionsFilter(selectedCollectionsFilter.filter(f => f !== option.key));
                                } else {
                                  setSelectedCollectionsFilter([...selectedCollectionsFilter, option.key]);
                                }
                              }}
                              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                                selectedCollectionsFilter.includes(option.key)
                                  ? 'border-primary-dark bg-primary-light text-primary-dark'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <span className="font-medium">{option.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                  <button
                    onClick={handleClearAllFilters}
                    className="px-6 py-2 text-primary-dark font-semibold hover:underline text-sm"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleApplyAdvancedFilters}
                    className="px-6 py-2 bg-primary-dark text-white rounded-lg font-medium hover:bg-primary-darker"
                  >
                    Show results
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Schedule Modal (placeholder) */}
          {showScheduleModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-80 shadow-xl relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setShowScheduleModal(false)}><X className="w-5 h-5" /></button>
                <h3 className="text-lg font-bold mb-4">Schedule</h3>
                <p className="text-gray-600">Scheduled orders coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Special Offers Section - Scrollable with content */}
      <div className="px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-lg font-bold flex items-center gap-2 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
              <Gift className="w-5 h-5 text-primary-dark" />
              Special Combos
            </h2>
          </div>
          <div 
            ref={combosContainerRef}
            onScroll={handleComboScroll}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
          >
            {foodItems.filter(item => item.isCombo).map((combo) => (
              <div
                key={combo.id}
                onClick={() => combo.isAvailable && handleItemClick(combo.id)}
                className={`flex-shrink-0 w-72 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white shadow-lg transition-all duration-300 cursor-pointer animate-fade-in ${
                  state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{combo.name}</h3>
                    <p className="text-sm font-medium mb-2 opacity-90">{combo.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-bold">
                        ₹{combo.price}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="w-16 h-16 ml-3">
                    <img
                      src={combo.image}
                      alt={combo.name}
                      className="w-full h-full object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Food Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-lg transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No items found
            </p>
            <p className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {state.searchQuery ? 'Try searching for something else' : 'Try adjusting your filters'}
            </p>
            {state.searchQuery && (
              <button
                onClick={clearSearch}
                className="mt-4 bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-darker transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => item.isAvailable && handleItemClick(item.id)}
                className={`rounded-2xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer animate-fade-in ${
                  item.isAvailable 
                    ? `${state.darkMode ? 'bg-gray-800' : 'bg-white'}` 
                    : `opacity-60 cursor-not-allowed ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`
                }`}
              >
                <div className="flex">
                  <div className="w-32 h-32 flex-shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {!item.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">OUT OF STOCK</span>
                      </div>
                    )}
                    {/* Remove low stock label */}
                    {/* {item.availability && item.availability <= 5 && item.isAvailable && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Only {item.availability} left!
                      </div>
                    )} */}
                    {item.category === 'healthy' && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        Healthy
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-4 flex flex-col">
                    <div className="flex items-start mb-2">
                      <h3 className={`font-bold text-lg flex-1 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>{item.name}</h3>
                      <span className="font-bold text-primary-dark text-lg ml-4 whitespace-nowrap self-start flex-shrink-0" style={{minWidth: '64px', textAlign: 'right'}}>
                        ₹{item.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                        {item.isCombo && (
                          <span className="bg-primary-light text-primary-darker px-2 py-1 rounded-full text-xs font-semibold">
                            COMBO
                          </span>
                        )}
                      </div>
                    {/* Dietary and Allergen Info */}
                    <div className="flex items-center gap-2 mb-2">
                      {item.spiceLevel && (
                        <span className="text-sm" title={`Spice Level: ${item.spiceLevel}`}>{getSpiceIcon(item.spiceLevel)}</span>
                      )}
                      {getDietaryIcons(item.dietary).map((icon, index) => (
                        <span key={index} className="text-sm" title="Dietary info">{icon}</span>
                      ))}
                      {getAllergenIcons(item.allergens).map((icon, index) => (
                        <span key={index} className="text-sm" title="Contains allergens">{icon}</span>
                      ))}
                    </div>
                    <p className={`text-sm mb-3 line-clamp-2 transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1 text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}> <Flame className="w-4 h-4" /> <span>{item.calories} cal</span> </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className={`text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>4.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Alert Modal */}
      {showMobileAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-sm w-full mx-4 transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
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

      {/* Offer Modal */}
      {showOfferModal && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl shadow-2xl max-w-md w-full transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
                  Apply Offer
                </h3>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  Apply the offer code "{selectedOffer.code}" to your cart.
                </p>
                <p className="text-sm text-gray-700">
                  This offer will give you a discount of ₹{calculateDiscount(selectedOffer)}.
                </p>
                </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => applyOffer(selectedOffer)}
                  className="px-4 py-2 bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-darker transition-colors"
                >
                  Apply Offer
                </button>
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
                </div>
                </div>
              </div>
      )}

      {/* AI Chat Modal */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-100 rounded-2xl shadow-2xl max-w-md w-full mx-4 flex flex-col" style={{maxHeight: '90vh'}}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-100 rounded-t-2xl border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-dark rounded-full flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg text-gray-700">AI Food Assistant</span>
              </div>
              <button onClick={() => setShowAIChat(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50" style={{minHeight: '300px'}}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}> 
                  <div className={`rounded-xl px-4 py-2 max-w-[80%] text-sm ${msg.type === 'user' ? 'bg-primary-dark text-white' : 'bg-white text-gray-800 border border-gray-200'}`}>{msg.content}</div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-4 py-2 bg-white text-gray-800 border border-gray-200 max-w-[80%] flex items-center gap-2">
                    <span>AI is typing</span>
                    <span className="animate-bounce">...</span>
                  </div>
                </div>
              )}
            </div>
            {/* Input */}
            <form
              className="flex items-center gap-2 px-6 py-4 bg-gray-100 rounded-b-2xl border-t border-gray-200"
              onSubmit={e => { e.preventDefault(); handleAIResponse(); }}
            >
              <input
                type="text"
                value={userQuestion}
                onChange={e => setUserQuestion(e.target.value)}
                placeholder="Ask me for food suggestions..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark bg-white text-gray-900"
                disabled={isTyping}
              />
                <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2 rounded-full ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                aria-label="Voice Input"
                disabled={isTyping}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                type="submit"
                className="p-2 rounded-full bg-primary-dark text-white hover:bg-primary-darker disabled:opacity-50"
                disabled={!userQuestion.trim() || isTyping}
                aria-label="Send"
              >
                <ArrowRight className="w-5 h-5" />
                </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;