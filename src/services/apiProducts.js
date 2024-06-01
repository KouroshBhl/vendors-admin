import supabase, { supabaseUrl } from './supabase';

export async function createProduct(data, id) {
  console.log(data);
  const imageName = `${Math.random()}-${data.thumbnail.name}`.replaceAll(
    '/',
    ''
  );
  const hasImage = data.thumbnail?.startsWith?.(supabaseUrl);

  const imagePath = hasImage
    ? data.thumbnail
    : `${supabaseUrl}/storage/v1/object/public/product-thumbnail/${imageName}`;

  let query = supabase.from('products');

  if (!id) {
    query = query.insert([{ ...data, thumbnail: imagePath }]).select();
  }

  if (id) {
    query = query
      .update({ ...data, thumbnail: imagePath })
      .eq('uniqueId', id)
      .select();
  }

  const { data: supaData, error } = await query.select().single();

  console.log(error);

  if (error) throw new Error('Could not create product!');

  if (hasImage) return supaData;

  const { error: uploadError } = await supabase.storage
    .from('product-thumbnail')
    .upload(imageName, data.thumbnail);

  if (uploadError) {
    console.log('can not upload');
    throw new Error('could not upload picture');
  }
}

export async function getProducts() {
  let { data: productsKey, error: productsKeyError } = await supabase
    .from('productsKey')
    .select('uniqueId, persianTitle, thumbnail, productType');

  let { data: productOptional, error: productOptionalError } = await supabase
    .from('productsOptional')
    .select('uniqueId, persianTitle, thumbnail, productType');

  if (productsKeyError || productOptionalError) {
    console.log('can not read data');
    throw new Error('could not read data');
  }

  return { productsKey, productOptional };
}

export async function deleteProduct(data) {
  const { error } = await supabase
    .from(`${data.productType}`)
    .delete()
    .eq('uniqueId', data.uniqueId);

  if (error) {
    console.log('can not delete data');
    throw new Error('could not delete data');
  }
}

export async function getProductDetails({ id, type }) {
  let { data, error } = await supabase
    .from(`${type}`)
    .select('*')
    .eq('uniqueId', id);

  if (error) {
    console.log('can not read data');
    throw new Error('could not read data');
  }

  return data;
}
