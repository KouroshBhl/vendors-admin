import supabase, { supabaseUrl } from './supabase';

export async function createProduct(data) {
  const imageName = `thumbnail-${data.thumbnail.name}-${data.thumbnail.size}-${Math.random() * 1000}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/products/${imageName}`;

  const { data: createData, error: createError } = await supabase
    .from('product')
    .insert([{ ...data, thumbnail: imagePath }])
    .select();

  if (createError) throw new Error(createError?.message);

  const { error: uploadError } = await supabase.storage
    .from(`products`)
    .upload(imageName, data.thumbnail);

  if (uploadError) throw new Error('could not upload picture');

  return createData;
}

export async function duplicateProduct(data, duplicatingId) {
  delete data?.created_at;
  const hasImage = data?.thumbnail?.startsWith?.(supabaseUrl);

  const imageName = `thumbnail-${data.thumbnail.name}-${data.thumbnail.size}`;
  const imagePath = hasImage
    ? data.thumbnail
    : `${supabaseUrl}/storage/v1/object/public/products/${imageName}`;

  const { data: duplicateData, error: createError } = await supabase
    .from('product')
    .insert([{ ...data, thumbnail: imagePath }])
    .select();

  if (createError) throw new Error('could not duplicate product');

  if (!hasImage) {
    console.log('has image');
    const { error: uploadError } = await supabase.storage
      .from(`products`)
      .upload(imageName, data.thumbnail);

    if (uploadError) throw new Error('could not duplicate thumbnail');
  }

  return duplicateData;
}

export async function editProduct(data) {
  const hasImage = data?.thumbnail?.startsWith?.(supabaseUrl);
  const imageName = `thumbnail-${data.thumbnail.name}-${data.thumbnail.size}`;
  const imagePath = hasImage
    ? data.thumbnail
    : `${supabaseUrl}/storage/v1/object/public/products/${imageName}`;

  if (!hasImage) {
    const { data: uploadData, error } = await supabase.storage
      .from(`products`)
      .upload(imageName, data.thumbnail);
    if (error) throw new Error('could not update product thumbnail');
  }

  const { data: updateData, error } = await supabase
    .from('product')
    .update({ ...data, thumbnail: imagePath })
    .eq('id', data.id)
    .select();

  if (error) throw new Error('could not update product');

  return updateData;
}

export async function getProducts() {
  let { data: products, error } = await supabase
    .from('product')
    .select('id,unique_id, persian_title, thumbnail, product_type');

  if (error) throw new Error('could not get products');

  return products;
}

export async function getProductType() {
  let { data: products, error } = await supabase
    .from('product_type')
    .select('*');

  if (error) throw new Error('could not get product type');

  return products;
}

export async function deleteProduct({ id }) {
  const { error } = await supabase.from('product').delete().eq('id', id);

  if (error) {
    console.log('can not delete data');
    throw new Error('could not delete data');
  }
}

export async function getProductDetails({ id }) {
  let { data, error } = await supabase.from('product').select('*').eq('id', id);

  if (error) {
    console.log('can not read data');
    throw new Error('could not read data');
  }

  return data;
}

export async function uploadImages({ data }) {
  const imageName = `${data.size}-${data.lastModified}`;
  console.log(data);

  const { data: uploadData, error } = await supabase.storage
    .from('gallery')
    .upload(imageName, data);

  console.log(error);

  if (error) {
    throw new Error('could not read data');
  }

  return uploadData;
}
