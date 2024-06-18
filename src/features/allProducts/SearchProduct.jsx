import { useEffect, useState } from 'react';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

import { useSearchProduct } from './useSearchProduct';
import { useProductContext } from '../../context/product/productContext';

function SearchProduct() {
  const { dispatch } = useProductContext();
  const { searchResults, isLoading, mutateSearchQuery } = useSearchProduct();

  function handleSearchQuery(e) {
    const query = e.target.value;
    if (query) mutateSearchQuery(query);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }

  useEffect(() => {
    if (isLoading) return;
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: searchResults,
    });
  }, [searchResults]);

  return (
    <div className='w-full flex items-center gap-2 relative'>
      <Input
        placeholder='Search by product English title'
        onChange={handleSearchQuery}
        className='w-3/4'
      />
      {isLoading && <SpinnerMini />}
    </div>
  );
}

export default SearchProduct;
