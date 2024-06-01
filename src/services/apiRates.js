import supabase, { supabaseUrl } from './supabase';

export async function getRates() {
  const { data, error } = await supabase.from('currencies').select('*');

  if (error) {
    console.error(error);
    throw new Error('Currency could not be loaded');
  }

  return data;
}

export async function editRates(data, id) {
  console.log(data, id);

  const { data: results, error } = await supabase
    .from('currencies')
    .update({ price: data })
    .eq('id', id)
    .select();

  if (error) {
    console.error(error);
    throw new Error('Currency could not be loaded');
  }

  return results;
}
