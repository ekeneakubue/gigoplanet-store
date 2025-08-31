"use client"

import { createContext, useContext, useReducer, ReactNode } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        
        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          itemCount: newItemCount,
        }
      } else {
        // Add new item
        const newItems = [...state.items, { ...action.payload, quantity: 1 }]
        const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)
        
        return {
          ...state,
          items: newItems,
          total: newTotal,
          itemCount: newItemCount,
        }
      }
    }
    
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }
    
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0) // Remove items with 0 quantity
      
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: updatedItems,
        total: newTotal,
        itemCount: newItemCount,
      }
    }
    
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      }
    
    case "LOAD_CART": {
      const newTotal = action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      const newItemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      
      return {
        ...state,
        items: action.payload,
        total: newTotal,
        itemCount: newItemCount,
      }
    }
    
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isInCart: (id: number) => boolean
  getItemQuantity: (id: number) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const isInCart = (id: number) => {
    return state.items.some(item => item.id === id)
  }

  const getItemQuantity = (id: number) => {
    const item = state.items.find(item => item.id === id)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
