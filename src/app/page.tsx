'use client';
import {useUser} from "@auth0/nextjs-auth0/client";
import Image from 'next/image';
import router from 'next/router';
import {useEffect} from "react";

export default function Page() {
  const { user, error, isLoading, checkSession} = useUser()
  const picture = user?.picture as string
  
  useEffect(() => {
    if (!user) {
      location.href = `/api/auth/login?returnTo=${encodeURIComponent('/chat')}`
    } else {
      router.push('/chat')
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col p-6">
      { user &&
        <div>
          <h1>Welcome {user.name}</h1>
          <ul>
            <li>name: {user?.name}</li>
            <li>email: {user?.email}</li>
            <li>sub: {user?.sub}</li>
            <li>picture: {user?.picture}
              <Image src={picture} alt='profile' width='25' height='25'/></li>
            <li>nickname: {user?.nickname}</li>
            <li>sub: {user?.sub}</li>
            <li>updated_at: {user?.updated_at}</li>
          </ul>
        </div>
      }
      {user ? <a href="/api/auth/logout">Logout</a>
          : <a href={`/api/auth/login?returnTo=${encodeURIComponent('/chat')}`}>Login</a>}
      {isLoading && <div>Loading...</div> }
      { error && <div>{error.message}</div> }
      <button onClick={() => checkSession()}>Check Session</button>
    </main>
  );
}
