import supabase from './supabase';

export async function searchProduct(query) {
  console.log(typeof query);
  const { data: searchData, error } = await supabase
    .from('products')
    .select()
    .textSearch('englishTitle', `${query}:*`);

  if (error) {
    throw new Error('could not read data');
  }

  return searchData;
}
