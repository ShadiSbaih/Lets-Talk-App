import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import StreamProvider from "@/providers/StreamProvider";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser();
    if(!user) {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return redirect("/login");
    }
    console.log("user", user);
  return (
    <main className="relative">
      <StreamProvider>
      {children}
      </StreamProvider>
    </main>
  );
};
export default MainLayout;