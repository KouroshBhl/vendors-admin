import supabase, { supabaseUrl } from './supabase';

export async function getRates() {
  const { data, error } = await supabase.from('product_currency').select('*');

  if (error) {
    console.error(error);
    throw new Error('Currency could not be loaded');
  }

  return data;
}

export async function editRates(data, id) {
  const { data: results, error } = await supabase
    .from('product_currency')
    .update({ price: data })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Currency could not be loaded');
  }

  return results;
}
