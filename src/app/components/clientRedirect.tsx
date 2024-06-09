"use client";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

const ClientRedirect = () => {
  useEffect(() => {
    signIn();
  }, []);

  return <div className="mx-auto mt-8"></div>;
};

export default ClientRedirect;