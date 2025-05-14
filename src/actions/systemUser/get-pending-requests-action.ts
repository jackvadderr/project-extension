'use server';

import { listAllUserAction } from './list-all-user-action';

export async function getPendingRequestsAction() {
  const users = await listAllUserAction();

  return users
    .filter(user => user.role === 'PENDING' || user.role === 'REJECTED')
    .map(user => ({
      id: String(user.id),
      email: user.email ?? '',
      status: user.role ?? 'REJECTED',
      requestDate: user.createdAt.toISOString()
    }));
}