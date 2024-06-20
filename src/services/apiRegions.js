import supabase from './supabase';

export async function getRegions() {
  const { data, error } = await supabase.from('product_platform').select('*');

  if (error) throw new Error('Could not get platforms');

  return data;
}
