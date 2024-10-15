import supabase from './supabase';

export async function getRates() {
  const { data, error } = await supabase
    .from('product_currency')
    .select('*,updated_by(first_name)')
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error('Currency could not be loaded');
  }

  return data;
}

export async function editRates({ newPrirce, id }) {
  const { data: session, error: userErrro } = await supabase.auth.getUser();
  console.log(session);

  const { data: results, error } = await supabase
    .from('product_currency')
    .update({
      price: newPrirce,
      updated_by: session?.user.id,
      last_updated: new Date(),
    })
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  console.log(error);

  return results;
}
