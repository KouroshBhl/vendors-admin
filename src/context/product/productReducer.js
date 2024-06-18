import { v4 as uuidv4 } from 'uuid';

export default function fileReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_UUID':
      let uniqueId;
      if (payload.actionType === 'edit') uniqueId = payload.uniqueId;
      else if (payload.actionType === 'duplicate') uniqueId = uuidv4();
      else uniqueId = uuidv4();

      return { ...state, uniqueId, actionType: payload.actionType };

    case 'SET_PRODUCTS_TABLE':
      return { ...state, productsTable: payload, allProducts: payload };

    case 'SET_SEARCH_RESULTS':
      if (payload?.length > 0) {
        return { ...state, productsTable: payload };
      }
      return { ...state, productsTable: [] };

    case 'SET_SEARCH_QUERY':
      if (payload.length === 0) {
        return { ...state, productsTable: state.allProducts };
      }

      return { ...state };

    default:
      throw new Error('No action found!');
  }
}
