import React from "react";
import Image from "next/image";
import {getSession, Session} from "@auth0/nextjs-auth0";

export default async function Page() {
  const { user } = await getSession() as Session;
  const picture = user?.picture as string
  
  return (
      <main className="flex min-h-screen flex-col p-6">

      </main>
  );
}
