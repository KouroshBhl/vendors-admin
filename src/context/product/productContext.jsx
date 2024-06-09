import { createContext, useContext, useReducer } from 'react';
import productReducer from './productReducer';

const ProductContext = createContext();

const productState = {
  uniqueId: null,
  actionType: '',
};

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, productState);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  if (ProductContext === undefined)
    throw new Error('useProductContext must be used within a ProductProvider');

  return useContext(ProductContext);
}
