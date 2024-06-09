import supabase, { supabaseUrl } from './supabase';

// export async function createProduct(data, id, actionType = null) {
//   const hasImage =
//     actionType === 'duplicate'
//       ? false
//       : data.thumbnail?.startsWith?.(supabaseUrl);
//   console.log(hasImage);

//   const imagePath = hasImage
//     ? data.thumbnail
//     : `${supabaseUrl}/storage/v1/object/public/products/${data.uniqueId}/thumbnail/mainImage`;

//   console.log(imagePath);

//   let query = supabase.from('products');

//   if (!id || actionType === 'duplicate') {
//     query = query.insert([{ ...data, thumbnail: imagePath }]).select();
//     console.log(query);
//   }

//   if (id && actionType === 'edit') {
//     console.log('updating');
//     query = query
//       .update({ ...data, thumbnail: imagePath })
//       .eq('uniqueId', id)
//       .select();
//   }

//   const { data: supaData, error } = await query.select().single();

//   if (error) throw new Error('Could not create product!');

//   if (hasImage) return supaData;

//   console.log(data.uniqueId);
//   if (actionType === 'edit') {
//     const { data: updateImage, error } = await supabase.storage
//       .from(`products/${id}/thumbnail`)
//       .update('mainImage', data.thumbnail, {
//         cacheControl: '3600',
//         upsert: true,
//       });

//     if (error) throw new Error('could not update thumbnail');
//     return updateImage;
//   }

//   if (actionType === 'duplicate') {
//     const { data: updateImage, error } = await supabase.storage
//       .from(`products/${id}/thumbnail`)
//       .update('mainImage', data.thumbnail, {
//         cacheControl: '3600',
//         upsert: true,
//       });

//     if (error) throw new Error('could not update thumbnail');
//     return updateImage;
//   }

//   const { error: uploadError } = await supabase.storage
//     .from(`products/${data.uniqueId}/thumbnail`)
//     .upload('mainImage', data.thumbnail);

//   if (uploadError) {
//     console.log('can not upload');
//     throw new Error('could not upload picture');
//   }
//   console.log(error, uploadError);
// }

export async function duplicateProduct(data, duplicatingId) {
  delete data?.created_at;
  const hasImage = data?.thumbnail?.startsWith?.(supabaseUrl);
  const imagePath = hasImage
    ? data.thumbnail
    : `${supabaseUrl}/storage/v1/object/public/products/${data.uniqueId}/thumbnail/mainImage`;

  const { data: duplicateData, error: createError } = await supabase
    .from('products')
    .insert([{ ...data, thumbnail: imagePath }])
    .select();

  if (createError) throw new Error('could not duplicate product');

  if (hasImage) {
    const { data: thumbnailData, error: thumbDuplicateError } =
      await supabase.storage
        .from('products')
        .copy(
          `${duplicatingId}/thumbnail/mainImage`,
          `${data.uniqueId}/thumbnail/mainImage`
        );

    if (thumbDuplicateError) throw new Error('could not duplicate thumbnail');
  }
  if (!hasImage) {
    console.log('has image');
    const { error: uploadError } = await supabase.storage
      .from(`products/${data.uniqueId}/thumbnail`)
      .upload('mainImage', data.thumbnail);

    if (uploadError) throw new Error('could not duplicate thumbnail');
  }

  return duplicateData;
}

export async function editProduct(data) {
  const hasImage = data?.thumbnail?.startsWith?.(supabaseUrl);
  const imagePath = hasImage
    ? data.thumbnail
    : `${supabaseUrl}/storage/v1/object/public/products/${data.uniqueId}/thumbnail/mainImage`;

  if (!hasImage) {
    const { data: uploadData, error } = await supabase.storage
      .from(`products/${data.uniqueId}/thumbnail`)
      .update(`mainImage`, data.thumbnail, {
        cacheControl: '1000',
        upsert: true,
      });
    if (error) throw new Error('could not update product thumbnail');
  }

  const { data: updateData, error } = await supabase
    .from('products')
    .update({ ...data, thumbnail: imagePath })
    .eq('uniqueId', data.uniqueId)
    .select();

  if (error) throw new Error('could not update product');

  return updateData;
}

export async function createProduct(data) {
  const imagePath = `${supabaseUrl}/storage/v1/object/public/products/${data.uniqueId}/thumbnail/mainImage`;

  const { data: createData, error: createError } = await supabase
    .from('products')
    .insert([{ ...data, thumbnail: imagePath }])
    .select();

  if (createError) throw new Error('Could not create product!');

  const { error: uploadError } = await supabase.storage
    .from(`products/${data.uniqueId}/thumbnail`)
    .upload('mainImage', data.thumbnail);

  if (uploadError) throw new Error('could not upload picture');

  return createData;
}

export async function getProducts() {
  let { data: products, error } = await supabase
    .from('products')
    .select('uniqueId, persianTitle, thumbnail, price, productType');

  if (error) throw new Error('could not get products');

  return { products, error };
}

export async function deleteProduct(data) {
  console.log(data);
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('uniqueId', data.uniqueId);

  if (error) {
    console.log('can not delete data');
    throw new Error('could not delete data');
  }
}

export async function getProductDetails({ id }) {
  let { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('uniqueId', id);

  if (error) {
    console.log('can not read data');
    throw new Error('could not read data');
  }

  return data;
}

export async function uploadImages({ data, id }) {
  console.log(data, id);
  const imageName = `${data.size}-${data.name}`.replaceAll('/', '');

  // const imagePath = `${supabaseUrl}/storage/v1/object/public/product-thumbnail/${imageName}`;

  const { data: uploadData, error } = await supabase.storage
    .from(`products/${id}/gallery`)
    .upload(imageName, data);

  if (error) {
    console.log(error);
    throw new Error('could not read data');
  }

  return uploadData;
}
