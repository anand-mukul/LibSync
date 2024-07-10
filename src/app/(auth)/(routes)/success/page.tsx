"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <div>
      <p>Login successful! Redirecting...</p>
    </div>
  );
};

export default AuthSuccess;
