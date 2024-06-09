import supabase, { supabaseUrl } from './supabase';

export async function createFeature(data) {
  console.log(data);
  // const hasImage = data.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${data.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/features-homePage/${imageName}`;

  const { data: supabaseData, error } = await supabase
    .from('homepageUI')
    .insert([{ ...data, image: imagePath }])
    .select();

  //! Upload feature image
  const { error: uploadError } = await supabase.storage
    .from('features-homePage')
    .upload(imageName, data.image);

  if (uploadError || error) throw new Error('Could not upload the image!');

  return supabaseData;
}

export async function getHomePageFeatures() {
  const { data, error } = await supabase.from('homepageUI').select('*');

  if (error) {
    console.error(error);
    throw new Error('Brands could not be loaded');
  }

  return data;
}

export async function deleteHomePageFeature(id) {
  const { error } = await supabase.from('homepageUI').delete().eq('id', id);

  if (error) throw new Error('Could not delete feature');
}
