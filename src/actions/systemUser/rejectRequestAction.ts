'use server';

import { updateUserAction } from './update-user-action';

export async function rejectRequestAction(id: string) {
  await updateUserAction(id.toString(), {
    role: 'REJECTED'
  });
}