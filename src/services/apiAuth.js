import supabase, { supabaseUrl } from './supabase';

export async function loginApi({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function getUserRole() {
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const { data: role, error: roleError } = await supabase
    .from('admin_profiles')
    .select('*,role_id(id, role)')
    .eq('id', data?.user?.id)
    .single();

  if (roleError) {
    throw new Error(error.message);
  }

  return role;
}

export async function updateCurrentUser(data) {
  const { data: session } = await supabase.auth.getSession();

  const userId = session.session.user.id;

  const profilePic = data?.profilePicture?.[0];
  const profilePicture = `${supabaseUrl}/storage/v1/object/public/${userId}/profilePicture`;

  const { error: profileError } = await supabase.storage
    .from(`admins/${userId}`)
    .upload('profilePicture', profilePic, {
      upsert: true,
    });
  if (profileError) throw new Error(profileError.message);

  const { data: updatedUser, error } = await supabase.auth.updateUser({
    data: {
      ...data,
      profilePicture,
    },
  });

  if (error) throw new Error(error.message);

  const { error: updateError } = await supabase
    .from('admin_profiles')
    .update({ first_name: data?.firstName, last_name: data?.lastName })
    .eq('id', userId);

  if (updateError) throw new Error(updateError?.message);

  return updatedUser;
}

export async function updateUserPassword(data) {
  const { data: updatedUser, error } = await supabase.auth.updateUser({
    password: data.password,
  });

  if (error) throw new Error(error?.message);

  return updatedUser;
}
