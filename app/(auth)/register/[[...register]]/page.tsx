import {  SignUp } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen flex-col bg-gray-100 dark:bg-gray-900 animate-fade-in">
      <section className="flex flex-col items-center">
        <Image src={"/DesignAssets/logo.svg"} alt="logo" width={90} height={90}/>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Connect ,Communicate and Collaborate In Real Time
        </h1>
      </section>
      <div className="mt-3">
        <SignUp appearance={{ baseTheme: neobrutalism }} />
      </div>
    </main>
  );
};

export default LoginPage;
