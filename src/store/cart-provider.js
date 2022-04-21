import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const exisitingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const existingCartItem = state.items[exisitingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const exisitingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });

    const exisitingItem = state.items[exisitingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exisitingItem.price;

    let updatedItems;
    if (exisitingItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedAmount = (exisitingItem.amount - 1);
      const updatedItem = { ...exisitingItem, amount: updatedAmount };
      updatedItems = [...state.items];
      updatedItems[exisitingCartItemIndex] = updatedItem;
    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
