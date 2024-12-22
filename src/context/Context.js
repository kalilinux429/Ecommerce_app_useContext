import { createContext, useContext, useReducer } from "react";
import { faker } from '@faker-js/faker';  // Correct import
import { cartReducer, productReducer } from "./Reducers";

// Create the context for Cart
const Cart = createContext();

// Set a seed for faker to generate consistent data
faker.seed(99);


const Context = ({ children }) => {
  // Generate fake product data
  const products = [...Array(48)].map(() => ({
    id: faker.string.uuid(),  // Correct usage
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.url(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  // Set up state management with useReducer for cart and products
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

// Custom hook to access cart state
export const CartState = () => {
  return useContext(Cart);
};

export default Context;
