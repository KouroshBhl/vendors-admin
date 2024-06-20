import supabase from './supabase';

export async function getCategories() {
  const { data, error } = await supabase.from('product_category').select('*');

  if (error) {
    console.error(error);
    throw new Error('Categories could not be loaded');
  }

  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase
    .from('product_category')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Could not delete category');
}

export async function createCategory(data) {
  const { error } = await supabase
    .from('product_category')
    .insert([{ ...data }])
    .select();

  if (error) throw new Error('Could not create category');
}

export async function editCategory(newData, id) {
  const { error } = await supabase
    .from('product_category')
    .update({ ...newData })
    .eq('id', id)
    .select();

  if (error) throw new Error('Could not update category');
}
