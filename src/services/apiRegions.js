import supabase from './supabase';

export async function getRegions() {
  const { data, error } = await supabase.from('regions').select('*');

  if (error) {
    console.log(false);
    throw new Error('Could not get regions');
  }
  return data;
}
