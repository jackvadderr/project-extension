'use server';

import { updateUserAction } from './update-user-action';

export async function approveRequestAction(id: string) {
  await updateUserAction(id.toString(), {
    role: 'NORMAL'
  });
}