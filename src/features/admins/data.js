import React from 'react';
const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'Joined At', uid: 'created_at', sortable: true },
  { name: 'Phone', uid: 'phone' },
  { name: 'ACTIONS', uid: 'actions' },
];

const statusOptions = [
  { name: 'Super Admin', uid: 'superadmin' },
  { name: 'Moderator', uid: 'moderator' },
  { name: 'Admin', uid: 'admin' },
  { name: 'Support', uid: 'support' },
  { name: 'Authenticated', uid: 'authenticated' },
];

export { columns, statusOptions };
