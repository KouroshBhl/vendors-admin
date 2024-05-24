import supabase, { supabaseUrl } from './supabase';

export async function getBrands() {
  const { data, error } = await supabase.from('brands').select('*');

  if (error) {
    console.error(error);
    throw new Error('Brands could not be loaded');
  }

  return data;
}

export async function deleteBrand(id) {
  const { error } = await supabase.from('brands').delete().eq('id', id);

  if (error) throw new Error('Could not delete brand');
}

export async function createEditBrand(data, id) {
  const hasImage = data.brandLogo?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${data.brandLogo.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImage
    ? data.brandLogo
    : `${supabaseUrl}/storage/v1/object/public/brand-images/${imageName}`;

  let query = supabase.from('brands');

  //! Create new brand
  if (!id) query = query.insert([{ ...data, brandLogo: imagePath }]).select();

  //! Edit brand
  if (id)
    query = query
      .update({ ...data, brandLogo: imagePath })
      .eq('id', id)
      .select();

  const { data: supaData, error } = await query.select().single();

  if (hasImage) return supaData;

  //! Upload brand logo
  const { error: uploadError } = await supabase.storage
    .from('brand-images')
    .upload(imageName, data.brandLogo);

  if (uploadError) throw new Error('Could not upload the image!');

  return supaData;
}
