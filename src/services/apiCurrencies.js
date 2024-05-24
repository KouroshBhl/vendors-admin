import supabase from './supabase';

export async function getCurrencies() {
  let { data, error } = await supabase.from('currencies').select('*');

  return data;
}
