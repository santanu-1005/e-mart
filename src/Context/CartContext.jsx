import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(undefined);

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

function calculateTotals(items) {
  return items.reduce(
    (totals, item) => ({
      totalItems: totals.totalItems + item.quantity,
      totalPrice: totals.totalPrice + item.product.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        updatedItems = [...state.items, { product, quantity }];
      }

      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload.productId);
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const updatedItems = state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const { totalItems, totalPrice } = calculateTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState, () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  const addToCart = (product, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId) => {
    const item = cartState.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
