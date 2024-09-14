import supabase, { supabaseAdmin } from './supabase';

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

export async function getAllAdmins() {
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();

  if (error) throw new Error(error.message);

  return users;
}
