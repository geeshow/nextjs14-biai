'use server';

import {getSession} from "@auth0/nextjs-auth0";

export interface IGoogleUser {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
}


export async function getServerSideMyInfo() {
  const { user } = await getSession() as { user: IGoogleUser };
  return {
    userId: user.email,
    name: user.name,
    avatar: user.picture,
  }
}
