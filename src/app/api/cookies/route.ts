import { cookies } from 'next/headers';

import { userKey } from '@constants/cookies';

export const POST = async ({ text }: Request) => {
  const body = await text();

  cookies().set(userKey, body, {
    secure: true
  });

  return Response.json({
    message: 'Dados obtidos!'
  });
};