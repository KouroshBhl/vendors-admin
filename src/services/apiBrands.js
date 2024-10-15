import supabase, { supabaseUrl } from './supabase';

export async function getBrands() {
  const { data, error } = await supabase.from('product_platform').select('*');

  if (error) {
    throw new Error('Brands could not be loaded');
  }

  return data;
}

export async function deleteBrand(id) {
  const { error } = await supabase
    .from('product_platform')
    .delete()
    .eq('id', id);

  if (error) throw new Error('Could not delete brand');
}

export async function createEditBrand(data, id) {
  console.log(data, id);
  const hasImage = data.platform_logo?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${data.platform_logo.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImage
    ? data.platform_logo
    : `${supabaseUrl}/storage/v1/object/public/platform-images/${imageName}`;

  let query = supabase.from('product_platform');

  //! Create new brand
  if (!id)
    query = query.insert([{ ...data, platform_logo: imagePath }]).select();

  //! Edit brand
  if (id)
    query = query
      .update({ ...data, platform_logo: imagePath })
      .eq('id', id)
      .select();

  const { data: supaData, error } = await query.select().single();

  if (hasImage) return supaData;

  //! Upload brand logo
  const { error: uploadError } = await supabase.storage
    .from('platform-images')
    .upload(imageName, data.platform_logo);

  if (uploadError) throw new Error('Could not upload the image!');

  return supaData;
}
