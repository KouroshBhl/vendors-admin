import supabase from './supabase';

export async function searchProduct(query) {
  const { data: searchData, error } = await supabase
    .from('product')
    .select()
    .textSearch('englishTitle', `${query}:*`);

  if (error) {
    throw new Error('could not read data');
  }

  return searchData;
}
