import supabase from './supabase';

export async function getCurrencies() {
  let { data, error } = await supabase.from('product_currency').select('*');

  return data;
}
