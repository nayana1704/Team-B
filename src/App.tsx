import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import Menu from './components/Menu';
import FoodDetail from './components/FoodDetail';
import Cart from './components/Cart';
import Orders from './components/Orders';
import WaiterButton from './components/WaiterButton';

const AppRoutes = () => {
  const { state } = useApp();

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={state.user ? <Navigate to="/menu" replace /> : <Login />} 
        />
        <Route 
          path="/menu" 
          element={state.user ? <Menu /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/food/:id" 
          element={state.user ? <FoodDetail /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/cart" 
          element={state.user ? <Cart /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/orders" 
          element={state.user ? <Orders /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
      </Routes>
      {state.user && <WaiterButton />}
    </BrowserRouter>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </AppProvider>
  );
}

export default App;