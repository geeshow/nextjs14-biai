'use client';
import {useEffect} from "react";
import {useParams, useRouter} from "next/navigation";

function ErrorBoundary({error, reset}: {error: Error, reset: () => void}) {
  const router = useRouter();
  const path = useParams<{bot: string, chatId: string}>()
  
  // useEffect(() => {
  //   router.push(`/chat/${path.bot}`)
  // },[path.bot, router]);
  
  return (
      <div />
  );
}

export default ErrorBoundary;
