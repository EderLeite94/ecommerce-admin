import { cookies } from 'next/headers';

import type { IUser } from '@models/user';

import { userKey } from '@constants/cookies';

export const GET = async () => {
  let user;
  const message = 'Não foi possível obter os dados do usuário!';

  try {
    user = cookies().get(userKey)?.value;
  } catch {
    return Response.json({ message });
  }

  return Response.json({
    user: JSON.parse(user!) as IUser,
    message: 'Dados obtidos com sucesso!'
  });
};

export const POST = async ({ text }: Request) => {
  const body = await text();

  cookies().set(userKey, body, {
    secure: true
  });

  return Response.json({
    message: 'Dados obtidos com sucesso!'
  });
};