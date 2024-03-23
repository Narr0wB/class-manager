"use client"

import GoogleButton from "react-google-button";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  // Use router navigation instead of redirect for caching issues
  if (session.data) { router.replace("/home"); router.refresh() };

  return (
    <main>
      <GoogleButton onClick={() => { signIn("google") }}></GoogleButton>
    </main>
  )
}

export default Login;