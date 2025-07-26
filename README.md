# Restaurant App - TeamB

A modern, interactive restaurant application built with React, TypeScript, and Tailwind CSS. This app provides a complete dining experience with menu browsing, ordering, cart management, and waiter assistance features.

## Features

- 🍽️ **Interactive Menu**: Browse food items with detailed descriptions and images
- 🛒 **Shopping Cart**: Add items, modify quantities, and manage your order
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔔 **Waiter Assistance**: Call for waiter help with real-time status updates
- 📋 **Order Tracking**: View order history and track current order status
- 💳 **Bill Splitting**: Split bills among multiple people
- 🎫 **Coupon System**: Apply discount coupons to your orders
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🎤 **Voice Search**: Search menu items using voice commands
- ⭐ **Loyalty System**: Earn points and track spending

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd TeamB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Menu.tsx        # Main menu component
│   ├── Cart.tsx        # Shopping cart
│   ├── Orders.tsx      # Order tracking
│   ├── FoodDetail.tsx  # Food item details
│   ├── Login.tsx       # User authentication
│   └── WaiterButton.tsx # Waiter assistance
├── context/            # React context providers
│   └── AppContext.tsx  # Main app state management
├── types/              # TypeScript type definitions
├── data/               # Static data and mock APIs
└── App.tsx             # Main app component
```

## Key Features Explained

### Waiter Assistance
The app includes a floating waiter button that allows users to call for assistance. The system provides real-time feedback:
- **Called**: Initial waiter call
- **Acknowledged**: Waiter has received the request
- **Coming**: Waiter is on the way to your table

### Order Management
- Add items to cart with custom quantities
- View order history and current order status
- Real-time order progress tracking
- Bill splitting functionality

### User Experience
- Responsive design that works on all devices
- Smooth animations and transitions
- Intuitive navigation
- Dark/light mode toggle

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Team

- **TeamB** - Restaurant App Development Team

---

Built with ❤️ using React and TypeScript
